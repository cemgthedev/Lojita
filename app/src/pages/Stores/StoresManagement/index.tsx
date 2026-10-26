import { Heading, Text } from "@/components/ui";
import { TableStores } from "@/pages/Stores/components/TableStores";

export function StoresManagementPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <Heading id="stores-management-heading" size="sm">
          Gerenciamento de lojas
        </Heading>
        <Text>Consulte e gerencie as lojas cadastradas.</Text>
      </header>
      <TableStores />
    </main>
  );
}