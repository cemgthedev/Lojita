import { useQuery } from "@tanstack/react-query";
import { attributesKeys, attributeValuesKeys } from "@/api/resources/products/attributes/keys";
import { attributesService, attributeValuesService } from "@/api/resources/products/attributes/services";
import type { AttributeQuery } from "@/api/resources/products/attributes/validations/attribute-query.schema";
import type { AttributeValueQuery } from "@/api/resources/products/attributes/validations/attribute-value-query.schema";

export function useAttributesQuery(query?: AttributeQuery) {
  return useQuery({
    queryKey: attributesKeys.list(query),
    queryFn: () => attributesService.list(query),
  });
}

export function useAttributeQuery(id: string) {
  return useQuery({
    queryKey: attributesKeys.detail(id),
    queryFn: () => attributesService.findById(id),
    enabled: id.length > 0,
  });
}

export function useAttributeValuesQuery(query?: AttributeValueQuery) {
  return useQuery({
    queryKey: attributeValuesKeys.list(query),
    queryFn: () => attributeValuesService.list(query),
  });
}

export function useAttributeValueQuery(id: string) {
  return useQuery({
    queryKey: attributeValuesKeys.detail(id),
    queryFn: () => attributeValuesService.findById(id),
    enabled: id.length > 0,
  });
}
