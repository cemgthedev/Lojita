import { orderSellerSchema } from "@/api/resources/orders/validations/order-seller.schema";
export const createOrderSellerSchema = orderSellerSchema.omit({ id: true, createdAt: true });
export type CreateOrderSeller = import("zod").infer<typeof createOrderSellerSchema>;
