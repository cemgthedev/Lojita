import {
  attributesKeys,
  attributeValuesKeys,
} from "@/api/resources/products/attributes/keys";
import {
  attributesService,
  attributeValuesService,
} from "@/api/resources/products/attributes/services";
import type { CreateAttribute } from "@/api/resources/products/attributes/validations/create-attribute.schema";
import type { CreateAttributeValue } from "@/api/resources/products/attributes/validations/create-attribute-value.schema";
import type { UpdateAttribute } from "@/api/resources/products/attributes/validations/update-attribute.schema";
import type { UpdateAttributeValue } from "@/api/resources/products/attributes/validations/update-attribute-value.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAttributeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (attribute: CreateAttribute) => attributesService.create(attribute),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: attributesKeys.lists() }),
  });
}

export function useUpdateAttributeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (attribute: UpdateAttribute) => attributesService.update(attribute),
    onSuccess: (attribute) => {
      queryClient.setQueryData(attributesKeys.detail(attribute.id), attribute);
      return queryClient.invalidateQueries({ queryKey: attributesKeys.lists() });
    },
  });
}

export function useDeleteAttributeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => attributesService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: attributesKeys.detail(id), exact: true });
      return queryClient.invalidateQueries({ queryKey: attributesKeys.lists() });
    },
  });
}

export function useCreateAttributeValueMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: CreateAttributeValue) => attributeValuesService.create(value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: attributeValuesKeys.lists() }),
  });
}

export function useUpdateAttributeValueMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: UpdateAttributeValue) => attributeValuesService.update(value),
    onSuccess: (value) => {
      queryClient.setQueryData(attributeValuesKeys.detail(value.id), value);
      return queryClient.invalidateQueries({ queryKey: attributeValuesKeys.lists() });
    },
  });
}

export function useDeleteAttributeValueMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => attributeValuesService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: attributeValuesKeys.detail(id), exact: true });
      return queryClient.invalidateQueries({ queryKey: attributeValuesKeys.lists() });
    },
  });
}
