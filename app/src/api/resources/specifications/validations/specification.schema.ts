import { messages } from "@/api/resources/specifications/messages";
import { z } from "zod";

export const specificationSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  name: z.string({ error: messages.name.invalid }).min(1, {
    error: messages.name.required,
  }),
  value: z.string({ error: messages.value.invalid }).min(1, {
    error: messages.value.required,
  }),
  productId: z.string({ error: messages.productId.invalid }).min(1, {
    error: messages.productId.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
});

export type Specification = z.infer<typeof specificationSchema>;
