import type { CategoryQuery } from "@/api/resources/categories/validations/query.schema";

export const categoriesKeys = {
  all: ["categories"] as const,
  lists: () => [...categoriesKeys.all, "list"] as const,
  list: (query?: CategoryQuery) => [...categoriesKeys.lists(), query] as const,
  details: () => [...categoriesKeys.all, "detail"] as const,
  detail: (id: string) => [...categoriesKeys.details(), id] as const,
};
