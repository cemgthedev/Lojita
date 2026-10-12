import { messages } from "@/api/resources/addresses/messages";
import { z } from "zod";

export const TYPE = {
  DEFAULT: "default",
  STORE: "store",
  OTHER: "other",
} as const;

export const TYPE_LABEL = {
  [TYPE.DEFAULT]: "Padrão",
  [TYPE.STORE]: "Loja",
  [TYPE.OTHER]: "Outro",
} as const;

export const typeAddressSchema = z.enum(TYPE, {
  error: (issue) =>
    issue.input === undefined ? messages.type.required : messages.type.invalid,
});

export type Type = z.infer<typeof typeAddressSchema>;
