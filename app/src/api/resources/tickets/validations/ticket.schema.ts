import { messages } from "@/api/resources/tickets/messages";
import { z } from "zod";

export const ticketSchema = z.object({
  id: z.string({ error: messages.id.invalid }).min(1, {
    error: messages.id.required,
  }),
  origin: z.string({ error: messages.origin.invalid }).min(1, {
    error: messages.origin.required,
  }),
  motive: z.string({ error: messages.motive.invalid }).min(1, {
    error: messages.motive.required,
  }),
  description: z.string({ error: messages.description.invalid }).nullable(),
  priority: z.string({ error: messages.priority.invalid }).min(1, {
    error: messages.priority.required,
  }),
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
