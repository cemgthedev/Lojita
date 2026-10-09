import { messages } from "@/api/resources/users/messages";
import { z } from "zod";

export const ROLE = {
  ADMIN: "admin",
  SUPPORT: "support",
  SELLER: "seller",
  CUSTOMER: "customer",
} as const;

export const ROLE_LABEL = {
  [ROLE.ADMIN]: "Administrador",
  [ROLE.SUPPORT]: "Suporte",
  [ROLE.SELLER]: "Vendedor",
  [ROLE.CUSTOMER]: "Cliente",
} as const;

export const roleSchema = z.enum(ROLE, {
  error: (issue) =>
    issue.input === undefined ? messages.role.required : messages.role.invalid,
});

export type Role = z.infer<typeof roleSchema>;

export const authUserSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  name: z.string({ error: messages.name.invalid }).min(1, {
    error: messages.name.required,
  }),
  document: z.string({ error: messages.document.invalid }).min(1, {
    error: messages.document.required,
  }),
  phone: z.string({ error: messages.phone.invalid }),
  email: z.string({ error: messages.email.invalid }).min(1, {
    error: messages.email.required,
  }),
  role: z.array(roleSchema).min(1, { error: messages.role.required }),
  avatarUrl: z.string().optional(),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export const loginCredentialsSchema = z.object({
  email: z.string({ error: messages.email.invalid }).min(1, {
    error: messages.email.required,
  }),
  password: z.string({ error: messages.password.invalid }).min(1, {
    error: messages.password.required,
  }),
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;

export const loginResponseSchema = z.object({
  user: authUserSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
