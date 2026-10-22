import { favoriteSchema } from "@/api/resources/favorites/validations/favorite.schema";
import { z } from "zod";

export const createFavoriteSchema = favoriteSchema.pick({
  variantId: true,
});

export type CreateFavorite = z.infer<typeof createFavoriteSchema>;
