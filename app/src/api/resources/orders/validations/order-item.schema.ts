import { messages } from "@/api/resources/orders/messages";
import { z } from "zod";

export const orderItemSchema = z.object({
  quantity: z.coerce
    .number({ error: messages.quantity.invalid })
    .int(messages.quantity.invalid)
    .min(1, { error: messages.quantity.required }),
  unitPrice: z.coerce
    .number({ error: messages.unitPrice.invalid })
    .nonnegative(messages.unitPrice.invalid),
  subtotal: z.coerce.number({ error: messages.subtotal.invalid }).nullable(),
  orderId: z.string({ error: messages.orderId.invalid }).min(1, { error: messages.orderId.required }),
  variantId: z.string({ error: messages.variantId.invalid }).min(1, { error: messages.variantId.required }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, { error: messages.createdAt.required }),
  id: z.string({ error: messages.id.invalid }).min(1, { error: messages.id.required }),
  productName: z.string({ error: messages.productName.invalid }).min(1, { error: messages.productName.required }),
  sku: z.string({ error: messages.sku.invalid }).min(1, { error: messages.sku.required }),
  orderSellerId: z.string({ error: messages.orderSellerId.invalid }).min(1, { error: messages.orderSellerId.required }),
});

export type OrderItem = z.infer<typeof orderItemSchema>;
