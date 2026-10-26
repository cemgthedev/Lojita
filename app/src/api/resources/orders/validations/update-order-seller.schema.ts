import { orderSellerSchema } from "@/api/resources/orders/validations/order-seller.schema";
import { z } from "zod";
export const updateOrderSellerSchema = orderSellerSchema.omit({ id: true, createdAt: true }).partial().extend({
  id: orderSellerSchema.shape.id,
});
export type UpdateOrderSeller = z.infer<typeof updateOrderSellerSchema>;
