import { productSchema } from "@/api/resources/products/products/validations/product.schema";
import { z } from "zod";

export const createProductSchema = productSchema.omit({
  id: true,
  defaultVariant: true,
  updatedAt: true,
  createdAt: true,
});

export type CreateProduct = z.infer<typeof createProductSchema>;
