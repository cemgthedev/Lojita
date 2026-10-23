import type { Ticket } from "@/api/resources/tickets/validations/ticket.schema";

const createdAt = "2026-01-01T00:00:00.000Z";

export const mockTickets: Ticket[] = [
  {
    id: "mock-ticket-1",
    origin: "chat",
    motive: "order",
    description: "Dúvida sobre o andamento do pedido.",
    priority: "normal",
    chatId: "mock-chat-1",
    requesterId: "mock-customer-1",
    createdAt,
    updatedAt: null,
    status: "open",
    closedAt: null,
  },
];
