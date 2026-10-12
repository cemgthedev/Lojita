import { addressSchema } from "@/api/resources/addresses/validations/address.schema";
import { z } from "zod";

export const createAddressSchema = addressSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateAddress = z.infer<typeof createAddressSchema>;
