import { variantSchema } from "@/api/resources/products/variants/validations/variant.schema";
import { z } from "zod";

export const updateVariantSchema = variantSchema.partial().omit({
  urlImage: true,
  updatedAt: true,
  createdAt: true,
});

export type UpdateVariant = z.infer<typeof updateVariantSchema>;
