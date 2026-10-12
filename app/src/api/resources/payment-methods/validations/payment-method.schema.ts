import { messages } from "@/api/resources/payment-methods/messages";
import { paymentMethodTypeSchema } from "@/api/resources/payment-methods/validations/type.schema";
import { z } from "zod";

export const paymentMethodSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  userId: z.string({ error: messages.userId.invalid }).min(1, {
    error: messages.userId.required,
  }),
  token: z.string({ error: messages.token.invalid }).min(1, {
    error: messages.token.required,
  }),
  type: paymentMethodTypeSchema,
  brand: z.string({ error: messages.brand.invalid }),
  last4: z.string({ error: messages.last4.invalid }).regex(/^\d{4}$/, {
    error: messages.last4.invalid,
  }),
  holderName: z.string({ error: messages.holderName.invalid }).min(1, {
    error: messages.holderName.required,
  }),
  expirationMonth: z.coerce
    .number({ error: messages.expirationMonth.invalid })
    .int(messages.expirationMonth.invalid)
    .min(1, messages.expirationMonth.invalid)
    .max(12, messages.expirationMonth.invalid),
  expirationYear: z.coerce
    .number({ error: messages.expirationYear.invalid })
    .int(messages.expirationYear.invalid)
    .min(2000, messages.expirationYear.invalid),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).min(1, {
    error: messages.updatedAt.required,
  }),
});

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
