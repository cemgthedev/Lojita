import {
  roleSchema,
} from "@/api/resources/users/validations/auth.schema";
import { messages } from "@/api/resources/users/messages";
import { z } from "zod";

const positiveIntegerQueryValue = (error: string) =>
  z
    .union([z.string(), z.number()])
    .optional()
    .transform((value) => (value === undefined ? undefined : Number(value)))
    .pipe(
      z
        .number({ error })
        .int(error)
        .positive(error)
        .optional(),
    );

export const userQuerySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  document: z.string().optional(),
  phone: z.string().optional(),
  role: roleSchema.optional(),
  page: positiveIntegerQueryValue(messages.page.invalid),
  limit: positiveIntegerQueryValue(messages.limit.invalid),
});

export type UserQuery = z.infer<typeof userQuerySchema>;