import { Button } from "@/components/ui/button"
import {  DollarSign, Heart, Shield, Star, Truck } from "lucide-react"
import Image from "next/image"
// import ImageWidget from "@/components/ImageWidget"
// import { AuthModal } from "@/components/AuthModal"
import hero from "@/public/assets/hero.png"
import { Card, CardContent } from "@/components/ui/card"
// import veggies from "@/public/assets/organic_vegitable_image.png"
import Cards from "@/components/Cards"
import { CategoryData } from "@/lib/data"

export default function Home(){
  return (
    <div className="min-h-screen bg-white ">
  <main className=" flex flex-col md:flex-row gap-4  items-center px-6  justify-between md:px-14 py-12 ">
        <div className="flex-1 max-w-2xl md:pl-14">
          {/* Hero Text */}
          <h1 className="text-5xl lg:text-7xl font-bold text-black leading-tight mb-8">
            Enjoy Our
            <br />
            Delicious Meal
          </h1>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed mb-12 max-w-xl">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum
            et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
          </p>

          {/* CTA Button */}
          <Button className="bg-green-400 hover:bg-green-600 text-white rounded-full font-semibold px-8 py-4 text-lg">
            BOOK A TABLE
          </Button>
        </div>

        {/* Grill Image */}
        <div className=" flex-1 flex  justify-end">
          <div className="relative">
            {/* <Image
              src={hero}
              alt="Grilled food on barbecue grill"
              width={600}
              height={600}
              className="object-contain"
              priority
            /> */}
            <Image
  src={hero}
  alt="Grilled food on barbecue grill"
  width={600}
  height={600}
  className="object-contain cursor-pointer rotating-image"
  priority
/>

          </div>
        </div>
      </main>

      {/* Categories Section */}
      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
           

           
{
  CategoryData.map((item)=> (<Cards name={item.name} image={item.image} bgColor={item.bg}/>))
}
          

           



            
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Best Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product 1 */}
            <Card className="bg-white border hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="text-xs text-gray-500 mb-2">Bakery</div>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Brown Bread"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-2">Brown Bread 400g</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">$35</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$40</span>
                  </div>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 2 */}
            <Card className="bg-white border hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="text-xs text-gray-500 mb-2">Grains</div>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Organic Quinoa"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-2">Organic Quinoa 5...</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">$420</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$450</span>
                  </div>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 3 */}
            <Card className="bg-white border hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="text-xs text-gray-500 mb-2">Vegetables</div>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Carrot"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-2">Carrot 500g</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">$44</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$50</span>
                  </div>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 4 */}
            <Card className="bg-white border hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="text-xs text-gray-500 mb-2">Fruits</div>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Apple"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-2">Apple 1 kg</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(4)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">$90</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$100</span>
                  </div>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product 5 */}
            <Card className="bg-white border hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="text-xs text-gray-500 mb-2">Dairy</div>
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Cheese"
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-800 mb-2">Cheese 200g</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">(2)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">$130</span>
                    <span className="text-sm text-gray-500 line-through ml-2">$140</span>
                  </div>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why We Are the Best Section */}
      <section className="px-6 py-12 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center flex-col md:flex-row gap-12">
            <div className="flex-1">
              <div className="w-80 h-80 bg-green-400 rounded-full relative overflow-hidden">
                <Image
                  src="/placeholder.svg?height=320&width=320"
                  alt="Delivery person with groceries"
                  width={320}
                  height={320}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-green-600 mb-8">Why We Are the Best?</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Fastest Delivery</h3>
                    <p className="text-gray-600 text-sm">Express delivery in just 30 minutes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Freshness Guaranteed</h3>
                    <p className="text-gray-600 text-sm">Fresh produce straight from the source.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Affordable Prices</h3>
                    <p className="text-gray-600 text-sm">Quality groceries at unbeatable prices.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Trusted by Thousands</h3>
                    <p className="text-gray-600 text-sm">Loved by 10,000+ happy customers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>   
  
    
  )
}
