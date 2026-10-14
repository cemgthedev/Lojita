import type { ProductImageQuery } from "@/api/resources/products/product-images/validations/query.schema";

export const productImagesKeys = {
  all: ["product-images"] as const,
  lists: () => [...productImagesKeys.all, "list"] as const,
  list: (query?: ProductImageQuery) =>
    [...productImagesKeys.lists(), query] as const,
  details: () => [...productImagesKeys.all, "detail"] as const,
  detail: (id: string) => [...productImagesKeys.details(), id] as const,
};
