import { z } from "zod";

export const favoriteQuerySchema = z.object({
  variantId: z.string().optional(),
  userId: z.string().optional(),
});

export type FavoriteQuery = z.infer<typeof favoriteQuerySchema>;
