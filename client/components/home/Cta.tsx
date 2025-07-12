import { Truck, Shield, DollarSign, Heart } from "lucide-react"
import Image from "next/image"
import ctaMain from "@/public/assets/bottom_banner_image.png"
import ctaMobile from "@/public/assets/bottom_banner_image_sm.png"
function Cta() {
  return (
    <div className="relative mt-24 md:px-12 py-12">
        <Image
          alt="banner"
          className="w-full hidden md:block"
          src={ctaMain}
        />
        <Image
          alt="banner"
          className="w-full md:hidden"
          src={ctaMobile}
        />
        <div className="absolute inset-0 flex top-10 md:top-5 md:right-10 flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
         
           <div>
              <h2 className="text-3xl font-bold text-green-500 mb-8">
                Why We Are the Best?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Fastest Delivery
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Express delivery in just 30 minutes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Freshness Guaranteed
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Fresh produce straight from the source.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Affordable Prices
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Quality groceries at unbeatable prices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Trusted by Thousands
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Loved by 10,000+ happy customers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
  )
}

export default Cta