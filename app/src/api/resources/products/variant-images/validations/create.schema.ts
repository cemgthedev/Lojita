import { variantImageSchema } from "@/api/resources/products/variant-images/validations/variant-image.schema";
import { z } from "zod";

export const createVariantImageSchema = variantImageSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export type CreateVariantImage = z.infer<typeof createVariantImageSchema>;
