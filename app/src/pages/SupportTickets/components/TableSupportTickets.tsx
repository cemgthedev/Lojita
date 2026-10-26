import { useUpdateTicketMutation } from "@/api/resources/tickets/mutations";
import { useTicketsQuery } from "@/api/resources/tickets/queries";
import { TICKET_MOTIVE_LABEL } from "@/api/resources/tickets/validations/motive.schema";
import {
  TICKET_ORIGIN,
  ticketOriginSchema,
  type TicketOrigin,
} from "@/api/resources/tickets/validations/origin.schema";
import {
  TICKET_PRIORITY,
  TICKET_PRIORITY_LABEL,
  TICKET_PRIORITY_VARIANT,
  ticketPrioritySchema,
} from "@/api/resources/tickets/validations/priority.schema";
import type { TicketQuery } from "@/api/resources/tickets/validations/query.schema";
import {
  TICKET_STATUS,
  TICKET_STATUS_LABEL,
  TICKET_STATUS_VARIANT,
  ticketStatusSchema,
} from "@/api/resources/tickets/validations/status.schema";
import type { Ticket } from "@/api/resources/tickets/validations/ticket.schema";
import { useUsersQuery } from "@/api/resources/users/queries";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Image,
  ImageContent,
  ImageFallback,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { SupportTicketHeaderFilters } from "@/pages/SupportTickets/components/SupportTicketHeaderFilters";
import { EllipsisIcon, MessageCircleIcon, PencilIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const emptyTickets: Ticket[] = [];
const statusOptions = Object.values(TICKET_STATUS);
const priorityOptions = Object.values(TICKET_PRIORITY);
const originOptions = Object.values(TICKET_ORIGIN);

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function formatDate(date: string) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "Data indisponível"
    : dateFormatter.format(parsedDate);
}

export function TableSupportTickets() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<TicketQuery>({});
  const ticketsQuery = useTicketsQuery(filters);
  const allTicketsQuery = useTicketsQuery();
  const usersQuery = useUsersQuery();
  const updateTicketMutation = useUpdateTicketMutation();
  const tickets = ticketsQuery.data ?? emptyTickets;
  const allTickets = allTicketsQuery.data ?? emptyTickets;

  const userById = useMemo(
    () => new Map((usersQuery.data ?? []).map((user) => [user.id, user])),
    [usersQuery.data],
  );
  const statuses = useMemo(
    () =>
      [
        ...new Set([
          ...statusOptions,
          ...allTickets.map((ticket) => ticket.status),
        ]),
      ]
        .filter((status) => status.length > 0)
        .toSorted(),
    [allTickets],
  );
  const priorities = useMemo(
    () => [
      ...new Set([
        ...priorityOptions,
        ...allTickets.map((ticket) => ticket.priority),
      ]),
    ],
    [allTickets],
  );
  const origins = useMemo(
    () =>
      [
        ...new Set([
          ...originOptions,
          ...allTickets.map((ticket) => ticket.origin),
        ]),
      ]
        .filter(
          (origin): origin is TicketOrigin =>
            ticketOriginSchema.safeParse(origin).success,
        )
        .toSorted(),
    [allTickets],
  );
  const filteredTickets = useMemo(
    () =>
      tickets.toSorted(
        (ticketA, ticketB) =>
          Date.parse(ticketB.createdAt) - Date.parse(ticketA.createdAt),
      ),
    [tickets],
  );
  const dashboardPath = location.pathname.match(/^\/[^/]+/)?.[0] ?? "";
  const ticketListPath = `${dashboardPath}${
    dashboardPath === urls.customer_dashboard ? urls.tickets : urls.attendances
  }`;

  async function updateStatus(
    ticketId: string,
    status: (typeof TICKET_STATUS)[keyof typeof TICKET_STATUS],
  ) {
    try {
      await updateTicketMutation.mutateAsync({ id: ticketId, status });
      toast("Chamado atualizado.", { variant: "success" });
    } catch {
      toast("Não foi possível atualizar o chamado.", {
        variant: "danger",
      });
    }
  }

  async function updatePriority(
    ticketId: string,
    priority: (typeof TICKET_PRIORITY)[keyof typeof TICKET_PRIORITY],
  ) {
    try {
      await updateTicketMutation.mutateAsync({ id: ticketId, priority });
      toast("Chamado atualizado.", { variant: "success" });
    } catch {
      toast("Não foi possível atualizar o chamado.", {
        variant: "danger",
      });
    }
  }

  return (
    <section
      aria-labelledby="support-tickets-list-heading"
      className="space-y-4"
    >
      <SupportTicketHeaderFilters
        filters={filters}
        setFilters={setFilters}
        statuses={statuses}
        priorities={priorities}
        origins={origins}
        resultCount={filteredTickets.length}
      />
      <Label id="support-tickets-list-heading" className="sr-only">
        Lista de chamados
      </Label>
      <Separator orientation="horizontal" variant="secondary" />
      {(ticketsQuery.isPending || allTicketsQuery.isPending) && (
        <Text role="status">Carregando chamados...</Text>
      )}
      {(ticketsQuery.isError ||
        allTicketsQuery.isError ||
        usersQuery.isError) && (
        <Text role="alert" className="animate-pulse-once">
          Não foi possível carregar todos os dados. Exibindo os dados
          disponíveis.
        </Text>
      )}
      <div className="overflow-x-auto rounded-lg border border-secondary-600 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Label size="xs">Solicitante</Label>
              </TableHead>
              <TableHead>
                <Label size="xs">Assunto</Label>
              </TableHead>
              <TableHead>
                <Label size="xs">Data</Label>
              </TableHead>
              <TableHead>
                <Label size="xs">Prioridade</Label>
              </TableHead>
              <TableHead>
                <Label size="xs">Status</Label>
              </TableHead>
              <TableHead className="text-right">
                <Label size="xs">Ações</Label>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <Text>Nenhum chamado encontrado.</Text>
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map((ticket) => {
                const requester = userById.get(ticket.requesterId);
                const chatId = ticket.chatId;
                return (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div className="flex min-w-56 items-center gap-3">
                        <Image
                          size="sm"
                          rounded="full"
                          aria-label={`Imagem de ${requester?.name}`}
                        >
                          <ImageContent
                            src={requester?.avatarUrl ?? undefined}
                            alt={requester?.name}
                          />
                          <ImageFallback variant="muted">
                            <Text size="xs">Sem imagem</Text>
                          </ImageFallback>
                        </Image>
                        <div className="min-w-0">
                          <Text>{requester?.name ?? "Nome não definido"}</Text>
                          <Text size="sm" variant="secondary">
                            {requester?.email ?? "Categoria não encontrada"}
                          </Text>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-52 space-y-1">
                        <Text size="sm" variant={"secondary"}>
                          {TICKET_MOTIVE_LABEL[ticket.motive] ?? ticket.motive}
                        </Text>
                        <Label size="xs">{ticket.subject}</Label>
                        <Text className="line-clamp-2">
                          {ticket.description || "Sem descrição"}
                        </Text>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Text className="whitespace-nowrap">
                        {formatDate(ticket.createdAt)}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={ticket.priority}
                        onValueChange={(value) => {
                          const priority =
                            ticketPrioritySchema.safeParse(value);
                          if (
                            priority.success &&
                            priority.data !== ticket.priority
                          ) {
                            void updatePriority(ticket.id, priority.data);
                          }
                        }}
                        disabled={updateTicketMutation.isPending}
                      >
                        <SelectTrigger
                          aria-label={`Alterar prioridade do chamado ${ticket.motive}`}
                          size="sm"
                          rounded="full"
                        >
                          <SelectValue>
                            <Badge
                              size="xs"
                              rounded="full"
                              variant={TICKET_PRIORITY_VARIANT[ticket.priority]}
                            >
                              {TICKET_PRIORITY_LABEL[ticket.priority]}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            ...new Set([...priorityOptions, ticket.priority]),
                          ].map((priority) => (
                            <SelectItem key={priority} value={priority}>
                              {TICKET_PRIORITY_LABEL[priority]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={ticket.status}
                        onValueChange={(value) => {
                          const status = ticketStatusSchema.safeParse(value);
                          if (status.success && status.data !== ticket.status) {
                            void updateStatus(ticket.id, status.data);
                          }
                        }}
                        disabled={updateTicketMutation.isPending}
                      >
                        <SelectTrigger
                          aria-label={`Alterar status do chamado ${ticket.motive}`}
                          size="sm"
                          rounded="full"
                        >
                          <SelectValue>
                            <Badge
                              size="xs"
                              rounded="full"
                              variant={TICKET_STATUS_VARIANT[ticket.status]}
                            >
                              {TICKET_STATUS_LABEL[ticket.status]}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {TICKET_STATUS_LABEL[
                                status as keyof typeof TICKET_STATUS_LABEL
                              ] ?? status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="secondary-ghost"
                              size="sm"
                              aria-label={`Ações para o chamado ${ticket.subject}`}
                            >
                              <EllipsisIcon aria-hidden="true" size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() =>
                                navigate(
                                  `${ticketListPath}/${encodeURIComponent(ticket.id)}${urls.update}`,
                                )
                              }
                            >
                              <PencilIcon aria-hidden="true" />
                              Editar chamado
                            </DropdownMenuItem>
                            {chatId && (
                              <DropdownMenuItem
                                onSelect={() =>
                                  navigate(
                                    `${dashboardPath}${urls.chats}/${encodeURIComponent(chatId)}`,
                                  )
                                }
                              >
                                <MessageCircleIcon aria-hidden="true" />
                                Abrir chat
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
