import {
  attributesKeys,
  attributeValuesKeys,
} from "@/api/resources/products/attributes/keys";
import {
  attributesService,
  attributeValuesService,
} from "@/api/resources/products/attributes/services";
import type { AttributeQuery } from "@/api/resources/products/attributes/validations/attribute-query.schema";
import type { AttributeValueQuery } from "@/api/resources/products/attributes/validations/attribute-value-query.schema";
import {
  mockAttributes,
  mockAttributeValues,
} from "@/api/resources/products/products.mock";
import {
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function useAttributesQuery(query?: AttributeQuery) {
  const result = useQuery({
    queryKey: attributesKeys.list(query),
    queryFn: () => attributesService.list(query),
  });
  const normalizedName = query?.name?.trim().toLocaleLowerCase("pt-BR");
  const mockData = mockAttributes.filter(
    (attribute) =>
      (!query?.id || attribute.id === query.id) &&
      (!query?.type || attribute.type === query.type) &&
      (!normalizedName ||
        attribute.name.toLocaleLowerCase("pt-BR").includes(normalizedName)),
  );

  return withMockArrayFallback(result, mockData);
}

export function useAttributeQuery(id: string) {
  const result = useQuery({
    queryKey: attributesKeys.detail(id),
    queryFn: () => attributesService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockAttributes.find((attribute) => attribute.id === id),
  );
}

export function useAttributeValuesQuery(
  query?: AttributeValueQuery,
  enabled = true,
) {
  const result = useQuery({
    queryKey: attributeValuesKeys.list(query),
    queryFn: () => attributeValuesService.list(query),
    enabled,
  });
  const normalizedTitle = query?.title?.trim().toLocaleLowerCase("pt-BR");
  const normalizedValue = query?.value?.trim().toLocaleLowerCase("pt-BR");
  const mockData = mockAttributeValues.filter(
    (attributeValue) =>
      (!query?.id || attributeValue.id === query.id) &&
      (!query?.attributeId ||
        attributeValue.attributeId === query.attributeId) &&
      (!normalizedTitle ||
        attributeValue.title
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedTitle)) &&
      (!normalizedValue ||
        attributeValue.value
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedValue)),
  );

  return withMockArrayFallback(result, mockData);
}

export function useAttributeValueQuery(id: string) {
  return useQuery({
    queryKey: attributeValuesKeys.detail(id),
    queryFn: () => attributeValuesService.findById(id),
    enabled: id.length > 0,
  });
}
