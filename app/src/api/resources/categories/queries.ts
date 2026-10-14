import { useQuery } from "@tanstack/react-query";
import { categoriesKeys } from "@/api/resources/categories/keys";
import { categoriesService } from "@/api/resources/categories/services";
import type { CategoryQuery } from "@/api/resources/categories/validations/query.schema";

export function useCategoriesQuery(query?: CategoryQuery) {
  return useQuery({
    queryKey: categoriesKeys.list(query),
    queryFn: () => categoriesService.list(query),
  });
}

export function useCategoryQuery(id: string) {
  return useQuery({
    queryKey: categoriesKeys.detail(id),
    queryFn: () => categoriesService.findById(id),
    enabled: id.length > 0,
  });
}
