import { messages } from "@/api/resources/chats/messages";
import { z } from "zod";

export const messageSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  chatId: z.string({ error: messages.chatId.invalid }).min(1, {
    error: messages.chatId.required,
  }),
  senderId: z.string({ error: messages.senderId.invalid }).min(1, {
    error: messages.senderId.required,
  }),
  content: z.string({ error: messages.content.invalid }).nullable(),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
});

export type Message = z.infer<typeof messageSchema>;
export type ChatMessage = Message;
