import { ROLE } from "@/api/resources/users/validations/auth.schema";
import { buttonVariants, Heading, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { useHighestRole } from "@/hooks/useHighestRole";
import { TableUsers } from "@/pages/Users/components/TableUsers";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { Link } from "react-router";

export function UsersManagementPage() {
  const { user } = useRequiredAuth();
  const role = useHighestRole(user.role);
  const managementBaseUrl =
    role === ROLE.ADMIN ? urls.admin_dashboard : urls.support_dashboard;

  return (
    <main className="space-y-6 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <header className="space-y-1">
          <Heading id="users-management-heading" size="sm">
            Gerenciamento de usuários
          </Heading>
          <Text>Consulte e gerencie os usuários cadastrados.</Text>
        </header>

        <Link
          to={`${managementBaseUrl}${urls.users}${urls.create}`}
          className={buttonVariants({ variant: "success" })}
        >
          Adicionar usuário
        </Link>
      </div>
      <TableUsers />
    </main>
  );
}
