import { z } from "zod";
export const orderItemQuerySchema = z.object({
  orderId: z.string().optional(),
  variantId: z.string().optional(),
  orderSellerId: z.string().optional(),
});
export type OrderItemQuery = z.infer<typeof orderItemQuerySchema>;
