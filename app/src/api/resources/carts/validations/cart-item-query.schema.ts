import { z } from "zod";

export const cartItemQuerySchema = z.object({
  cartId: z.string().optional(),
  variantId: z.string().optional(),
});

export type CartItemQuery = z.infer<typeof cartItemQuerySchema>;
