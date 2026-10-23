import { chatSchema } from "@/api/resources/chats/validations/chat.schema";
import { z } from "zod";

export const updateChatSchema = chatSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .extend({
    id: z.string().min(1),
  });

export type UpdateChat = z.infer<typeof updateChatSchema>;
