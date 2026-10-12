import { messages } from "@/api/resources/addresses/messages";
import { typeAddressSchema } from "@/api/resources/addresses/validations/type.schema";
import { z } from "zod";

export const addressSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  name: z.string({ error: messages.name.invalid }).min(1, {
    error: messages.name.required,
  }),
  cep: z.string({ error: messages.cep.invalid }).min(1, {
    error: messages.cep.required,
  }),
  street: z.string({ error: messages.street.invalid }),
  number: z.string({ error: messages.number.invalid }),
  city: z.string({ error: messages.city.invalid }).min(1, {
    error: messages.city.required,
  }),
  state: z.string({ error: messages.state.invalid }).min(1, {
    error: messages.state.required,
  }),
  complement: z.string({ error: messages.complement.invalid }),
  neighborhood: z.string({ error: messages.complement.invalid }),
  type: typeAddressSchema.optional(),
  userId: z.string({ error: messages.userId.invalid }).min(1, {
    error: messages.userId.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).min(1, {
    error: messages.updatedAt.required,
  }),
});

export type Address = z.infer<typeof addressSchema>;
