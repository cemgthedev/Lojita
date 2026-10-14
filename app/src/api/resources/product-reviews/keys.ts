import type { ProductReviewQuery } from "@/api/resources/product-reviews/validations/query.schema";

export const productReviewsKeys = {
  all: ["product-reviews"] as const,
  lists: () => [...productReviewsKeys.all, "list"] as const,
  list: (query?: ProductReviewQuery) => [...productReviewsKeys.lists(), query] as const,
  details: () => [...productReviewsKeys.all, "detail"] as const,
  detail: (id: string) => [...productReviewsKeys.details(), id] as const,
};
