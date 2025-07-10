import { Utensils } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"
function About() {
  return (
     <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Right Side - About Section */}
              <div className="space-y-8">
                <div>
                  <p className="text-green-500 text-lg font-medium mb-4">
                    About Us
                  </p>
                  <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                    Welcome to{" "}
                    <span className="inline-flex items-center">
                      <Utensils className="h-10 w-10 text-green-500 mx-2" />
                      FoodCart
                    </span>
                  </h1>
                </div>
    
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet
                    lorem sit.
                  </p>
                  <p>
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                    sed stet lorem sit clita duo justo magna dolore erat amet
                  </p>
                </div>
    
                {/* Statistics */}
                <div className="flex space-x-12">
                  <div className="flex items-center space-x-4">
                    <div className="w-1 h-16 bg-green-400"></div>
                    <div>
                      <div className="text-4xl font-bold text-green-500">15</div>
                      <div className="text-gray-400 text-sm">
                        Years of
                        <br />
                        <span className="font-semibold text-gray-500">
                          EXPERIENCE
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-1 h-16 bg-green-500"></div>
                    <div>
                      <div className="text-4xl font-bold text-green-500">50</div>
                      <div className="text-gray-400 text-sm">
                        Popular
                        <br />
                        <span className="font-semibold text-gray-500">
                          MASTER CHEFS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
    
                <Button className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-8 py-3 rounded-none font-medium">
                  READ MORE
                </Button>
              </div>
              {/* Left Side - Image Grid */}
              <div className="grid grid-rows-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
                      alt="Restaurant interior"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
                      alt="Chef cooking"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"
                      alt="Restaurant dining area"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1170&auto=format&fit=crop"
                      alt="Gourmet food plating"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default About