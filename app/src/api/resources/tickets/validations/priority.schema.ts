import { messages } from "@/api/resources/tickets/messages";
import { z } from "zod";

export const TICKET_PRIORITY = {
  LOW: "low",
  NORMAL: "normal",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;

export const TICKET_PRIORITY_LABEL = {
  [TICKET_PRIORITY.LOW]: "Baixa",
  [TICKET_PRIORITY.NORMAL]: "Normal",
  [TICKET_PRIORITY.MEDIUM]: "Média",
  [TICKET_PRIORITY.HIGH]: "Alta",
  [TICKET_PRIORITY.URGENT]: "Urgente",
} as const;

export const TICKET_PRIORITY_VARIANT = {
  [TICKET_PRIORITY.LOW]: "muted",
  [TICKET_PRIORITY.NORMAL]: "success-ghost",
  [TICKET_PRIORITY.MEDIUM]: "warning-ghost",
  [TICKET_PRIORITY.HIGH]: "danger-ghost",
  [TICKET_PRIORITY.URGENT]: "danger-ghost",
} as const;

export const ticketPrioritySchema = z.enum(TICKET_PRIORITY, {
  error: (issue) =>
    issue.input === undefined
      ? messages.priority.required
      : messages.priority.invalid,
});

export type TicketPriority = z.infer<typeof ticketPrioritySchema>;
