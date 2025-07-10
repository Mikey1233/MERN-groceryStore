import { Plus, Star } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image, { StaticImageData } from 'next/image'
function ProductRating({name,slashPrice,price,image,category}:{
    name:string,
    slashPrice : number,
    price :number,
    image : string | StaticImageData,
    category : string
}) {
  return (
 <Card className="bg-white border hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="text-xs text-gray-500 mb-2">{category}</div>
                <Image
                  src={image}
                  alt="Brown Bread"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-2">
                  {/* Brown Bread 400g */}
                  {name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">
                      ${price}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${slashPrice}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Add
                    <Plus/>
                  </Button>
                </div>
              </CardContent>
            </Card>
  )
}

export default ProductRating