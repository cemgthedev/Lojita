import { messages } from "@/api/resources/users/messages";
import { roleSchema } from "@/api/resources/users/validations/auth.schema";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  name: z.string({ error: messages.name.invalid }).min(1, {
    error: messages.name.required,
  }),
  email: z.string({ error: messages.email.invalid }).min(1, {
    error: messages.email.required,
  }),
  avatarUrl: z.string({ error: messages.avatarUrl.invalid }),
  document: z.string({ error: messages.document.invalid }).min(1, {
    error: messages.document.required,
  }),
  phone: z.string({ error: messages.phone.invalid }),
  role: z.array(roleSchema).min(1, { error: messages.role.required }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).min(1, {
    error: messages.updatedAt.required,
  }),
});

export type User = z.infer<typeof userSchema>;
