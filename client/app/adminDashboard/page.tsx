"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useState, useRef, useCallback } from "react"
import ImageComponent from "@/components/ImageComponent"

 

export default function Page() {
 
  return (
    
         <main className="flex-1 p-2 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Product Image Section */}
           <ImageComponent/>

            {/* Product Name */}
            <div className="mb-4 sm:mb-6">
              <Label htmlFor="productName" className="text-base font-medium text-gray-700 mb-2 block">
                Product Name
              </Label>
              <Input id="productName" placeholder="Type here" className="w-full sm:max-w-md" />
            </div>

            {/* Product Description */}
            <div className="mb-4 sm:mb-6">
              <Label htmlFor="productDescription" className="text-base font-medium text-gray-700 mb-2 block">
                Product Description
              </Label>
              <Textarea
                id="productDescription"
                placeholder="Type here"
                className="w-full sm:max-w-md h-24 sm:h-32 resize-none"
              />
            </div>

            {/* Category */}
            
               <div className="mb-4 sm:mb-6">
              <Label className="text-base font-medium text-gray-700 mb-2 block">Category</Label>
               <Select>
                 <SelectTrigger className="w-full sm:max-w-md">
                   <SelectValue placeholder="Select Category" />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="vegetable">Vegetable</SelectItem>
                   <SelectItem value="fruit">Fruit</SelectItem>
                 <SelectItem value="drink">Drinks</SelectItem>
                   <SelectItem value="dairy">Dairy</SelectItem>
                   <SelectItem value="bakery">Bakery</SelectItem>
                   <SelectItem value="grain">Grains</SelectItem>
                 </SelectContent>
               </Select>
             </div>

            {/* Price Section */}
            <div className="mb-6 sm:mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 sm:max-w-md">
                <div>
                  <Label htmlFor="productPrice" className="text-base font-medium text-gray-700 mb-2 block">
                    Product Price
                  </Label>
                  <Input id="productPrice" type="number" placeholder="0" className="w-full" />
                </div>
                <div>
                  <Label htmlFor="offerPrice" className="text-base font-medium text-gray-700 mb-2 block">
                    Offer Price
                  </Label>
                  <Input id="offerPrice" type="number" placeholder="0" className="w-full" />
                </div>
              </div>
            </div>

            {/* Add Button */}
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2 text-base font-medium w-full sm:w-auto">
              ADD
            </Button>
          </div>
        </main>
  )
}
