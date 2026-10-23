import { messageSchema } from "@/api/resources/chats/validations/message.schema";
import { z } from "zod";

export const createMessageSchema = messageSchema.omit({
  id: true,
  senderId: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateMessage = z.infer<typeof createMessageSchema>;
