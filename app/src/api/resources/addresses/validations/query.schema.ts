import { typeAddressSchema } from "@/api/resources/addresses/validations/type.schema";
import { z } from "zod";

export const addressQuerySchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  name: z.string().optional(),
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  type: typeAddressSchema.optional(),
});

export type AddressQuery = z.infer<typeof addressQuerySchema>;
