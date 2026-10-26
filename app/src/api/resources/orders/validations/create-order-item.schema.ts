import { orderItemSchema } from "@/api/resources/orders/validations/order-item.schema";
export const createOrderItemSchema = orderItemSchema.omit({ createdAt: true });
export type CreateOrderItem = import("zod").infer<typeof createOrderItemSchema>;
