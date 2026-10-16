import { Heading, Text } from "@/components/ui";
import { TableProducts } from "@/pages/Products/components/TableProducts";

export function ProductsManagement() {
  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <Heading id="products-management-heading" size="sm">
          Gerenciamento de produtos
        </Heading>
        <Text>Consulte e gerencie os produtos cadastrados.</Text>
      </header>
      <TableProducts />
    </main>
  );
}
