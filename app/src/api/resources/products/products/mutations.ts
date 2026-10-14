import { productsKeys } from "@/api/resources/products/products/keys";
import { productsService } from "@/api/resources/products/products/services";
import type { CreateProduct } from "@/api/resources/products/products/validations/create.schema";
import type { UpdateProduct } from "@/api/resources/products/products/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: CreateProduct) => productsService.create(product),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productsKeys.lists() }),
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (product: UpdateProduct) => productsService.update(product),
    onSuccess: (product) => {
      queryClient.setQueryData(productsKeys.detail(product.id), product);
      return queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: productsKeys.detail(id), exact: true });
      return queryClient.invalidateQueries({ queryKey: productsKeys.lists() });
    },
  });
}
