import { favoritesKeys } from "@/api/resources/favorites/keys";
import { mockFavorites } from "@/api/resources/favorites/favorites.mock";
import { favoritesService } from "@/api/resources/favorites/services";
import type { FavoriteQuery } from "@/api/resources/favorites/validations/query.schema";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function useFavoritesQuery(query?: FavoriteQuery, enabled = true) {
  const result = useQuery({
    queryKey: favoritesKeys.list(query),
    queryFn: () => favoritesService.list(query),
    enabled,
  });
  return withMockArrayFallback(
    result,
    filterMockData(mockFavorites, query),
  );
}

export function useFavoriteQuery(variantId: string, userId: string) {
  const result = useQuery({
    queryKey: favoritesKeys.detail(variantId, userId),
    queryFn: () => favoritesService.findById(variantId, userId),
    enabled: variantId.length > 0 && userId.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockFavorites.find(
      (favorite) =>
        favorite.variantId === variantId && favorite.userId === userId,
    ),
  );
}
