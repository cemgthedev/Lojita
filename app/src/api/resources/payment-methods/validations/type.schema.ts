import { messages } from "@/api/resources/payment-methods/messages";
import { z } from "zod";

export const PAYMENT_METHOD_TYPE = {
  DEFAULT: "default",
  OTHER: "other",
} as const;

export const PAYMENT_METHOD_TYPE_LABEL = {
  [PAYMENT_METHOD_TYPE.DEFAULT]: "Padrão",
  [PAYMENT_METHOD_TYPE.OTHER]: "Outro",
} as const;

export const paymentMethodTypeSchema = z.enum(PAYMENT_METHOD_TYPE, {
  error: (issue) =>
    issue.input === undefined ? messages.type.required : messages.type.invalid,
});

export type PaymentMethodType = z.infer<typeof paymentMethodTypeSchema>;
