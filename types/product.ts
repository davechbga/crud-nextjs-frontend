export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// También podrías necesitar estos tipos para las operaciones de crear/actualizar
export type CreateProductDto = Omit<Product, "id" | "createdAt" | "updatedAt">;
export type UpdateProductDto = Partial<CreateProductDto>;
