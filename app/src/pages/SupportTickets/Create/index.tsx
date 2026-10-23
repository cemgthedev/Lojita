import { useCreateTicketMutation } from "@/api/resources/tickets/mutations";
import type { CreateTicket } from "@/api/resources/tickets/validations/create.schema";
import { Button, Heading, Separator, Text } from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { SupportTicketForm } from "@/pages/SupportTickets/form/SupportTicketForm";
import type { SupportTicketFormValues } from "@/pages/SupportTickets/form/SupportTicketForm";
import { ArrowLeftIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

export function SupportTicketCreatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const createTicketMutation = useCreateTicketMutation();
  const listUrl = location.pathname.replace(/\/create\/?$/, "");

  async function handleSubmit(values: SupportTicketFormValues) {
    const ticket: CreateTicket = {
      ...values,
      origin: "customer_portal",
      chatId: null,
      status: "open",
    };
    return createTicketMutation.mutateAsync(ticket);
  }

  function navigateToList() {
    if (listUrl) {
      navigate(listUrl, { replace: true });
      return;
    }
    navigate(-1);
  }

  function handleSuccess() {
    toast("Solicitação aberta com sucesso.", { variant: "success" });
    navigateToList();
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button
        type="button"
        onClick={navigateToList}
        className="bg-transparent p-0"
      >
        <ArrowLeftIcon aria-hidden="true" size={20} />
        <Text>Voltar</Text>
      </Button>

      <header className="space-y-1">
        <Heading size="sm">Solicitar atendimento</Heading>
        <Text>
          Encontre ajuda ou entre em contato com a equipe da Lojita.
        </Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      <SupportTicketForm
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={() => {
          toast("Não foi possível abrir a solicitação.", {
            variant: "danger",
          });
        }}
        onBack={navigateToList}
        isPending={createTicketMutation.isPending}
      />
    </main>
  );
}
