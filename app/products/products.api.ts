const API_URL = "http://localhost:4000/api/products";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
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

export async function updateProduct(id: number, productData: unknown) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(res);
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
