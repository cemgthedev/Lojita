import { ticketSchema } from "@/api/resources/tickets/validations/ticket.schema";
import { z } from "zod";

export const updateTicketSchema = ticketSchema
  .omit({ id: true, requesterId: true, createdAt: true })
  .partial()
  .extend({
    id: z.string().min(1),
  });

export type UpdateTicket = z.infer<typeof updateTicketSchema>;
