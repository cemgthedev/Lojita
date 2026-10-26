import { cartSchema } from "@/api/resources/carts/validations/cart.schema";
import { z } from "zod";

export const createCartSchema = cartSchema
  .omit({ id: true, createdAt: true })
  .extend({ userId: cartSchema.shape.userId.optional() });

export type CreateCart = z.infer<typeof createCartSchema>;
