import { specificationsKeys } from "@/api/resources/specifications/keys";
import { specificationsService } from "@/api/resources/specifications/services";
import type { CreateSpecification } from "@/api/resources/specifications/validations/create.schema";
import type { UpdateSpecification } from "@/api/resources/specifications/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateSpecificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (specification: CreateSpecification) =>
      specificationsService.create(specification),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: specificationsKeys.lists() }),
  });
}

export function useUpdateSpecificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (specification: UpdateSpecification) =>
      specificationsService.update(specification),
    onSuccess: (specification) => {
      queryClient.setQueryData(specificationsKeys.detail(specification.id), specification);
      return queryClient.invalidateQueries({ queryKey: specificationsKeys.lists() });
    },
  });
}

export function useDeleteSpecificationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => specificationsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: specificationsKeys.detail(id), exact: true });
      return queryClient.invalidateQueries({ queryKey: specificationsKeys.lists() });
    },
  });
}
