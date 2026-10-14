import { productImageSchema } from "@/api/resources/products/product-images/validations/product-image.schema";
import { z } from "zod";

export const updateProductImageSchema = productImageSchema.partial().omit({
  createdAt: true,
  updatedAt: true,
});

export type UpdateProductImage = z.infer<typeof updateProductImageSchema>;
