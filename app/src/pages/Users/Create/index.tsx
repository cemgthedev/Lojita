import { useCreateUserMutation } from "@/api/resources/users/mutations";
import type { CreateUser } from "@/api/resources/users/validations/create.schema";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import { Button, Label, Separator, Text } from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { UserForm } from "@/pages/Users/form/UserForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useNavigate } from "react-router";

export function UserCreatePage() {
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const createUserMutation = useCreateUserMutation();
  const canManageUsers = user.role.some(
    (role) => role === ROLE.ADMIN || role === ROLE.SUPPORT,
  );
  const managementBaseUrl = user.role.includes(ROLE.ADMIN)
    ? urls.admin_dashboard
    : urls.support_dashboard;

  async function handleSubmit(values: CreateUser) {
    return createUserMutation.mutateAsync(values);
  }

  async function handleSuccess() {
    toast("Usuário criado com sucesso.", { variant: "success" });
    navigate(`${managementBaseUrl}${urls.users}`);
  }

  if (!canManageUsers) {
    return <Navigate to={urls.home} replace />;
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button onClick={() => navigate(-1)} className="bg-transparent p-0">
        <ArrowLeftIcon size={20} />
        <Text>Voltar</Text>
      </Button>

      <header className="space-y-1">
        <Label>Cadastrar usuário</Label>
        <Text>Preencha as informações para cadastrar um usuário.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      <UserForm
        submitLabel="Cadastrar usuário"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={() => {
          toast("Não foi possível cadastrar o usuário.", {
            variant: "danger",
          });
        }}
        onBack={() =>
          navigate(`${managementBaseUrl}${urls.users}`, { replace: true })
        }
        isPending={createUserMutation.isPending}
      />
    </main>
  );
}
