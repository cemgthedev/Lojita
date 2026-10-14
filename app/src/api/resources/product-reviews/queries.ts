import { useQuery } from "@tanstack/react-query";
import { productReviewsKeys } from "@/api/resources/product-reviews/keys";
import { productReviewsService } from "@/api/resources/product-reviews/services";
import type { ProductReviewQuery } from "@/api/resources/product-reviews/validations/query.schema";

export function useProductReviewsQuery(query?: ProductReviewQuery) {
  return useQuery({
    queryKey: productReviewsKeys.list(query),
    queryFn: () => productReviewsService.list(query),
  });
}

export function useProductReviewQuery(id: string) {
  return useQuery({
    queryKey: productReviewsKeys.detail(id),
    queryFn: () => productReviewsService.findById(id),
    enabled: id.length > 0,
  });
}
