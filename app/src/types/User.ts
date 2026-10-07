import { roleSchema } from "@/types/Auth";
import { z } from "zod";

const message = {
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
  avatarUrl: {
    required: "URL do avatar é obrigatória.",
    invalid: "URL do avatar inválida.",
  },
  document: {
    required: "Documento é obrigatório.",
    invalid: "Documento inválido.",
  },
  phone: {
    required: "Telefone é obrigatório.",
    invalid: "Telefone inválido.",
  },
  role: {
    required: "Perfil é obrigatório.",
    invalid: "Perfil inválido.",
  },
  createdAt: {
    required: "Data de criação é obrigatória.",
    invalid: "Data de criação inválida.",
  },
  updatedAt: {
    required: "Data de atualização é obrigatória.",
    invalid: "Data de atualização inválida.",
  },
} as const;

export const userSchema = z.object({
  id: z.string({ error: message.id.invalid }).min(1, {
    error: message.id.required,
  }),
  name: z.string({ error: message.name.invalid }).min(1, {
    error: message.name.required,
  }),
  email: z
    .string({ error: message.email.invalid })
    .min(1, { error: message.email.required }),
  avatarUrl: z.string({ error: message.avatarUrl.invalid }),
  document: z.string({ error: message.document.invalid }).min(1, {
    error: message.document.required,
  }),
  phone: z.string({
    error: message.phone.invalid,
  }),
  role: z.array(roleSchema).min(1, { error: message.role.required }),
  createdAt: z
    .string({ error: message.createdAt.invalid })
    .min(1, { error: message.createdAt.required }),
  updatedAt: z
    .string({ error: message.updatedAt.invalid })
    .min(1, { error: message.updatedAt.required }),
});

export type User = z.infer<typeof userSchema>;
