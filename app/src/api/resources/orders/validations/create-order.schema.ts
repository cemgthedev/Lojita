import { orderSchema } from "@/api/resources/orders/validations/order.schema";
import { z } from "zod";

export const createOrderSchema = orderSchema
  .omit({ id: true, createdAt: true })
  .extend({
    status: orderSchema.shape.status.optional(),
    total: orderSchema.shape.total.optional(),
    userId: orderSchema.shape.userId.optional(),
  });
export type CreateOrder = z.infer<typeof createOrderSchema>;
