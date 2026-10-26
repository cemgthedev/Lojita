import { messages } from "@/api/resources/orders/messages";
import { z } from "zod";

export const orderSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, { error: messages.id.required }),
  status: z.string({ error: messages.status.invalid }).nullable(),
  total: z.coerce.number({ error: messages.total.invalid }).nullable(),
  userId: z.string({ error: messages.userId.invalid }).min(1, { error: messages.userId.required }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, { error: messages.createdAt.required }),
  shippingTotal: z.coerce.number({ error: messages.shippingTotal.invalid }),
  discountTotal: z.coerce.number({ error: messages.discountTotal.invalid }),
  subtotal: z.coerce.number({ error: messages.subtotal.invalid }),
});

export type Order = z.infer<typeof orderSchema>;
