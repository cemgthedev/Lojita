import { messages } from "@/api/resources/tickets/messages";
import { ticketMotiveSchema } from "@/api/resources/tickets/validations/motive.schema";
import { ticketOriginSchema } from "@/api/resources/tickets/validations/origin.schema";
import { ticketPrioritySchema } from "@/api/resources/tickets/validations/priority.schema";
import { z } from "zod";

export const ticketSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  origin: ticketOriginSchema,
  motive: ticketMotiveSchema,
  subject: z
    .string({ error: messages.subject.invalid })
    .trim()
    .min(1, { error: messages.subject.required }),
  description: z.string({ error: messages.description.invalid }).nullable(),
  priority: ticketPrioritySchema,
  chatId: z.string({ error: messages.chatId.invalid }).nullable(),
  requesterId: z.string({ error: messages.requesterId.invalid }).min(1, {
    error: messages.requesterId.required,
  }),
  createdAt: z.string({ error: messages.createdAt.invalid }).min(1, {
    error: messages.createdAt.required,
  }),
  updatedAt: z.string({ error: messages.updatedAt.invalid }).nullable(),
  status: z.string({ error: messages.status.invalid }).min(1, {
    error: messages.status.required,
  }),
  closedAt: z.string({ error: messages.closedAt.invalid }).nullable(),
});

export type Ticket = z.infer<typeof ticketSchema>;
