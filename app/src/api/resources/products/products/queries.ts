import { useQuery } from "@tanstack/react-query";
import { productsKeys } from "@/api/resources/products/products/keys";
import { mockProducts } from "@/api/resources/products/products.mock";
import { productsService } from "@/api/resources/products/products/services";
import type { ProductQuery } from "@/api/resources/products/products/validations/query.schema";
import {
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";

export function useProductsQuery(query?: ProductQuery, enabled = true) {
  const result = useQuery({
    queryKey: productsKeys.list(query),
    queryFn: () => productsService.list(query),
    enabled,
  });
  const mockData = mockProducts.filter((product) => {
    if (query?.id && product.id !== query.id) return false;
    if (query?.categoryId && product.categoryId !== query.categoryId) {
      return false;
    }
    if (query?.storeId && product.storeId !== query.storeId) return false;
    if (
      query?.title &&
      !product.title.toLocaleLowerCase("pt-BR").includes(
        query.title.trim().toLocaleLowerCase("pt-BR"),
      )
    ) {
      return false;
    }
    return true;
  });
  return withMockArrayFallback(result, mockData);
}

export function useProductQuery(id: string) {
  const result = useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => productsService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockProducts.find((product) => product.id === id),
  );
}
