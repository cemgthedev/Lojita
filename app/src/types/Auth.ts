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

const message = {
  role: {
    required: "Perfil é obrigatório.",
    invalid: "Perfil inválido.",
  },
  id: {
    required: "Identificador é obrigatório.",
    invalid: "Identificador inválido.",
  },
  name: {
    required: "Nome é obrigatório.",
    invalid: "Nome inválido.",
  },
  email: {
    required: "E-mail é obrigatório.",
    invalid: "E-mail inválido.",
  },
  password: {
    required: "Senha é obrigatória.",
    invalid: "Senha inválida.",
  },
} as const;

export const roleSchema = z.enum(ROLE, {
  error: (issue) =>
    issue.input === undefined ? message.role.required : message.role.invalid,
});

export type Role = z.infer<typeof roleSchema>;

export const authUserSchema = z.object({
  id: z.string({ error: message.id.invalid }).min(1, {
    error: message.id.required,
  }),
  name: z.string({ error: message.name.invalid }).min(1, {
    error: message.name.required,
  }),
  email: z
    .string({ error: message.email.invalid })
    .min(1, { error: message.email.required }),
  role: z.array(roleSchema).min(1, { error: message.role.required }),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export const loginCredentialsSchema = z.object({
  email: z
    .string({ error: message.email.invalid })
    .min(1, { error: message.email.required }),
  password: z.string({ error: message.password.invalid }).min(1, {
    error: message.password.required,
  }),
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;

export const loginResponseSchema = z.object({
  user: authUserSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
