"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {  ChevronLeft, ChevronRight, Star, Plus } from "lucide-react"
import banana from "@/public/assets/banana_image_1.png"
import SliceBread from "@/public/assets/brown_bread_image.png"
import Pepsi from "@/public/assets/pepsi_image_2.png"
import Oranges from "@/public/assets/orange_image.png"
import Potatoes from "@/public/assets/potato_image_1.png"
import SevenUp from "@/public/assets/seven_up_image_1.png"
import Image from "next/image"
import { Card, CardContent } from "../ui/card"



// Sample product data - replace with your actual menu items
const products = [
  {
    id: 1,
    name: "Banana",
    description: "Fresh bana, tomato sauce, basil, and olive oil on our signature wood-fired crust",
    price: "$18.99",
    image: banana,
    rating: 4.8,
    category: "fruits",
  },
  {
    id: 2,
    name: "Sliced bread",
    description: "Atlantic salmon with lemon herb butter, served with roasted vegetables and wild rice",
    price: "$26.99",
    image: SliceBread,
    rating: 4.9,
    category: "bakery",
  },
  {
    id: 3,
    name: "Pepsi",
    description: "8oz prime cut with garlic mashed potatoes, asparagus, and red wine reduction",
    price: "$32.99",
    image: Pepsi,
    rating: 4.7,
    category: "drinks",
  },
  {
    id: 4,
    name: "Oranges",
    description: "Breaded chicken breast with marinara sauce, mozzarella, served with pasta",
    price: "$22.99",
    image: Oranges,
    rating: 4.6,
    category: "fruits",
  },
  {
    id: 5,
    name: "SevenUp",
    description: "House-made ravioli filled with lobster in a creamy tomato basil sauce",
    price: "$28.99",
    image: SevenUp,
    rating: 4.8,
    category: "drinks",
  },
  {
    id: 6,
    name: "Potatoes",
    description: "Crisp romaine lettuce, parmesan cheese, croutons with our signature dressing",
    price: "$14.99",
    image: Potatoes,
    rating: 4.5,
    category: "Instant foods",
  },
]
function ProductsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset currentIndex when itemsPerView changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [itemsPerView])

  const totalSlides = Math.ceil(products.length / itemsPerView)
  const maxIndex = totalSlides - 1

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-slide functionality
  useEffect(() => {
    if (products.length <= itemsPerView) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [maxIndex, itemsPerView])

  // Get current products to display
  const getCurrentProducts = () => {
    const startIndex = currentIndex * itemsPerView
    const endIndex = startIndex + itemsPerView
    return products.slice(startIndex, endIndex)
  }

  const currentProducts = getCurrentProducts()

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Signature Dishes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted menu featuring the finest ingredients and authentic flavors
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {products.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-green-400 hover:bg-green-500 text-black p-2 md:p-3 rounded-none md:rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Previous products"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-green-400 hover:bg-green-500 text-black p-2 md:p-3 rounded-none md:rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Next products"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div className="mx-6  md:mx-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out">
              {currentProducts.map((product, index) => (
                <Card
                  key={`${product.id}-${currentIndex}`}
                  
                  className="bg-white flex rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group animate-in fade-in slide-in-from-bottom-4"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationDuration: "500ms",
                    animationFillMode: "both",
                  }}
                >
                  {/* Product Image */}
                  <CardContent className="relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className=" group-hover:scale-110 place-self-center transition-transform duration-500"
                       width={120}
                  height={120}
                    />
                    <div className="absolute top-0 right-4 text-xs text-gray-500 mb-2  px-3 py-1 ">
                      {product.category}
                    </div>
                  </CardContent>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-black group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">{product.price}</span>
                      <Button
                    size="sm"
                    className="bg-green-500 p-1 cursor-pointer hover:bg-green-600 text-white rounded-none"
                  >
                    {/* Add */}
                    <Plus/>
                  </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {products.length > itemsPerView && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-green-400 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button className="bg-green-400 hover:bg-green-600 rounded-none text-white px-8 py-3 text-lg">
            View Full Menu
          </Button>
        </div>
      </div>
    </section>
  )
}
function ProductsSlide() {
  return (
 <div className="w-full">
      {/* Products Section */}
      <ProductsSection />
    </div>
  )
}

export default ProductsSlide