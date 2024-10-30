"use client";

import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "@/app/products/products.api";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useProductContext } from "@/context/productContext";
import { Product } from "@/types/product";
import { useEffect } from "react";

interface ProductFormProps {
  mode: "create" | "edit";
  initialData?: Product;
  onSuccess: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ProductForm({
  mode,
  initialData,
  onSuccess,
  setIsOpen,
}: ProductFormProps) {
  const { fetchProducts } = useProductContext();

  const { register, handleSubmit, reset } = useForm<Product>({
    defaultValues:
      mode === "edit" && initialData
        ? {
            name: initialData.name,
            price: initialData.price,
            description: initialData.description,
            image: initialData.image,
          }
        : {
            name: "",
            price: 0,
            description: "",
            image: "",
          },
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      reset({
        name: initialData.name,
        price: initialData.price,
        description: initialData.description,
        image: initialData.image,
      });
    }
  }, [initialData, mode, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (mode === "edit" && initialData?.id) {
        console.log("Updating product:", initialData.id, data);
        const updatedProduct = await updateProduct(initialData.id, {
          ...data,
          price:
            typeof data.price === "string"
              ? parseFloat(data.price)
              : data.price,
        });
        console.log("Product updated successfully:", updatedProduct);
      } else {
        const newProduct = await createProduct({
          ...data,
          price:
            typeof data.price === "string"
              ? parseFloat(data.price)
              : data.price,
        });
        console.log("Product created:", newProduct); // Para debugging
      }
      await fetchProducts();
      onSuccess();
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
      <div>
        <Label>Name</Label>
        <Input
          {...register("name", { required: true })}
          defaultValue={initialData?.name}
          placeholder="Enter product name"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <Label>Price</Label>
        <Input
          {...register("price", {
            valueAsNumber: true,
            required: true,
            min: 0,
          })}
          type="number"
          defaultValue={initialData?.price}
          placeholder="Enter product price"
          className="w-full p-2 border rounded"
          step="0.01"
        />
      </div>

      <div>
        <Label>Description</Label>
        <Input
          {...register("description", { required: true })}
          defaultValue={initialData?.description}
          placeholder="Enter product description"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <Label>Image URL</Label>
        <Input
          {...register("image", { required: true })}
          defaultValue={initialData?.image}
          placeholder="Enter product image URL"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="flex gap-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(false)}
          className="w-full"
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full">
          {mode === "create" ? "Create" : "Update"}
        </Button>
      </div>
    </form>
  );
}
