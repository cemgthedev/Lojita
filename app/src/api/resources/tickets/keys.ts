import type { TicketQuery } from "@/api/resources/tickets/validations/query.schema";

export const ticketsKeys = {
  all: ["tickets"] as const,
  lists: () => [...ticketsKeys.all, "list"] as const,
  list: (query?: TicketQuery) => [...ticketsKeys.lists(), query] as const,
  details: () => [...ticketsKeys.all, "detail"] as const,
  detail: (id: string) => [...ticketsKeys.details(), id] as const,
};
