import Image from "next/image";
import { Button } from "../ui/button";
import hero from "@/public/assets/hero.png";
import { CalendarCheckIcon } from "lucide-react";

function Hero() {
  return (
    <main className=" flex flex-col md:flex-row gap-4   items-center px-6  justify-between md:px-14 py-12 ">
      <div className="flex-1 max-w-2xl md:pl-14 mb-8 md:mb-2">
        {/* Hero Text */}
        <h1 className="text-5xl lg:text-7xl font-bold text-black leading-tight mb-8">
          Delicious Meals.
          <br />
          Fresh to Your Doorstep
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mb-12 max-w-xl">
          Experience the taste of your favorite local dishes, handcrafted by top
          chefs and ready in minutes. Whether you're dining in or ordering out,
          Food Cart brings comfort food and gourmet flavors to you.
        </p>

        {/* CTA Button */}
        <Button className="bg-gradient-to-br rounded-md cursor-pointer from-green-400 to-green-600 hover:bg-green-600 text-white  font-semibold px-11 py-6 text-lg">
          <span>BOOK A TABLE</span>{" "}
          <CalendarCheckIcon className="text-white font-extrabold" />
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
  );
}

export default Hero;
