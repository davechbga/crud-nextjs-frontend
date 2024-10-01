/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/app/products/products.api";

import { useProductContext } from "@/context/productContext";
import { EditProductDialog } from "./EditProductDialog";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  description,
  image,
}: ProductCardProps) {
  const { fetchProducts } = useProductContext();

  const handleDelete = async () => {
    await deleteProduct(id);
    await fetchProducts();
  };

  return (
    <>
      <Card key={id} className="relative block overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain  sm:h-72"
        />

        <CardContent className="relative border border-gray-100 bg-white p-6">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <CardDescription className="text-gray-500">
            {description}
          </CardDescription>
          <CardDescription className="text-xl font-bold text-green-600">
            ${price}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex gap-x-4 w-full justify-center pt-4">
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <EditProductDialog
            product={{ id, name, price, description, image }}
          />
        </CardFooter>
      </Card>
    </>
  );
}
