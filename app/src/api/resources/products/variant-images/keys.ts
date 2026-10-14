import type { VariantImageQuery } from "@/api/resources/products/variant-images/validations/query.schema";

export const variantImagesKeys = {
  all: ["variant-images"] as const,
  lists: () => [...variantImagesKeys.all, "list"] as const,
  list: (query?: VariantImageQuery) =>
    [...variantImagesKeys.lists(), query] as const,
  details: () => [...variantImagesKeys.all, "detail"] as const,
  detail: (id: string) => [...variantImagesKeys.details(), id] as const,
};
