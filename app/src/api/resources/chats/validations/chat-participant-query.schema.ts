import { z } from "zod";

export const chatParticipantQuerySchema = z.object({
  id: z.string().optional(),
  chatId: z.string().optional(),
  userId: z.string().optional(),
  role: z.string().optional(),
});

export type ChatParticipantQuery = z.infer<
  typeof chatParticipantQuerySchema
>;
