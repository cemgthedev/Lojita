import { variantsKeys } from "@/api/resources/products/variants/keys";
import { variantsService } from "@/api/resources/products/variants/services";
import type { CreateVariant } from "@/api/resources/products/variants/validations/create.schema";
import type { UpdateVariant } from "@/api/resources/products/variants/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateVariantMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variant: CreateVariant) => variantsService.create(variant),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: variantsKeys.lists() }),
  });
}

export function useUpdateVariantMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variant: UpdateVariant) => variantsService.update(variant),
    onSuccess: (variant) => {
      queryClient.setQueryData(variantsKeys.detail(variant.id), variant);
      return queryClient.invalidateQueries({ queryKey: variantsKeys.lists() });
    },
  });
}

export function useDeleteVariantMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => variantsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: variantsKeys.detail(id), exact: true });
      return queryClient.invalidateQueries({ queryKey: variantsKeys.lists() });
    },
  });
}
