import { messages } from "@/api/resources/tickets/messages";
import { z } from "zod";

export const TICKET_MOTIVE = {
  ORDER: "order",
  PAYMENT: "payment",
  DELIVERY: "delivery",
  PRODUCT: "product",
  ACCOUNT: "account",
  OTHER: "other",
} as const;

export const TICKET_MOTIVE_LABEL = {
  [TICKET_MOTIVE.ORDER]: "Pedido",
  [TICKET_MOTIVE.PAYMENT]: "Pagamento",
  [TICKET_MOTIVE.DELIVERY]: "Entrega",
  [TICKET_MOTIVE.PRODUCT]: "Produto",
  [TICKET_MOTIVE.ACCOUNT]: "Conta",
  [TICKET_MOTIVE.OTHER]: "Outro",
} as const;

export const ticketMotiveSchema = z.enum(TICKET_MOTIVE, {
  error: (issue) =>
    issue.input === undefined
      ? messages.motive.required
      : messages.motive.invalid,
});

export type TicketMotive = z.infer<typeof ticketMotiveSchema>;
