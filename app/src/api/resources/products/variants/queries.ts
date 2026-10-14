import { useQuery } from "@tanstack/react-query";
import { variantsKeys } from "@/api/resources/products/variants/keys";
import { variantsService } from "@/api/resources/products/variants/services";
import type { VariantQuery } from "@/api/resources/products/variants/validations/query.schema";

export function useVariantsQuery(query?: VariantQuery) {
  return useQuery({
    queryKey: variantsKeys.list(query),
    queryFn: () => variantsService.list(query),
  });
}

export function useVariantQuery(id: string) {
  return useQuery({
    queryKey: variantsKeys.detail(id),
    queryFn: () => variantsService.findById(id),
    enabled: id.length > 0,
  });
}
