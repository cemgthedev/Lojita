import { messages } from "@/api/resources/products/attributes/messages";
import { z } from "zod";

export const ATTRIBUTE_TYPE = {
  HEX: "hex",
  NUMERIC: "numeric",
  NUMERIC_RANGE: "numeric range",
  WORD: "word",
} as const;

export const ATTRIBUTE_LABEL = {
  [ATTRIBUTE_TYPE.HEX]: "Hexadecimal",
  [ATTRIBUTE_TYPE.NUMERIC]: "Numérico",
  [ATTRIBUTE_TYPE.NUMERIC_RANGE]: "Intervalo Numérico",
  [ATTRIBUTE_TYPE.WORD]: "Palavra",
} as const;

export const attributeTypeSchema = z.enum(ATTRIBUTE_TYPE, {
  error: (issue) =>
    issue.input === undefined ? messages.type.required : messages.type.invalid,
});

export const attributeSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  name: z.string({ error: messages.name.invalid }).min(1, {
    error: messages.name.required,
  }),
  type: attributeTypeSchema,
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
});

export type Attribute = z.infer<typeof attributeSchema>;
export type AttributeType = z.infer<typeof attributeTypeSchema>;
