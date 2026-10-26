import { orderItemSchema } from "@/api/resources/orders/validations/order-item.schema";
import { z } from "zod";
export const updateOrderItemSchema = orderItemSchema.omit({ createdAt: true }).partial().extend({
  id: orderItemSchema.shape.id,
  orderSellerId: orderItemSchema.shape.orderSellerId,
  variantId: orderItemSchema.shape.variantId,
});
export type UpdateOrderItem = z.infer<typeof updateOrderItemSchema>;
