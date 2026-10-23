import { messages } from "@/api/resources/chats/messages";
import { z } from "zod";

export const chatSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  type: z.string({ error: messages.type.invalid }).min(1, {
    error: messages.type.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
  closedAt: z.string({ error: messages.closedAt.invalid }).nullable(),
});

export type Chat = z.infer<typeof chatSchema>;
