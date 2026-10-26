import { cartItemSchema } from "@/api/resources/carts/validations/cart-item.schema";
import { z } from "zod";

export const updateCartItemSchema = cartItemSchema
  .omit({ createdAt: true })
  .partial()
  .extend({
    cartId: cartItemSchema.shape.cartId,
    variantId: cartItemSchema.shape.variantId,
  });

export type UpdateCartItem = z.infer<typeof updateCartItemSchema>;
