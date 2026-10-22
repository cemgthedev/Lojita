import { messages } from "@/api/resources/favorites/messages";
import { z } from "zod";

export const favoriteSchema = z.object({
  variantId: z.string({ error: messages.variantId.invalid }).min(1, {
    error: messages.variantId.required,
  }),
  userId: z.string({ error: messages.userId.invalid }).min(1, {
    error: messages.userId.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
});

export type Favorite = z.infer<typeof favoriteSchema>;
