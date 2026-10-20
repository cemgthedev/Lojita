import { buttonVariants, Heading, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { TableProducts } from "@/pages/Products/components/TableProducts";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

export function ProductsManagement() {
  const { user } = useRequiredAuth();
  const isSeller = user.role.includes("seller");

  return (
    <main className="space-y-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <Heading id="products-management-heading" size="sm">
            Gerenciamento de produtos
          </Heading>
          <Text>Consulte e gerencie os produtos cadastrados.</Text>
        </div>
        {isSeller && (
          <Link
            to={`${urls.seller_dashboard}${urls.products}${urls.create}`}
            className={buttonVariants({ variant: "success" })}
          >
            <PlusIcon aria-hidden="true" size={18} />
            Cadastrar produto
          </Link>
        )}
      </header>
      <TableProducts />
    </main>
  );
}
