import { z } from "zod";

export const productQuerySchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  categoryId: z.string().optional(),
  storeId: z.string().optional(),
});

export type ProductQuery = z.infer<typeof productQuerySchema>;
