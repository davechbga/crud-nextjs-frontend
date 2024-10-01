import React from "react";
import { NewProductDialog } from "./NewProductDialog";

export default function Navbar() {
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Nextjs + NestjsApp
      </h1>

      <NewProductDialog />
    </div>
  );
}
