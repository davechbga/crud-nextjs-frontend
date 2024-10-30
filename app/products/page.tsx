"use client";

import React, { useState } from "react";
import { useProductContext } from "@/context/productContext";
import { Button } from "@/components/ui/button";
import { ProductDialog } from "@/components/ProductDialog";
import { Product } from "@/types/product";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteProduct } from "./products.api";
import { useToast } from "@/hooks/use-toast";

export default function Products() {
  const { products, fetchProducts } = useProductContext();
  const { toast } = useToast();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id);
      await fetchProducts();
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete product",
      });
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <main className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <ProductDialog
          mode="create"
          trigger={<Button variant="default">Add New Product</Button>}
        />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative w-full h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <span className="font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-end gap-2">
              <ProductDialog
                mode="edit"
                product={product}
                trigger={<Button variant="outline">Edit</Button>}
              />
              <Button
                variant="destructive"
                onClick={() => setProductToDelete(product)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No products found</p>
          <ProductDialog
            mode="create"
            trigger={<Button variant="default">Add Your First Product</Button>}
          />
        </div>
      )}

      <AlertDialog
        open={!!productToDelete}
        onOpenChange={() => setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product &quot;{productToDelete?.name}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
