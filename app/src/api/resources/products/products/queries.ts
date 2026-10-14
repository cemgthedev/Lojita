import { useQuery } from "@tanstack/react-query";
import { productsKeys } from "@/api/resources/products/products/keys";
import { productsService } from "@/api/resources/products/products/services";
import type { ProductQuery } from "@/api/resources/products/products/validations/query.schema";

export function useProductsQuery(query?: ProductQuery) {
  return useQuery({
    queryKey: productsKeys.list(query),
    queryFn: () => productsService.list(query),
  });
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => productsService.findById(id),
    enabled: id.length > 0,
  });
}
