import veggies from "@/public/assets/organic_vegitable_image.png";
import fruits from "@/public/assets/fresh_fruits_image.png";
import coldDrinks from "@/public/assets/bottles_image.png";
import Instantfoods from "@/public/assets/maggi_image.png";
import dairys from "@/public/assets/dairy_product_image.png";
import bakerys from "@/public/assets/bakery_image.png";
import cereals from "@/public/assets/grain_image.png";

import quico from "@/public/assets/quinoa_image.png"
import apple from "@/public/assets/apple_image.png"
import cheese from "@/public/assets/cheese_image.png"
import carrot from "@/public/assets/carrot_image.png"
import bread from "@/public/assets/whole_wheat_bread_image.png"
export const CategoryData = [
  {
    name: "Organic veggies",
    image: veggies,
    bg: "bg-yellow-100",
  },
  {
    name: "Fresh fruits",
    image: fruits,
    bg: "bg-pink-100",
  },
  {
    name: "Cold drinks",
    image: coldDrinks,
    bg: "bg-green-100",
  },
  {
    name: "Instant Foods",
    image: Instantfoods,
    bg: "bg-blue-100",
  },
  {
    name: "Dairy Products",
    image: dairys,
    bg: "bg-orange-100",
  },
  {
    name: "Bakery & Breads",
    image: bakerys,
    bg: "bg-cyan-100",
  },
  {
    name: "Grains & Cereals",
    image: cereals,
    bg: "bg-purple-100",
  },
];

export const BestSellers = [
    {
        name :"Organic Quinoa",
        price : 20,
        slashPrice : 35,
        image : quico,
        category : "vegetable"
    },
     {
        name :"Brown Bread",
        price : 23,
        slashPrice : 55,
        image : bread,
        category : "bakery"
    },
       {
        name :"Carrot 500g",
        price : 3,
        slashPrice : 5,
        image : carrot,
        category : "vegetables"
    },
       {
        name :"Apple 1 kg",
        price : 123,
        slashPrice : 155,
        image : apple,
        category : "fruits"
    },
       {
        name :"Cheese 200g",
        price : 34,
        slashPrice : 55,
        image : cheese,
        category : "instant foods"
    }
]