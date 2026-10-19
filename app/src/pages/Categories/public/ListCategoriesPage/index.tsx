import { Heading, Text } from "@/components/ui";
import { ListCategory } from "@/pages/Categories/components/ListCategory";

export function ListCategoriesPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <Heading size="sm">Categorias</Heading>
        <Text>Explore as categorias disponíveis.</Text>
      </header>

      <ListCategory />
    </main>
  );
}
