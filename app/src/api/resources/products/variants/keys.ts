import type { VariantQuery } from "@/api/resources/products/variants/validations/query.schema";

export const variantsKeys = {
  all: ["variants"] as const,
  lists: () => [...variantsKeys.all, "list"] as const,
  list: (query?: VariantQuery) => [...variantsKeys.lists(), query] as const,
  details: () => [...variantsKeys.all, "detail"] as const,
  detail: (id: string) => [...variantsKeys.details(), id] as const,
};
