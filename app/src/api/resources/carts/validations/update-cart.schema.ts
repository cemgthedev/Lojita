import { cartSchema } from "@/api/resources/carts/validations/cart.schema";
import { z } from "zod";

export const updateCartSchema = cartSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .extend({ id: cartSchema.shape.id });

export type UpdateCart = z.infer<typeof updateCartSchema>;
