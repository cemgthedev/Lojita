import { Heading, Text } from "@/components/ui";
import { TableSupportTickets } from "@/pages/SupportTickets/components/TableSupportTickets";

export function SupportTicketsPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <Heading id="support-tickets-heading" size="sm">
          Meus atendimentos
        </Heading>
        <Text>Consulte e atualize os seus atendimentos.</Text>
      </header>
      <TableSupportTickets />
    </main>
  );
}
