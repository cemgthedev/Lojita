import { z } from "zod";
export const orderSellerQuerySchema = z.object({
  id: z.string().optional(),
  orderId: z.string().optional(),
  storeId: z.string().optional(),
  status: z.string().optional(),
});
export type OrderSellerQuery = z.infer<typeof orderSellerQuerySchema>;
