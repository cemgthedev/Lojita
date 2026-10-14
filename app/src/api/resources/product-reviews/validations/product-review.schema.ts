import { messages } from "@/api/resources/product-reviews/messages";
import { z } from "zod";

export const productReviewSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  rating: z.coerce
    .number({ error: messages.rating.invalid })
    .int(messages.rating.invalid),
  comment: z.string({ error: messages.comment.invalid }).min(1, {
    error: messages.comment.required,
  }),
  status: z.string({ error: messages.status.invalid }).min(1, {
    error: messages.status.required,
  }),
  userId: z.string({ error: messages.userId.invalid }).min(1, {
    error: messages.userId.required,
  }),
  productId: z.string({ error: messages.productId.invalid }).min(1, {
    error: messages.productId.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
});

export type ProductReview = z.infer<typeof productReviewSchema>;
