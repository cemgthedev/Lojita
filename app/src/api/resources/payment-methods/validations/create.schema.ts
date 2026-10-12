import { paymentMethodSchema } from "@/api/resources/payment-methods/validations/payment-method.schema";
import { z } from "zod";

export const createPaymentMethodSchema = paymentMethodSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreatePaymentMethod = z.infer<typeof createPaymentMethodSchema>;
