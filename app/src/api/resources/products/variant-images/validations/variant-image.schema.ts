import { messages } from "@/api/resources/products/variant-images/messages";
import { z } from "zod";

export const variantImageSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  url: z.string({ error: messages.url.invalid }).min(1, {
    error: messages.url.required,
  }),
  sortOrder: z.coerce
    .number({ error: messages.sortOrder.invalid })
    .int(messages.sortOrder.invalid),
  variantId: z.string({ error: messages.variantId.invalid }).min(1, {
    error: messages.variantId.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
});

export type VariantImage = z.infer<typeof variantImageSchema>;
