import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import { assertNoMockIds } from "@/api/resources/query-fallback";
import type { CreateFavorite } from "@/api/resources/favorites/validations/create.schema";
import {
  favoriteSchema,
  type Favorite,
} from "@/api/resources/favorites/validations/favorite.schema";
import {
  favoriteQuerySchema,
  type FavoriteQuery,
} from "@/api/resources/favorites/validations/query.schema";

function favoriteEndpoint(variantId: number, userId: string) {
  return `${endpoints.favorites}/${encodeURIComponent(String(variantId))}/${encodeURIComponent(userId)}`;
}

function queryString(query?: FavoriteQuery) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(
    favoriteQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) params.set(key, String(value));
  }

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const favoritesService = {
  async list(query?: FavoriteQuery): Promise<Favorite[]> {
    const response = await http.get<unknown>(
      `${endpoints.favorites}${queryString(query)}`,
    );
    return favoriteSchema.array().parse(response.data);
  },

  async findById(variantId: number, userId: string): Promise<Favorite> {
    const response = await http.get<unknown>(
      favoriteEndpoint(variantId, userId),
    );
    return favoriteSchema.parse(response.data);
  },

  async create(favorite: CreateFavorite): Promise<Favorite> {
    const response = await http.post<unknown>(endpoints.favorites, favorite);
    return favoriteSchema.parse(response.data);
  },

  async remove(variantId: number, userId: string): Promise<void> {
    assertNoMockIds("favorito", userId);
    await http.delete<void>(favoriteEndpoint(variantId, userId));
  },
};
