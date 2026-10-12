import { createAddressSchema } from "@/api/resources/addresses/validations/create.schema";
import { messages } from "@/api/resources/users/messages";
import { z } from "zod";

export const updateAddressSchema = createAddressSchema.partial().extend({
  id: z.string({ error: messages.id.invalid }).optional(),
});

export type UpdateAddress = z.infer<typeof updateAddressSchema>;
