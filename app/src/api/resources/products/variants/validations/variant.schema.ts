import { messages } from "@/api/resources/products/variants/messages";
import { z } from "zod";

export const variantSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  price: z.coerce.number({ error: messages.price.invalid }),
  stock: z.coerce
    .number({ error: messages.stock.invalid })
    .int(messages.stock.invalid),
  status: z.string({ error: messages.status.invalid }).min(1, {
    error: messages.status.required,
  }),
  sku: z.string({ error: messages.sku.invalid }).min(1, {
    error: messages.sku.required,
  }),
  productId: z.string({ error: messages.productId.invalid }).min(1, {
    error: messages.productId.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
});

export type Variant = z.infer<typeof variantSchema>;
