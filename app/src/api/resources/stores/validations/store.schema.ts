import { messages } from "@/api/resources/stores/messages";
import { z } from "zod";

export const storeSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  name: z.string({ error: messages.name.invalid }).min(1, {
    error: messages.name.required,
  }),
  description: z.string({ error: messages.description.invalid }),
  logoUrl: z.string({ error: messages.logoUrl.invalid }),
  businessEmail: z.string({ error: messages.businessEmail.invalid }),
  phone: z.string({ error: messages.phone.invalid }),
  url: z.string({ error: messages.url.invalid }),
  userId: z.string({ error: messages.userId.invalid }).min(1, {
    error: messages.userId.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).min(1, {
    error: messages.updatedAt.required,
  }),
});

export type Store = z.infer<typeof storeSchema>;
