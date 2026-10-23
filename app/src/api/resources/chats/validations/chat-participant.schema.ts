import { messages } from "@/api/resources/chats/messages";
import { z } from "zod";

export const chatParticipantSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  chatId: z.string({ error: messages.chatId.invalid }).min(1, {
    error: messages.chatId.required,
  }),
  userId: z.string({ error: messages.userId.invalid }).min(1, {
    error: messages.userId.required,
  }),
  role: z.string({ error: messages.role.invalid }).min(1, {
    error: messages.role.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
});

export type ChatParticipant = z.infer<typeof chatParticipantSchema>;
