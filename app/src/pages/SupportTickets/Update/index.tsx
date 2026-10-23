import { useUpdateTicketMutation } from "@/api/resources/tickets/mutations";
import { useTicketQuery } from "@/api/resources/tickets/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import {
  Button,
  Card,
  CardContent,
  Heading,
  Separator,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { SupportTicketForm } from "@/pages/SupportTickets/form/SupportTicketForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";

function getLoadingCard(message: string) {
  return (
    <Card className="border-none p-6" size="md" rounded="lg">
      <CardContent>
        <Text>{message}</Text>
      </CardContent>
    </Card>
  );
}

export function SupportTicketUpdatePage() {
  const { ticketId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const ticketQuery = useTicketQuery(ticketId);
  const updateTicketMutation = useUpdateTicketMutation();
  const isCustomer = user.role.includes(ROLE.CUSTOMER);
  const listBase = isCustomer
    ? `${urls.customer_dashboard}${urls.tickets}`
    : user.role.includes(ROLE.ADMIN)
      ? `${urls.admin_dashboard}${urls.attendances}`
      : user.role.includes(ROLE.SUPPORT)
        ? `${urls.support_dashboard}${urls.attendances}`
        : `${urls.seller_dashboard}${urls.attendances}`;

  if (!ticketId) {
    return getLoadingCard("Não foi possível encontrar o chamado.");
  }

  if (ticketQuery.isPending) {
    return getLoadingCard("Carregando dados do chamado...");
  }

  /**
   * if (ticketQuery.isError) {
    return getLoadingCard(
      "Não foi possível carregar os dados do chamado. Tente novamente mais tarde.",
    );
  }
   */

  const ticket = ticketQuery.data;
  if (!ticket) {
    return getLoadingCard("Não foi possível encontrar o chamado.");
  }

  if (isCustomer && ticket.requesterId !== user.id) {
    return <Navigate to={listBase} replace />;
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button
        type="button"
        onClick={() => navigate(listBase)}
        className="bg-transparent p-0"
      >
        <ArrowLeftIcon aria-hidden="true" size={20} />
        <Text>Voltar</Text>
      </Button>

      <header className="space-y-1">
        <Heading size="sm">Atualizar chamado</Heading>
        <Text>Edite o motivo, assunto, descrição e prioridade.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      <SupportTicketForm
        key={ticket.id}
        initialValues={{
          motive: ticket.motive,
          subject: ticket.subject,
          description: ticket.description,
          priority: ticket.priority,
        }}
        submitLabel="Atualizar chamado"
        onSubmit={(values) =>
          updateTicketMutation.mutateAsync({ id: ticket.id, ...values })
        }
        onSuccess={() => {
          toast("Chamado atualizado com sucesso.", { variant: "success" });
          navigate(listBase);
        }}
        onError={() => {
          toast("Não foi possível atualizar o chamado.", {
            variant: "danger",
          });
        }}
        onBack={() => navigate(listBase, { replace: true })}
        isPending={updateTicketMutation.isPending}
      />
    </main>
  );
}
