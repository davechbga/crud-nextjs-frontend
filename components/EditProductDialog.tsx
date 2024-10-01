"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export function EditProductDialog({ product }: { product: ProductCardProps }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogTitle className="text-2xl font-bold text-center text-gray-900">
          Edit Product
        </DialogTitle>
        <DialogDescription className="text-center text-gray-500">
          Edit a product
        </DialogDescription>
        <ProductForm
          onSuccess={handleSuccess}
          setIsOpen={setIsOpen}
          product={product}
        />
      </DialogContent>
    </Dialog>
  );
}
