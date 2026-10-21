import { variantImagesKeys } from "@/api/resources/products/variant-images/keys";
import { mockVariantImages } from "@/api/resources/products/products.mock";
import { variantImagesService } from "@/api/resources/products/variant-images/services";
import type { VariantImageQuery } from "@/api/resources/products/variant-images/validations/query.schema";
import {
  filterMockData,
  withMockArrayFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function useVariantImagesQuery(
  query?: VariantImageQuery,
  enabled = true,
) {
  const result = useQuery({
    queryKey: variantImagesKeys.list(query),
    queryFn: () => variantImagesService.list(query),
    enabled,
  });
  return withMockArrayFallback(
    result,
    filterMockData(mockVariantImages, query),
  );
}

export function useVariantImageQuery(id: string) {
  return useQuery({
    queryKey: variantImagesKeys.detail(id),
    queryFn: () => variantImagesService.findById(id),
    enabled: id.length > 0,
  });
}
