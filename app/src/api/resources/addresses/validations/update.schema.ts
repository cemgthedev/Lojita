import { addressSchema } from "@/api/resources/addresses/validations/address.schema";
import { z } from "zod";

export const updateAddressSchema = addressSchema.partial().omit({
  updatedAt: true,
});

export type UpdateAddress = z.infer<typeof updateAddressSchema>;
