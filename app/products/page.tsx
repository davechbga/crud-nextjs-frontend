/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import ProductCard from "@/components/ProductCard";
import { useProductContext } from "@/context/productContext";

export default function Products() {
  const { products } = useProductContext();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-5">
      {products.length > 0 ? (
        products.map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            image={product.image}
          />
        ))
      ) : (
        <p
          className="
          col-span-3
          text-center
          text-gray-500
          text-lg
          font-semibold
          py-5
        "
        >
          No products available
        </p>
      )}
    </div>
  );
}
