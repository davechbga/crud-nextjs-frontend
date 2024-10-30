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
import { Product } from "@/types/product";

interface ProductDialogProps {
  mode: "create" | "edit";
  product?: Product;
  trigger?: React.ReactNode;
}

export function ProductDialog({ mode, product, trigger }: ProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const title = mode === "create" ? "New Product" : "Edit Product";
  const description =
    mode === "create" ? "Add a new product" : "Edit existing product";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="default">{title}</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-lg">
        <DialogTitle className="text-2xl font-bold text-center text-gray-900">
          {title}
        </DialogTitle>
        <DialogDescription className="text-center text-gray-500">
          {description}
        </DialogDescription>
        <ProductForm
          mode={mode}
          initialData={product}
          onSuccess={handleSuccess}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
