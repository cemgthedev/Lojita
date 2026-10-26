import { messages } from "@/api/resources/orders/messages";
import { z } from "zod";

export const orderAddressSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, { error: messages.id.required }),
  recipientName: z.string({ error: messages.recipientName.invalid }).min(1, { error: messages.recipientName.required }),
  name: z.string({ error: messages.name.invalid }).min(1, { error: messages.name.required }),
  cep: z.string({ error: messages.cep.invalid }).min(1, { error: messages.cep.required }),
  city: z.string({ error: messages.city.invalid }).min(1, { error: messages.city.required }),
  state: z.string({ error: messages.state.invalid }).min(1, { error: messages.state.required }),
  street: z.string({ error: messages.street.invalid }).min(1, { error: messages.street.required }),
  number: z.string({ error: messages.number.invalid }).nullable(),
  neighborhood: z.string({ error: messages.neighborhood.invalid }).min(1, { error: messages.neighborhood.required }),
  orderId: z.string({ error: messages.orderId.invalid }).min(1, { error: messages.orderId.required }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, { error: messages.createdAt.required }),
});

export type OrderAddress = z.infer<typeof orderAddressSchema>;
