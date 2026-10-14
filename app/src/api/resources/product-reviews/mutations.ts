import { productReviewsKeys } from "@/api/resources/product-reviews/keys";
import { productReviewsService } from "@/api/resources/product-reviews/services";
import type { CreateProductReview } from "@/api/resources/product-reviews/validations/create.schema";
import type { UpdateProductReview } from "@/api/resources/product-reviews/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProductReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (review: CreateProductReview) => productReviewsService.create(review),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productReviewsKeys.lists() }),
  });
}

export function useUpdateProductReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (review: UpdateProductReview) => productReviewsService.update(review),
    onSuccess: (review) => {
      queryClient.setQueryData(productReviewsKeys.detail(review.id), review);
      return queryClient.invalidateQueries({ queryKey: productReviewsKeys.lists() });
    },
  });
}

export function useDeleteProductReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productReviewsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: productReviewsKeys.detail(id), exact: true });
      return queryClient.invalidateQueries({ queryKey: productReviewsKeys.lists() });
    },
  });
}
