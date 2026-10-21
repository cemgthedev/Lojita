import { useQuery } from "@tanstack/react-query";
import { productReviewsKeys } from "@/api/resources/product-reviews/keys";
import { productReviewsService } from "@/api/resources/product-reviews/services";
import type { ProductReviewQuery } from "@/api/resources/product-reviews/validations/query.schema";
import { mockProductReviews } from "@/api/resources/products/products.mock";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";

export function useProductReviewsQuery(query?: ProductReviewQuery) {
  const result = useQuery({
    queryKey: productReviewsKeys.list(query),
    queryFn: () => productReviewsService.list(query),
  });
  return withMockArrayFallback(
    result,
    filterMockData(mockProductReviews, query),
  );
}

export function useProductReviewQuery(id: string) {
  const result = useQuery({
    queryKey: productReviewsKeys.detail(id),
    queryFn: () => productReviewsService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockProductReviews.find((review) => review.id === id),
  );
}
