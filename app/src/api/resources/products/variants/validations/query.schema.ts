import { z } from "zod";

export const variantQuerySchema = z.object({
  id: z.string().optional(),
  productId: z.string().optional(),
  sku: z.string().optional(),
  status: z.string().optional(),
});

export type VariantQuery = z.infer<typeof variantQuerySchema>;
