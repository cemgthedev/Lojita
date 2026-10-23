import { chatParticipantSchema } from "@/api/resources/chats/validations/chat-participant.schema";
import { z } from "zod";

export const updateChatParticipantSchema = chatParticipantSchema
  .omit({ id: true, createdAt: true })
  .partial()
  .extend({
    id: z.string().min(1),
  });

export type UpdateChatParticipant = z.infer<
  typeof updateChatParticipantSchema
>;
