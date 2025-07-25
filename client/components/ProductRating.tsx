import { Plus, Star } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image, { StaticImageData } from 'next/image'
function ProductRating({productName,OfferAmount,Amount,image,category}:{
    productName:string,
    OfferAmount : number,
    Amount :number,
    image : string | StaticImageData,
    category : string,
}) {

  // console.log({name,slashPrice,price,image,category})
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
                  unoptimized
                
                />
                <h3 className="font-semibold text-gray-800 mb-2">
                  {/* Brown Bread 400g */}
                  {productName}
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
                      ${OfferAmount}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${Amount}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-gradient-to-br from-green-400 to-green-600 p-1 cursor-pointer hover:bg-green-600 text-white rounded-none"
                  >
                    {/* Add */}
                    <Plus/>
                  </Button>
                </div>
              </CardContent>
            </Card>
  )
}

export default ProductRating