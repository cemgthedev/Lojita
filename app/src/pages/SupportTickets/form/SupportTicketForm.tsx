import type { CreateTicket } from "@/api/resources/tickets/validations/create.schema";
import {
  TICKET_MOTIVE,
  TICKET_MOTIVE_LABEL,
  ticketMotiveSchema,
} from "@/api/resources/tickets/validations/motive.schema";
import {
  TICKET_PRIORITY,
  TICKET_PRIORITY_LABEL,
  ticketPrioritySchema,
} from "@/api/resources/tickets/validations/priority.schema";
import { createTicketSchema } from "@/api/resources/tickets/validations/create.schema";
import type { Ticket } from "@/api/resources/tickets/validations/ticket.schema";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { useState, type FormEvent } from "react";

export type SupportTicketFormValues = Pick<
  CreateTicket,
  "motive" | "subject" | "description" | "priority"
>;

type SupportTicketFormProps = {
  submitLabel?: string;
  initialValues?: Partial<SupportTicketFormValues>;
  onSubmit: (values: SupportTicketFormValues) => Promise<Ticket>;
  onSuccess?: (ticket: Ticket) => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  onBack: () => void;
  isPending: boolean;
};

const initialValues: SupportTicketFormValues = {
  motive: TICKET_MOTIVE.OTHER,
  subject: "",
  description: null,
  priority: TICKET_PRIORITY.NORMAL,
};

export function SupportTicketForm({
  submitLabel = "Abrir solicitação",
  initialValues: suppliedInitialValues,
  onSubmit,
  onSuccess,
  onError,
  onBack,
  isPending,
}: SupportTicketFormProps) {
  const [values, setValues] = useState<SupportTicketFormValues>(() => ({
    ...initialValues,
    ...suppliedInitialValues,
  }));
  const { user } = useRequiredAuth();
  const canSetPriority = user.role.some(
    (role) => role === ROLE.ADMIN || role === ROLE.SUPPORT,
  );

  function handleChange<K extends keyof SupportTicketFormValues>(
    field: K,
    value: SupportTicketFormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = createTicketSchema.safeParse({
      ...values,
      origin: "customer_portal",
      chatId: null,
      status: "open",
    });

    if (!result.success) {
      toast("Verifique os dados da solicitação.", { variant: "danger" });
      return;
    }

    try {
      const ticket = await onSubmit({
        motive: result.data.motive,
        subject: result.data.subject,
        description: result.data.description,
        priority: result.data.priority,
      });
      await onSuccess?.(ticket);
    } catch (error) {
      if (onError) {
        await onError(error);
        return;
      }
      toast("Não foi possível abrir a solicitação.", { variant: "danger" });
    }
  }

  return (
    <form
      className="w-full max-w-2xl space-y-5 rounded-lg border border-secondary-600 p-4"
      onSubmit={handleSubmit}
    >
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="support-ticket-motive">Motivo</FieldLabel>
          <Select
            value={values.motive}
            onValueChange={(value) => {
              const result = ticketMotiveSchema.safeParse(value);
              if (result.success) {
                handleChange("motive", result.data);
              }
            }}
            disabled={isPending}
          >
            <SelectTrigger
              id="support-ticket-motive"
              aria-label="Motivo do atendimento"
              className="w-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TICKET_MOTIVE).map((motive) => (
                <SelectItem key={motive} value={motive}>
                  {TICKET_MOTIVE_LABEL[motive]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="support-ticket-subject">Assunto</FieldLabel>
          <Input
            id="support-ticket-subject"
            name="subject"
            placeholder="Informe o assunto da solicitação."
            value={values.subject}
            onChange={(event) => handleChange("subject", event.target.value)}
            maxLength={160}
            required
            disabled={isPending}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="support-ticket-description">Descrição</FieldLabel>
          <Textarea
            id="support-ticket-description"
            name="description"
            placeholder="Descreva sua solicitação e inclua as informações relevantes."
            value={values.description ?? ""}
            onChange={(event) =>
              handleChange("description", event.target.value || null)
            }
            maxLength={2000}
            rows={5}
            disabled={isPending}
          />
        </Field>

        {canSetPriority && (
          <Field>
            <FieldLabel htmlFor="support-ticket-priority">
              Prioridade
            </FieldLabel>
            <Select
              value={values.priority}
              onValueChange={(value) => {
                const result = ticketPrioritySchema.safeParse(value);
                if (result.success) {
                  handleChange("priority", result.data);
                }
              }}
              disabled={isPending}
            >
              <SelectTrigger
                id="support-ticket-priority"
                aria-label="Prioridade do atendimento"
                className="w-full"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TICKET_PRIORITY).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {TICKET_PRIORITY_LABEL[priority]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      </FieldGroup>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="danger-bordered"
          onClick={onBack}
          disabled={isPending}
          className="w-full sm:max-w-50"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="secondary"
          disabled={isPending}
          className="w-full sm:max-w-50"
        >
          {isPending ? "Enviando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
