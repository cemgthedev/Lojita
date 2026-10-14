import { productImageSchema } from "@/api/resources/products/product-images/validations/product-image.schema";
import { z } from "zod";

export const createProductImageSchema = productImageSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export type CreateProductImage = z.infer<typeof createProductImageSchema>;
