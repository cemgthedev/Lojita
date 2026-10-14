import { productImagesKeys } from "@/api/resources/products/product-images/keys";
import { productImagesService } from "@/api/resources/products/product-images/services";
import type { ProductImageQuery } from "@/api/resources/products/product-images/validations/query.schema";
import { useQuery } from "@tanstack/react-query";

export function useProductImagesQuery(query?: ProductImageQuery) {
  return useQuery({
    queryKey: productImagesKeys.list(query),
    queryFn: () => productImagesService.list(query),
  });
}

export function useProductImageQuery(id: string) {
  return useQuery({
    queryKey: productImagesKeys.detail(id),
    queryFn: () => productImagesService.findById(id),
    enabled: id.length > 0,
  });
}
