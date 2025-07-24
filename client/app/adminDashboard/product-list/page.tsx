"use client";
import React from "react";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/product";
// import ProductsSlide from '@/components/home/ProductsSlide';
import ProductRating from "@/components/ProductRating";

function page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data?.map((product) => (
        <ProductRating
          productName={product.productName}
          OfferAmount={product.OfferAmount}
          Amount={product.Amount}
          image={product.productImage[0]}
          category={product.category}
        />
      ))}
    </div>
  );
}

export default page;
