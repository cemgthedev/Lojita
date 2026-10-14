import { productReviewSchema } from "@/api/resources/product-reviews/validations/product-review.schema";
import { z } from "zod";

export const createProductReviewSchema = productReviewSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
});

export type CreateProductReview = z.infer<typeof createProductReviewSchema>;
