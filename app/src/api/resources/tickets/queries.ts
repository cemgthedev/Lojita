import { mockTickets } from "@/api/resources/tickets/tickets.mock";
import { ticketsKeys } from "@/api/resources/tickets/keys";
import { ticketsService } from "@/api/resources/tickets/services";
import type { TicketQuery } from "@/api/resources/tickets/validations/query.schema";
import {
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function useTicketsQuery(query?: TicketQuery, enabled = true) {
  const result = useQuery({
    queryKey: ticketsKeys.list(query),
    queryFn: () => ticketsService.list(query),
    enabled,
  });
  const mockData = mockTickets.filter((ticket) =>
    Object.entries(query ?? {}).every(([key, value]) => {
      if (value === undefined) return true;
      const ticketValue = ticket[key as keyof typeof ticket];
      if (key === "motive" && typeof value === "string") {
        return String(ticketValue)
          .toLocaleLowerCase("pt-BR")
          .includes(value.trim().toLocaleLowerCase("pt-BR"));
      }
      return ticketValue === value;
    }),
  );
  return withMockArrayFallback(result, mockData);
}

export function useTicketQuery(id: string) {
  const result = useQuery({
    queryKey: ticketsKeys.detail(id),
    queryFn: () => ticketsService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockTickets.find((ticket) => ticket.id === id),
  );
}
