import { messages } from "@/api/resources/products/attributes/messages";
import { z } from "zod";

export const attributeSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  name: z.string({ error: messages.name.invalid }).min(1, {
    error: messages.name.required,
  }),
  type: z.string({ error: messages.type.invalid }).min(1, {
    error: messages.type.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
});

export type Attribute = z.infer<typeof attributeSchema>;
