import { z } from "zod";

export const productImageQuerySchema = z.object({
  id: z.string().optional(),
  productId: z.string().optional(),
  sortOrder: z.coerce.number().int().optional(),
});

export type ProductImageQuery = z.infer<typeof productImageQuerySchema>;
