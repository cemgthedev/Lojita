import { ticketSchema } from "@/api/resources/tickets/validations/ticket.schema";
import { z } from "zod";

export const createTicketSchema = ticketSchema
  .omit({
    id: true,
    requesterId: true,
    createdAt: true,
    updatedAt: true,
    closedAt: true,
  })
  .extend({
    chatId: ticketSchema.shape.chatId.optional(),
  });

export type CreateTicket = z.infer<typeof createTicketSchema>;
