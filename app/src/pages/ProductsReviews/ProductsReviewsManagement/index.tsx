import { Heading, Text } from "@/components/ui";
import { TableProductReviews } from "@/pages/ProductsReviews/components/TableProductReviews";

export function ProductsReviewsManagement() {
  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <Heading id="products-reviews-management-page-heading" size="sm">
          Gerenciamento de avaliações
        </Heading>
        <Text>Consulte e modere as avaliações dos produtos.</Text>
      </header>
      <TableProductReviews />
    </main>
  );
}