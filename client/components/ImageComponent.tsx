"use client"
import { Label } from '@radix-ui/react-label'
import { X, Upload, Cloud } from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'

function ImageComponent() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [draggedOver, setDraggedOver] = useState<number | null>(null)
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleImageUpload = useCallback(
    (file: File, index: number) => {
      if (file && file.type.startsWith("image/")) {
        const newImages = [...uploadedImages]
        newImages[index] = file
        setUploadedImages(newImages)
      }
    },
    [uploadedImages],
  )

   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file, index)
    }
  }

  const handleDragOver = (event: React.DragEvent, index: number) => {
    event.preventDefault()
    setDraggedOver(index)
  }

  const handleDragLeave = () => {
    setDraggedOver(null)
  }

  const handleDrop = (event: React.DragEvent, index: number) => {
    event.preventDefault()
    setDraggedOver(null)
    const file = event.dataTransfer.files[0]
    if (file) {
      handleImageUpload(file, index)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages]
    newImages[index] = undefined as any
    setUploadedImages(newImages.filter((_, i) => i !== index).concat(new Array(1).fill(undefined)))
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = ""
    }
  }

  const getImagePreview = (file: File): string => {
    return URL.createObjectURL(file)
  }

  return (
     <div className="mb-6 sm:mb-8">
              <Label className="text-base font-medium text-gray-700 mb-3 sm:mb-4 block">Product Image</Label>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[0, 1].map((index) => {
                  const hasImage = uploadedImages[index]
                  return (
                    <div key={index} className="relative">
                      <input
                        ref={(el) => {
                          fileInputRefs.current[index] = el
                        }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(e, index)}
                        className="hidden"
                        id={`image-upload-${index}`}
                      />
                      <Card
                        className={`aspect-square border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                          draggedOver === index
                            ? "border-green-400 bg-green-50"
                            : hasImage
                              ? "border-green-300"
                              : "border-gray-300 hover:border-gray-400"
                        }`}
                        onClick={() => !hasImage && fileInputRefs.current[index]?.click()}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        {hasImage ? (
                          <div className="relative h-full w-full">
                            <img
                              src={getImagePreview(uploadedImages[index]) || "/placeholder.svg"}
                              alt={`Product image ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeImage(index)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-500 p-4">
                            {draggedOver === index ? (
                              <>
                                <Upload className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-green-500" />
                                <span className="text-xs sm:text-sm text-green-600 text-center">Drop image here</span>
                              </>
                            ) : (
                              <>
                                <Cloud className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2" />
                                <span className="text-xs sm:text-sm text-center">Upload</span>
                                <span className="text-xs text-gray-400 text-center mt-1 hidden sm:block">
                                  Click or drag
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </Card>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, GIF. Max size: 5MB per image.</p>
            </div>
  )
}

export default ImageComponent