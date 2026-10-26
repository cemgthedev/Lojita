import { orderSchema } from "@/api/resources/orders/validations/order.schema";
import { z } from "zod";

export const updateOrderSchema = orderSchema.omit({ id: true, createdAt: true }).partial().extend({
  id: orderSchema.shape.id,
});
export type UpdateOrder = z.infer<typeof updateOrderSchema>;
