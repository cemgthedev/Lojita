import { orderAddressSchema } from "@/api/resources/orders/validations/order-address.schema";
import { z } from "zod";
export const updateOrderAddressSchema = orderAddressSchema.omit({ id: true, createdAt: true }).partial().extend({
  id: orderAddressSchema.shape.id,
});
export type UpdateOrderAddress = z.infer<typeof updateOrderAddressSchema>;
