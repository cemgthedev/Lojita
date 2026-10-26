import { messages } from "@/api/resources/carts/messages";
import { z } from "zod";

export const cartItemSchema = z.object({
  quantity: z.coerce
    .number({ error: messages.quantity.invalid })
    .int(messages.quantity.invalid)
    .min(1, { error: messages.quantity.required }),
  cartId: z.string({ error: messages.cartId.invalid }).min(1, {
    error: messages.cartId.required,
  }),
  variantId: z.string({ error: messages.variantId.invalid }).min(1, {
    error: messages.variantId.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
});

export type CartItem = z.infer<typeof cartItemSchema>;
