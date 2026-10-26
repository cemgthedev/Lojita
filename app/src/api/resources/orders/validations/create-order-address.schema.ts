import { orderAddressSchema } from "@/api/resources/orders/validations/order-address.schema";
export const createOrderAddressSchema = orderAddressSchema.omit({ id: true, createdAt: true });
export type CreateOrderAddress = import("zod").infer<typeof createOrderAddressSchema>;
