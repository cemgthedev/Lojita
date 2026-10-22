import type { FavoriteQuery } from "@/api/resources/favorites/validations/query.schema";

export const favoritesKeys = {
  all: ["favorites"] as const,
  lists: () => [...favoritesKeys.all, "list"] as const,
  list: (query?: FavoriteQuery) => [...favoritesKeys.lists(), query] as const,
  details: () => [...favoritesKeys.all, "detail"] as const,
  detail: (variantId: string, userId: string) =>
    [...favoritesKeys.details(), variantId, userId] as const,
};
