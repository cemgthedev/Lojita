import { messages } from "@/api/resources/users/messages";
import { createUserSchema } from "@/api/resources/users/validations/create.schema";
import { z } from "zod";

export const updateUserSchema = createUserSchema.partial().extend({
  id: z.string({ error: messages.id.invalid }).optional(),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
