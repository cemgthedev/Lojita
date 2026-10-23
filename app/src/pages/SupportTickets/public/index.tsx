import { buttonVariants, Heading, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { TableSupportTickets } from "@/pages/SupportTickets/components/TableSupportTickets";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export function SupportTicketsPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <Heading id="support-tickets-heading" size="sm">
            Meus atendimentos
          </Heading>
          <Text>Consulte e atualize os seus atendimentos.</Text>
        </div>
        <Link
          to={`${urls.customer_dashboard}${urls.tickets}${urls.create}`}
          className={buttonVariants({ variant: "success" })}
        >
          <PlusIcon aria-hidden="true" size={18} />
          Abrir solicitação
        </Link>
      </header>
      <TableSupportTickets />
    </main>
  );
}
