import { ROLE } from "@/api/resources/users/validations/auth.schema";
import { buttonVariants, Heading, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { useHighestRole } from "@/hooks/useHighestRole";
import { TableCategories } from "@/pages/Categories/components/TableCategories";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { Link } from "react-router";

export function CategoriesManagement() {
  const { user } = useRequiredAuth();
  const role = useHighestRole(user.role);
  const managementBaseUrl =
    role === ROLE.ADMIN
      ? urls.admin_dashboard
      : role === ROLE.SUPPORT
        ? urls.support_dashboard
        : role === ROLE.SELLER
          ? urls.seller_dashboard
          : role === ROLE.CUSTOMER
            ? urls.customer_dashboard
            : "";

  return (
    <main className="space-y-6 p-6">
      <div className="flex justify-between">
        <header className="space-y-1">
          <Heading id="categories-management-heading" size="sm">
            Gerenciamento de categorias
          </Heading>
          <Text>Consulte as categorias cadastradas.</Text>
        </header>

        <Link
          to={`${managementBaseUrl}${urls.categories}${urls.create}`}
          className={buttonVariants({ variant: "success" })}
        >
          Adicionar categoria
        </Link>
      </div>
      <TableCategories />
    </main>
  );
}
