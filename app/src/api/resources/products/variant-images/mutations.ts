import { variantImagesKeys } from "@/api/resources/products/variant-images/keys";
import { variantImagesService } from "@/api/resources/products/variant-images/services";
import type { CreateVariantImage } from "@/api/resources/products/variant-images/validations/create.schema";
import type { UpdateVariantImage } from "@/api/resources/products/variant-images/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateVariantImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (image: CreateVariantImage) =>
      variantImagesService.create(image),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: variantImagesKeys.lists() }),
  });
}

export function useUpdateVariantImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (image: UpdateVariantImage) =>
      variantImagesService.update(image),
    onSuccess: (image) => {
      queryClient.setQueryData(variantImagesKeys.detail(image.id), image);
      return queryClient.invalidateQueries({
        queryKey: variantImagesKeys.lists(),
      });
    },
  });
}

export function useDeleteVariantImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => variantImagesService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: variantImagesKeys.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({
        queryKey: variantImagesKeys.lists(),
      });
    },
  });
}
