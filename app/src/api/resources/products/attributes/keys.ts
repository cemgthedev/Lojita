import type { AttributeQuery } from "@/api/resources/products/attributes/validations/attribute-query.schema";
import type { AttributeValueQuery } from "@/api/resources/products/attributes/validations/attribute-value-query.schema";

export const attributesKeys = {
  all: ["attributes"] as const,
  lists: () => [...attributesKeys.all, "list"] as const,
  list: (query?: AttributeQuery) => [...attributesKeys.lists(), query] as const,
  details: () => [...attributesKeys.all, "detail"] as const,
  detail: (id: string) => [...attributesKeys.details(), id] as const,
};

export const attributeValuesKeys = {
  all: ["attribute-values"] as const,
  lists: () => [...attributeValuesKeys.all, "list"] as const,
  list: (query?: AttributeValueQuery) => [...attributeValuesKeys.lists(), query] as const,
  details: () => [...attributeValuesKeys.all, "detail"] as const,
  detail: (id: string) => [...attributeValuesKeys.details(), id] as const,
};
