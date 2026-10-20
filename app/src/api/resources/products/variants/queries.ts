import { useQuery } from "@tanstack/react-query";
import { variantsKeys } from "@/api/resources/products/variants/keys";
import { mockVariants } from "@/api/resources/products/products.mock";
import { variantsService } from "@/api/resources/products/variants/services";
import type { VariantQuery } from "@/api/resources/products/variants/validations/query.schema";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";

export function useVariantsQuery(query?: VariantQuery) {
  const result = useQuery({
    queryKey: variantsKeys.list(query),
    queryFn: () => variantsService.list(query),
  });
  return withMockArrayFallback(
    result,
    filterMockData(mockVariants, query),
  );
}

export function useVariantQuery(id: string) {
  const result = useQuery({
    queryKey: variantsKeys.detail(id),
    queryFn: () => variantsService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockVariants.find((variant) => variant.id === id),
  );
}
