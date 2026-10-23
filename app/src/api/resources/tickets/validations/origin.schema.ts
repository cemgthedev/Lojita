import { messages } from "@/api/resources/tickets/messages";
import { z } from "zod";

export const TICKET_ORIGIN = {
  CHAT: "chat",
  CUSTOMER_PORTAL: "customer_portal",
} as const;

export const TICKET_ORIGIN_LABEL = {
  [TICKET_ORIGIN.CHAT]: "Chat",
  [TICKET_ORIGIN.CUSTOMER_PORTAL]: "Portal do cliente",
} as const;

export const ticketOriginSchema = z.enum(TICKET_ORIGIN, {
  error: (issue) =>
    issue.input === undefined
      ? messages.origin.required
      : messages.origin.invalid,
});

export type TicketOrigin = z.infer<typeof ticketOriginSchema>;
