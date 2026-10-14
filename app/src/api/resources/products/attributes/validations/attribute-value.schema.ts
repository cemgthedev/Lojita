import { attributeValueMessages } from "@/api/resources/products/attributes/attribute-values.messages";
import { z } from "zod";

export const attributeValueSchema = z.object({
  id: z.string({ error: attributeValueMessages.id.invalid }).min(1, {
    error: attributeValueMessages.id.required,
  }),
  title: z.string({ error: attributeValueMessages.title.invalid }).min(1, {
    error: attributeValueMessages.title.required,
  }),
  value: z.string({ error: attributeValueMessages.value.invalid }).min(1, {
    error: attributeValueMessages.value.required,
  }),
  attributeId: z
    .string({ error: attributeValueMessages.attributeId.invalid })
    .min(1, {
      error: attributeValueMessages.attributeId.required,
    }),
  createdAt: z
    .string({ error: attributeValueMessages.createdAt.invalid })
    .min(1, {
      error: attributeValueMessages.createdAt.required,
    }),
  updatedAt: z
    .string({ error: attributeValueMessages.updatedAt.invalid })
    .nullable(),
});

export type AttributeValue = z.infer<typeof attributeValueSchema>;
