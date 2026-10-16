import { useQuery } from "@tanstack/react-query";
import { categoriesKeys } from "@/api/resources/categories/keys";
import { mockCategories } from "@/api/resources/categories/categories.mock";
import { categoriesService } from "@/api/resources/categories/services";
import type { CategoryQuery } from "@/api/resources/categories/validations/query.schema";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";

export function useCategoriesQuery(query?: CategoryQuery) {
  const result = useQuery({
    queryKey: categoriesKeys.list(query),
    queryFn: () => categoriesService.list(query),
  });
  const mockData = filterMockData(mockCategories, query);
  return withMockArrayFallback(result, mockData);
}

export function useCategoryQuery(id: string) {
  const result = useQuery({
    queryKey: categoriesKeys.detail(id),
    queryFn: () => categoriesService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockCategories.find((category) => category.id === id),
  );
}
