import { paymentMethodTypeSchema } from "@/api/resources/payment-methods/validations/type.schema";
import { z } from "zod";

export const paymentMethodQuerySchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  type: paymentMethodTypeSchema.optional(),
  brand: z.string().optional(),
  last4: z.string().optional(),
  holderName: z.string().optional(),
  expirationMonth: z.coerce.number().int().positive().optional(),
  expirationYear: z.coerce.number().int().positive().optional(),
});

export type PaymentMethodQuery = z.infer<typeof paymentMethodQuerySchema>;
