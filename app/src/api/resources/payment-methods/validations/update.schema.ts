import { paymentMethodSchema } from "@/api/resources/payment-methods/validations/payment-method.schema";
import { z } from "zod";

export const updatePaymentMethodSchema = paymentMethodSchema.partial().omit({
  updatedAt: true,
});

export type UpdatePaymentMethod = z.infer<typeof updatePaymentMethodSchema>;
