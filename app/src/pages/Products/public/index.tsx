import { Heading, Text } from "@/components/ui";
import { ListProducts } from "@/pages/Products/components/ListProducts";

export function ProductsPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <Heading id="products-management-heading" size="sm">
            Produtos
          </Heading>
          <Text>Encontre produtos de diversas categorias.</Text>
        </div>
      </header>
      <ListProducts />
    </main>
  );
}
