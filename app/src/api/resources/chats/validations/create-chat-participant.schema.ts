import { chatParticipantSchema } from "@/api/resources/chats/validations/chat-participant.schema";
import { z } from "zod";

export const createChatParticipantSchema = chatParticipantSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    userId: chatParticipantSchema.shape.userId.optional(),
  });

export type CreateChatParticipant = z.infer<typeof createChatParticipantSchema>;
