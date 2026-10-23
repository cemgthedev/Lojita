import { mockTickets } from "@/api/resources/tickets/tickets.mock";
import { ticketsKeys } from "@/api/resources/tickets/keys";
import { ticketsService } from "@/api/resources/tickets/services";
import type { TicketQuery } from "@/api/resources/tickets/validations/query.schema";
import {
  filterMockData,
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
  return withMockArrayFallback(result, filterMockData(mockTickets, query));
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
