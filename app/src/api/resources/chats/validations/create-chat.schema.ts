import { chatSchema } from "@/api/resources/chats/validations/chat.schema";
import { z } from "zod";

export const createChatSchema = chatSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  closedAt: true,
});

export type CreateChat = z.infer<typeof createChatSchema>;
