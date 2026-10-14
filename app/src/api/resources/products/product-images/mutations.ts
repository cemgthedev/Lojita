import { productImagesKeys } from "@/api/resources/products/product-images/keys";
import { productImagesService } from "@/api/resources/products/product-images/services";
import type { CreateProductImage } from "@/api/resources/products/product-images/validations/create.schema";
import type { UpdateProductImage } from "@/api/resources/products/product-images/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProductImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (image: CreateProductImage) =>
      productImagesService.create(image),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: productImagesKeys.lists() }),
  });
}

export function useUpdateProductImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (image: UpdateProductImage) =>
      productImagesService.update(image),
    onSuccess: (image) => {
      queryClient.setQueryData(productImagesKeys.detail(image.id), image);
      return queryClient.invalidateQueries({
        queryKey: productImagesKeys.lists(),
      });
    },
  });
}

export function useDeleteProductImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productImagesService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: productImagesKeys.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({
        queryKey: productImagesKeys.lists(),
      });
    },
  });
}
