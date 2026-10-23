import { z } from "zod";

export const messageQuerySchema = z.object({
  id: z.string().optional(),
  chatId: z.string().optional(),
  senderId: z.string().optional(),
});

export type MessageQuery = z.infer<typeof messageQuerySchema>;
