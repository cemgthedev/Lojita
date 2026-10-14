import { z } from "zod";

export const variantImageQuerySchema = z.object({
  id: z.string().optional(),
  variantId: z.string().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export type VariantImageQuery = z.infer<typeof variantImageQuerySchema>;
