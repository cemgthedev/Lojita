import type { Favorite } from "@/api/resources/favorites/validations/favorite.schema";

const createdAt = "2026-01-01T00:00:00.000Z";

export const mockFavorites: Favorite[] = [
  {
    variantId: "mock-variant-camiseta-basica-1",
    userId: "mock-customer-1",
    createdAt,
  },
  {
    variantId: "mock-variant-polo-classica-1",
    userId: "mock-customer-1",
    createdAt,
  },
];
