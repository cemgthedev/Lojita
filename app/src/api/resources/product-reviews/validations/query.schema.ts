import { z } from "zod";

export const productReviewQuerySchema = z.object({
  id: z.string().optional(),
  rating: z.coerce.number().int().optional(),
  status: z.string().optional(),
  userId: z.string().optional(),
  productId: z.string().optional(),
});

export type ProductReviewQuery = z.infer<typeof productReviewQuerySchema>;
