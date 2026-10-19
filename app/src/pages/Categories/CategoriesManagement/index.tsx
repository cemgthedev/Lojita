import { Heading, Text } from "@/components/ui";
import { TableCategories } from "@/pages/Categories/components/TableCategories";

export function CategoriesManagement() {
  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <Heading id="categories-management-heading" size="sm">
          Gerenciamento de categorias
        </Heading>
        <Text>Consulte as categorias cadastradas.</Text>
      </header>
      <TableCategories />
    </main>
  );
}
