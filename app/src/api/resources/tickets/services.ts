import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import { assertNoMockIds } from "@/api/resources/query-fallback";
import type { CreateTicket } from "@/api/resources/tickets/validations/create.schema";
import {
  ticketSchema,
  type Ticket,
} from "@/api/resources/tickets/validations/ticket.schema";
import {
  ticketQuerySchema,
  type TicketQuery,
} from "@/api/resources/tickets/validations/query.schema";
import type { UpdateTicket } from "@/api/resources/tickets/validations/update.schema";

function ticketEndpoint(id: string) {
  return `${endpoints.tickets}/${encodeURIComponent(id)}`;
}

function queryString(query?: TicketQuery) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(
    ticketQuerySchema.parse(query ?? {}),
  )) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export const ticketsService = {
  async list(query?: TicketQuery): Promise<Ticket[]> {
    const response = await http.get<unknown>(
      `${endpoints.tickets}${queryString(query)}`,
    );
    return ticketSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<Ticket> {
    const response = await http.get<unknown>(ticketEndpoint(id));
    return ticketSchema.parse(response.data);
  },

  async create(ticket: CreateTicket): Promise<Ticket> {
    assertNoMockIds("chamado", ticket.chatId ?? undefined);
    const response = await http.post<unknown>(endpoints.tickets, ticket);
    return ticketSchema.parse(response.data);
  },

  async update({ id, ...ticket }: UpdateTicket): Promise<Ticket> {
    assertNoMockIds("chamado", id, ticket.chatId ?? undefined);
    const response = await http.put<unknown>(ticketEndpoint(id), ticket);
    return ticketSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    assertNoMockIds("chamado", id);
    await http.delete<void>(ticketEndpoint(id));
  },
};
