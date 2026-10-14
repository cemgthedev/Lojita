import { productSchema } from "@/api/resources/products/products/validations/product.schema";
import { z } from "zod";

export const updateProductSchema = productSchema.partial().omit({
  createdAt: true,
  updatedAt: true,
});

export type UpdateProduct = z.infer<typeof updateProductSchema>;
