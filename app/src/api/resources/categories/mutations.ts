import { categoriesKeys } from "@/api/resources/categories/keys";
import { categoriesService } from "@/api/resources/categories/services";
import type { CreateCategory } from "@/api/resources/categories/validations/create.schema";
import type { UpdateCategory } from "@/api/resources/categories/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: CreateCategory) => categoriesService.create(category),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: categoriesKeys.lists() }),
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category: UpdateCategory) => categoriesService.update(category),
    onSuccess: (category) => {
      queryClient.setQueryData(categoriesKeys.detail(category.id), category);
      return queryClient.invalidateQueries({ queryKey: categoriesKeys.lists() });
    },
  });
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: categoriesKeys.detail(id), exact: true });
      return queryClient.invalidateQueries({ queryKey: categoriesKeys.lists() });
    },
  });
}
