import { variantImagesKeys } from "@/api/resources/products/variant-images/keys";
import { variantImagesService } from "@/api/resources/products/variant-images/services";
import type { VariantImageQuery } from "@/api/resources/products/variant-images/validations/query.schema";
import { useQuery } from "@tanstack/react-query";

export function useVariantImagesQuery(query?: VariantImageQuery) {
  return useQuery({
    queryKey: variantImagesKeys.list(query),
    queryFn: () => variantImagesService.list(query),
  });
}

export function useVariantImageQuery(id: string) {
  return useQuery({
    queryKey: variantImagesKeys.detail(id),
    queryFn: () => variantImagesService.findById(id),
    enabled: id.length > 0,
  });
}
