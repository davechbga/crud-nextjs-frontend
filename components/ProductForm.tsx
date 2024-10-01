"use client"; // Añade esta línea

import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "@/app/products/products.api";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useProductContext } from "@/context/productContext";

interface ProductFormProps {
  onSuccess: () => void;
  setIsOpen: (isOpen: boolean) => void;
  product: {
    id: number;
    name: string;
    price: number;
    description?: string;
    image?: string;
  };
}

export default function ProductForm({
  onSuccess,
  setIsOpen,
  product,
}: ProductFormProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: product,
  });
  const { fetchProducts } = useProductContext();

  const onSubmit = handleSubmit(async (data) => {
    if (product) {
      await updateProduct(product.id, {
        ...data,
        price: parseFloat(data.price.toString()),
      });
    } else {
      await createProduct({
        ...data,
        price: parseFloat(data.price.toString()),
      });
    }
    await fetchProducts();
    onSuccess();
  });

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <Label>Name</Label>
        <Input
          {...register("name")}
          id="name"
          placeholder="Enter product name"
          className="w-full p-2 border rounded"
        />
        <Label>Price</Label>
        <Input
          {...register("price")}
          id="price"
          placeholder="Enter product price"
          className="w-full p-2 border rounded"
        />
        <Label>Description</Label>
        <Input
          {...register("description")}
          id="description"
          placeholder="Enter product description"
          className="w-full p-2 border rounded"
        />
        <Label>Product Image</Label>
        <Input
          {...register("image")}
          id="image"
          placeholder="Enter product image url"
          className="w-full p-2 border rounded"
        />

        <Button
          variant="outline"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button variant="default" type="submit" onClick={onSuccess}>
          Done
        </Button>
      </form>
    </>
  );
}
