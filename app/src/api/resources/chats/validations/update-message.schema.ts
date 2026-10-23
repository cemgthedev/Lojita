import { messageSchema } from "@/api/resources/chats/validations/message.schema";
import { z } from "zod";

export const updateMessageSchema = messageSchema
  .pick({ chatId: true, content: true })
  .partial()
  .extend({
    id: z.string().min(1),
  });

export type UpdateMessage = z.infer<typeof updateMessageSchema>;
