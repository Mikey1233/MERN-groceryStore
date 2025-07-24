"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios"
import axios from "@/lib/axios";
import * as z from "zod";
import ImageComponent from "@/components/ImageComponent";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

const productSchema = z.object({
  productName: z.string().min(2, "Name must be at least 2 characters"),
  productDescription: z
    .string()
    .min(10, "product Description must be at least 10 characters"),
  category: z.string(),
  price: z.number(),
  offerPrice: z.number().optional(),
  productImage: z.any().optional(),
});

export default function Page() {
  const { user} = useAuth()
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const productForm = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      price: 0,
      offerPrice: 0,
      category: "grain",
      productImage: [],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = productForm;

  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const uploadedUrls: string[] = [];

      for (const img of images) {
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "proucts"); // <-- change this
        formData.append("folder", "user");
        formData.append(
          "cloud_name",
          `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
        ); 
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!res.ok) {
          throw new Error("Upload failed");
        }
        const data = await res.json();
        console.log("Cloudinary Response:", data); // contains `secure_url`, `public_id`, etc.

        uploadedUrls.push(data?.secure_url);
      }

      const payload = {
        productName: data.productName,
        productDescription: data.productDescription,
        Amount: data.price,
        OfferAmount: data.offerPrice,
        category: data.category,
        productImage: uploadedUrls,
        id : user?._id
      };

      await axios.post("/product", payload);
      toast.success(`${data.productName} - uploaded sucessfully`);
      setLoading(false)
      reset()
      
    } catch (error) {
      console.error(error);
      toast.error("Upload failed")
     
    }finally{
      setLoading(false)
    }
  };

  return (
    <main className="flex-1 p-2 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ImageComponent onImagesChange={setImages} />

          <div className="mb-4">
            <Label
              htmlFor="productName"
              className="text-base font-medium text-gray-700 mb-2 block"
            >
              Product Name
            </Label>
            <Input id="productName" {...register("productName")} />
          </div>

          <div className="mb-4">
            <Label
              htmlFor="productDescription"
              className="text-base font-medium text-gray-700 mb-2 block"
            >
              Product Description
            </Label>
            <Textarea
              id="productDescription"
              {...register("productDescription")}
            />
          </div>

          <div className="mb-4">
            <Label className="text-base font-medium text-gray-700 mb-2 block">
              Category
            </Label>
            <Select onValueChange={(val) => setValue("category", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetable">Vegetable</SelectItem>
                <SelectItem value="fruit">Fruit</SelectItem>
                <SelectItem value="drink">Drink</SelectItem>
                <SelectItem value="dairy">Dairy</SelectItem>
                <SelectItem value="bakery">Bakery</SelectItem>
                <SelectItem value="grain">Grain</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="price"
                className="text-base font-medium text-gray-700 mb-2 block"
              >
                Product Price
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                {...register("price", { valueAsNumber: true })}
              />
            </div>
            <div>
              <Label
                htmlFor="offerPrice"
                className="text-base font-medium text-gray-700 mb-2 block"
              >
                Offer Price
              </Label>
              <Input
                id="offerPrice"
                type="number"
                min="0"
                {...register("offerPrice", { valueAsNumber: true })}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2"
          >
           {loading && "processing..." || "ADD"}
          </Button>
        </form>
      </div>
    </main>
  );
}
