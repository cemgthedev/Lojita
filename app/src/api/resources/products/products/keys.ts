import type { ProductQuery } from "@/api/resources/products/products/validations/query.schema";

export const productsKeys = {
  all: ["products"] as const,
  lists: () => [...productsKeys.all, "list"] as const,
  list: (query?: ProductQuery) => [...productsKeys.lists(), query] as const,
  details: () => [...productsKeys.all, "detail"] as const,
  detail: (id: string) => [...productsKeys.details(), id] as const,
};
