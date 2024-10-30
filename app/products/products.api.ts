import { Product } from "@/types/product";

const API_URL = "http://localhost:4000/api/products";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.message || "An error occurred");
  }
  return response.json();
}

export async function getProductList() {
  const res = await fetch(API_URL);
  return handleResponse(res);
}

export async function createProduct(productData: unknown) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(res);
}

export const updateProduct = async (
  id: number,
  data: Partial<Product>
): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};
export async function deleteProduct(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
