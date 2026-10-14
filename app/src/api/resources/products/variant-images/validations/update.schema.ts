import { variantImageSchema } from "@/api/resources/products/variant-images/validations/variant-image.schema";
import { z } from "zod";

export const updateVariantImageSchema = variantImageSchema.partial().omit({
  createdAt: true,
  updatedAt: true,
});

export type UpdateVariantImage = z.infer<typeof updateVariantImageSchema>;
