import { messages } from "@/api/resources/categories/messages";
import { z } from "zod";

export const categorySchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  title: z.string({ error: messages.title.invalid }).min(1, {
    error: messages.title.required,
  }),
  description: z.string({ error: messages.description.invalid }).nullable(),
  imageUrl: z.string({ error: messages.imageUrl.invalid }).nullable(),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
});

export type Category = z.infer<typeof categorySchema>;
