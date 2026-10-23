import type { TicketQuery } from "@/api/resources/tickets/validations/query.schema";
import {
  TICKET_ORIGIN_LABEL,
  type TicketOrigin,
} from "@/api/resources/tickets/validations/origin.schema";
import {
  TICKET_PRIORITY_LABEL,
  type TicketPriority,
} from "@/api/resources/tickets/validations/priority.schema";
import { TICKET_STATUS_LABEL } from "@/api/resources/tickets/validations/status.schema";
import { ticketOriginSchema } from "@/api/resources/tickets/validations/origin.schema";
import { ticketPrioritySchema } from "@/api/resources/tickets/validations/priority.schema";
import {
  Button,
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  Text,
} from "@/components/ui";
import { FunnelIcon, SearchIcon, XIcon } from "lucide-react";
import { Dialog } from "radix-ui";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

export type SupportTicketHeaderFiltersProps = {
  filters: TicketQuery;
  setFilters: Dispatch<SetStateAction<TicketQuery>>;
  statuses: string[];
  priorities: TicketPriority[];
  origins: TicketOrigin[];
  resultCount: number;
};

export function SupportTicketHeaderFilters({
  filters,
  setFilters,
  statuses,
  priorities,
  origins,
  resultCount,
}: SupportTicketHeaderFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.subject ?? "");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const subject = searchValue.trim() || undefined;
      if (subject !== filters.subject) {
        setFilters((current) => ({ ...current, subject }));
      }
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [filters.subject, searchValue, setFilters]);

  const hasFilters =
    Boolean(filters.subject) ||
    Boolean(filters.status) ||
    Boolean(filters.priority) ||
    Boolean(filters.origin);

  function updateStatus(value: string) {
    setFilters((current) => ({
      ...current,
      status: value === "all" ? undefined : value,
    }));
  }

  function updatePriority(value: string) {
    if (value === "all") {
      setFilters((current) => ({ ...current, priority: undefined }));
      return;
    }
    const parsedPriority = ticketPrioritySchema.safeParse(value);
    if (!parsedPriority.success) return;
    setFilters((current) => ({
      ...current,
      priority: parsedPriority.data,
    }));
  }

  function updateOrigin(value: string) {
    if (value === "all") {
      setFilters((current) => ({ ...current, origin: undefined }));
      return;
    }
    const parsedOrigin = ticketOriginSchema.safeParse(value);
    if (!parsedOrigin.success) return;
    setFilters((current) => ({
      ...current,
      origin: parsedOrigin.data,
    }));
  }

  function clearFilters() {
    setSearchValue("");
    setFilters({});
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full max-w-2xl gap-2">
          <InputGroup>
            <InputGroupInput
              aria-label="Buscar chamados pelo assunto"
              placeholder="Buscar chamados..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon size={20} className="h-5 w-5" />
            </InputGroupAddon>
          </InputGroup>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="dark-bordered"
                size="lg"
                className="shrink-0"
                aria-label="Abrir filtros de chamados"
              >
                <FunnelIcon size={20} className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader>
                <Dialog.Title className="text-lg font-semibold">
                  Filtrar chamados
                </Dialog.Title>
                <Text>Refine a busca por status, prioridade e origem.</Text>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pb-4">
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Select
                    value={filters.status ?? "all"}
                    onValueChange={updateStatus}
                  >
                    <SelectTrigger
                      aria-label="Filtrar chamados por status"
                      size="sm"
                      rounded="full"
                      className="min-w-40 px-2 py-1"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {TICKET_STATUS_LABEL[status as keyof typeof TICKET_STATUS_LABEL] ?? status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Prioridade</FieldLabel>
                  <Select
                    value={filters.priority ?? "all"}
                    onValueChange={updatePriority}
                  >
                    <SelectTrigger
                      aria-label="Filtrar chamados por prioridade"
                      size="sm"
                      rounded="full"
                      className="min-w-40 px-2 py-1"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as prioridades</SelectItem>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {TICKET_PRIORITY_LABEL[priority]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Origem</FieldLabel>
                  <Select
                    value={filters.origin ?? "all"}
                    onValueChange={updateOrigin}
                  >
                    <SelectTrigger
                      aria-label="Filtrar chamados por origem"
                      size="sm"
                      rounded="full"
                      className="min-w-40 px-2 py-1"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as origens</SelectItem>
                      {origins.map((origin) => (
                        <SelectItem key={origin} value={origin}>
                          {TICKET_ORIGIN_LABEL[origin]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 space-y-2">
          <div className="space-y-1">
            <Label id="support-tickets-heading" size="sm">
              Chamados de atendimento
            </Label>
            <Text>
              {resultCount}{" "}
              {resultCount === 1
                ? "chamado encontrado"
                : "chamados encontrados"}
            </Text>
          </div>
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {filters.subject && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => {
                    setSearchValue("");
                    setFilters((current) => ({ ...current, subject: undefined }));
                  }}
                >
                  Assunto: {filters.subject}
                </Button>
              )}
              {filters.status && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => updateStatus("all")}
                >
                  Status: {TICKET_STATUS_LABEL[filters.status as keyof typeof TICKET_STATUS_LABEL] ?? filters.status}
                </Button>
              )}
              {filters.priority && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => updatePriority("all")}
                >
                  Prioridade: {TICKET_PRIORITY_LABEL[filters.priority]}
                </Button>
              )}
              {filters.origin && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => updateOrigin("all")}
                >
                  Origem: {TICKET_ORIGIN_LABEL[filters.origin]}
                </Button>
              )}
              <Button
                type="button"
                size="xs"
                variant="dark-bordered"
                rounded="full"
                className="px-2 py-1"
                onClick={clearFilters}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
