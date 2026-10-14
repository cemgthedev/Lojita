import { productReviewSchema } from "@/api/resources/product-reviews/validations/product-review.schema";
import { z } from "zod";

export const updateProductReviewSchema = productReviewSchema.partial().omit({
  updatedAt: true,
  createdAt: true,
});

export type UpdateProductReview = z.infer<typeof updateProductReviewSchema>;
