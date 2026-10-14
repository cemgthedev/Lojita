import { variantSchema } from "@/api/resources/products/variants/validations/variant.schema";
import { z } from "zod";

export const createVariantSchema = variantSchema.omit({
  id: true,
  urlImage: true,
  updatedAt: true,
  createdAt: true,
});

export type CreateVariant = z.infer<typeof createVariantSchema>;
