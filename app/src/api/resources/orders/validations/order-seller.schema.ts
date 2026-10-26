import { messages } from "@/api/resources/orders/messages";
import { z } from "zod";

export const orderSellerSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, { error: messages.id.required }),
  status: z.string({ error: messages.status.invalid }).min(1, { error: messages.status.required }),
  subtotal: z.coerce.number({ error: messages.subtotal.invalid }),
  total: z.coerce.number({ error: messages.total.invalid }),
  shippingTotal: z.coerce.number({ error: messages.shippingTotal.invalid }),
  discountTotal: z.coerce.number({ error: messages.discountTotal.invalid }),
  storeId: z.string({ error: messages.storeId.invalid }).min(1, { error: messages.storeId.required }),
  orderId: z.string({ error: messages.orderId.invalid }).min(1, { error: messages.orderId.required }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, { error: messages.createdAt.required }),
  sortOrder: z.coerce.number({ error: messages.sortOrder.invalid }).int(),
});

export type OrderSeller = z.infer<typeof orderSellerSchema>;
