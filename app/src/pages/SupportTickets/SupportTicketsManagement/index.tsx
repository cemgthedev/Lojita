import { Heading, Text } from "@/components/ui";
import { TableSupportTickets } from "@/pages/SupportTickets/components/TableSupportTickets";

export function SupportTicketsManagementPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <Heading id="support-tickets-management-heading" size="sm">
          Gerenciamento de chamados
        </Heading>
        <Text>Consulte e atualize os chamados de atendimento.</Text>
      </header>
      <TableSupportTickets />
    </main>
  );
}