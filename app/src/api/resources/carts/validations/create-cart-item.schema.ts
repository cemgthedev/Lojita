import { cartItemSchema } from "@/api/resources/carts/validations/cart-item.schema";
import { z } from "zod";

export const createCartItemSchema = cartItemSchema.omit({ createdAt: true });

export type CreateCartItem = z.infer<typeof createCartItemSchema>;
