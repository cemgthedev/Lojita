import { messages } from "@/api/resources/products/products/messages";
import { z } from "zod";

export const productSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  title: z.string({ error: messages.title.invalid }).min(1, {
    error: messages.title.required,
  }),
  description: z.string({ error: messages.description.invalid }).nullable(),
  categoryId: z.string({ error: messages.categoryId.invalid }).min(1, {
    error: messages.categoryId.required,
  }),
  storeId: z.string({ error: messages.storeId.invalid }).min(1, {
    error: messages.storeId.required,
  }),
  defaultVariantId: z
    .string({ error: messages.defaultVariantId.invalid })
    .min(1, {
      error: messages.defaultVariantId.required,
    }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z
    .string({ error: messages.updatedAt.invalid })
    .nullable(),
});

export type Product = z.infer<typeof productSchema>;
