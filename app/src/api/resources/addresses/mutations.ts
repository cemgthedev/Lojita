import { addressesKeys } from "@/api/resources/addresses/keys";
import { addressesService } from "@/api/resources/addresses/services";
import type { CreateAddress } from "@/api/resources/addresses/validations/create.schema";
import type { UpdateAddress } from "@/api/resources/addresses/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createdAddress: CreateAddress) =>
      addressesService.create(createdAddress),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: addressesKeys.lists() }),
  });
}

export function useUpdateAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedAddress: UpdateAddress) =>
      addressesService.update(updatedAddress),
    onSuccess: (address) => {
      queryClient.setQueryData(addressesKeys.detail(address.id), address);
      return queryClient.invalidateQueries({ queryKey: addressesKeys.lists() });
    },
  });
}

export function useDeleteAddressMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => addressesService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: addressesKeys.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({ queryKey: addressesKeys.lists() });
    },
  });
}
