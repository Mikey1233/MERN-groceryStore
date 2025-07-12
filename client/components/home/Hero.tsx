import Image from 'next/image'
import { Button } from '../ui/button'
import hero from "@/public/assets/hero.png";

function Hero() {
  return (
     <main className=" flex flex-col md:flex-row gap-4   items-center px-6  justify-between md:px-14 py-12 ">
        <div className="flex-1 max-w-2xl md:pl-14 mb-8 md:mb-2">
          {/* Hero Text */}
          <h1 className="text-5xl lg:text-7xl font-bold text-black leading-tight mb-8">
            Enjoy Our
            <br />
            Delicious Meal
          </h1>

          {/* Description */}
          <p className="text-gray-700 text-lg leading-relaxed mb-12 max-w-xl">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
            lorem sit clita duo justo magna dolore erat amet
          </p>

          {/* CTA Button */}
          <Button className="bg-gradient-to-br from-green-400 to-green-600 hover:bg-green-600 text-white rounded-none font-semibold px-9 py-6 text-lg">
            BOOK A TABLE
          </Button>
        </div>

        {/* Grill Image */}
        <div className=" flex-1 flex  justify-end">
          <div className="relative">
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
  )
}

export default Hero