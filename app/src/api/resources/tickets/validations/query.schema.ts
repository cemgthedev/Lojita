import { z } from "zod";
import { ticketOriginSchema } from "@/api/resources/tickets/validations/origin.schema";
import { ticketPrioritySchema } from "@/api/resources/tickets/validations/priority.schema";

export const ticketQuerySchema = z.object({
  id: z.string().optional(),
  origin: ticketOriginSchema.optional(),
  motive: z.string().optional(),
  priority: ticketPrioritySchema.optional(),
  chatId: z.string().nullable().optional(),
  requesterId: z.string().optional(),
  status: z.string().optional(),
});

export type TicketQuery = z.infer<typeof ticketQuerySchema>;
