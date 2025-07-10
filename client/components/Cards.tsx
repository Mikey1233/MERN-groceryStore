import React from "react";
import { Card, CardContent } from "./ui/card";
import Image, { StaticImageData } from "next/image";

function Cards({
  image,
  bgColor,
  name,
}: {
  image: string | StaticImageData;
  bgColor: string;
  name: string;
}) {
  return (
    <Card
      className={`${bgColor} border-0 hover:shadow-md transition-shadow cursor-pointer`}
    >
      <CardContent className="p-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4  rounded-lg flex items-center justify-center">
          <Image
            src={image}
            alt="Vegetables"
            className="object-fit"
            width={100}
            height={100}
          />
        </div>
        <p className="font-medium text-gray-800">{name}</p>
      </CardContent>
    </Card>
  );
}

export default Cards;
