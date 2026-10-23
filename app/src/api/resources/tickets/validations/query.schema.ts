import { z } from "zod";

export const ticketQuerySchema = z.object({
  id: z.string().optional(),
  origin: z.string().optional(),
  motive: z.string().optional(),
  priority: z.string().optional(),
  chatId: z.string().nullable().optional(),
  requesterId: z.string().optional(),
  status: z.string().optional(),
});

export type TicketQuery = z.infer<typeof ticketQuerySchema>;
