import { z } from "zod";
export const orderAddressQuerySchema = z.object({
  id: z.string().optional(),
  orderId: z.string().optional(),
});
export type OrderAddressQuery = z.infer<typeof orderAddressQuerySchema>;
