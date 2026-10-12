import { storesKeys } from "@/api/resources/stores/keys";
import { storesService } from "@/api/resources/stores/services";
import type { CreateStore } from "@/api/resources/stores/validations/create.schema";
import type { UpdateStore } from "@/api/resources/stores/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateStoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createdStore: CreateStore) =>
      storesService.create(createdStore),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: storesKeys.lists() }),
  });
}

export function useUpdateStoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedStore: UpdateStore) =>
      storesService.update(updatedStore),
    onSuccess: (store) => {
      queryClient.setQueryData(storesKeys.detail(store.id), store);
      return queryClient.invalidateQueries({ queryKey: storesKeys.lists() });
    },
  });
}

export function useDeleteStoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => storesService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: storesKeys.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({ queryKey: storesKeys.lists() });
    },
  });
}
