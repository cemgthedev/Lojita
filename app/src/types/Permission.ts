import { z } from "zod";

export const PERMISSION = {
  PRODUCTS_READ: "products:read",
  PRODUCTS_CREATE: "products:create",
  PRODUCTS_UPDATE: "products:update",
} as const;

const message = {
  required: "Permissão é obrigatória.",
  invalid: "Permissão inválida.",
} as const;

export const permissionSchema = z.enum(
  [
    PERMISSION.PRODUCTS_READ,
    PERMISSION.PRODUCTS_CREATE,
    PERMISSION.PRODUCTS_UPDATE,
  ],
  {
    error: (issue) =>
      issue.input === undefined ? message.required : message.invalid,
  },
);

export type Permission = z.infer<typeof permissionSchema>;
