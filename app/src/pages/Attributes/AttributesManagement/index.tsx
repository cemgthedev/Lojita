import { ROLE } from "@/api/resources/users/validations/auth.schema";
import { buttonVariants, Heading, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { useHighestRole } from "@/hooks/useHighestRole";
import { TableAttributes } from "@/pages/Attributes/components/TableAttributes";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router";

export function AttributesManagementPage() {
  const { user } = useRequiredAuth();
  const role = useHighestRole(user.role);
  const isSeller = role === ROLE.SELLER;
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
    <main
      className="space-y-6 p-6"
      aria-labelledby="attributes-management-heading"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <header className="space-y-1">
          <Heading id="attributes-management-heading" size="sm">
            Gerenciamento de atributos
          </Heading>
          <Text>
            {isSeller
              ? "Consulte os atributos disponíveis para os produtos da sua loja."
              : "Consulte os atributos cadastrados para os produtos."}
          </Text>
        </header>
        <Link
          to={`${managementBaseUrl}${urls.attributes}${urls.create}`}
          className={buttonVariants({ variant: "success" })}
        >
          Adicionar atributo
        </Link>
      </div>
      <TableAttributes />
    </main>
  );
}
