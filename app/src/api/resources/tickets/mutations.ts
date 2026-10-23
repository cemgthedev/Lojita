import { ticketsKeys } from "@/api/resources/tickets/keys";
import { ticketsService } from "@/api/resources/tickets/services";
import type { CreateTicket } from "@/api/resources/tickets/validations/create.schema";
import type { UpdateTicket } from "@/api/resources/tickets/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTicketMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ticket: CreateTicket) => ticketsService.create(ticket),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ticketsKeys.lists() }),
  });
}

export function useUpdateTicketMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ticket: UpdateTicket) => ticketsService.update(ticket),
    onSuccess: (ticket) => {
      queryClient.setQueryData(ticketsKeys.detail(ticket.id), ticket);
      return queryClient.invalidateQueries({ queryKey: ticketsKeys.lists() });
    },
  });
}

export function useDeleteTicketMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ticketsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: ticketsKeys.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({ queryKey: ticketsKeys.lists() });
    },
  });
}
