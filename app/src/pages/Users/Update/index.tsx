import { useUpdateUserMutation } from "@/api/resources/users/mutations";
import { useUserQuery } from "@/api/resources/users/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import type { CreateUser } from "@/api/resources/users/validations/create.schema";
import {
  Button,
  Card,
  CardContent,
  Label,
  Separator,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { UserForm } from "@/pages/Users/form/UserForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";

export function UserUpdatePage() {
  const { userId = "" } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useRequiredAuth();
  const userQuery = useUserQuery(userId);
  const updateUserMutation = useUpdateUserMutation();
  const managedUser = userQuery.data;
  const canManageUsers = currentUser.role.some(
    (role) => role === ROLE.ADMIN || role === ROLE.SUPPORT,
  );
  const managementBaseUrl = currentUser.role.includes(ROLE.ADMIN)
    ? urls.admin_dashboard
    : urls.support_dashboard;

  async function handleSubmit(values: CreateUser) {
    if (!managedUser) {
      throw new Error("User is required before it can be updated.");
    }

    if (userQuery.isError) {
      throw new Error("Demo user data cannot be updated through the API.");
    }

    return updateUserMutation.mutateAsync({ id: managedUser.id, ...values });
  }

  async function handleSuccess() {
    toast("Usuário atualizado com sucesso.", { variant: "success" });
    navigate(`${managementBaseUrl}${urls.users}`);
  }

  if (!canManageUsers) {
    return <Navigate to={urls.home} replace />;
  }

  if (!userId) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text>Não foi possível encontrar o usuário.</Text>
        </CardContent>
      </Card>
    );
  }

  if (userQuery.isPending) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text>Carregando usuário...</Text>
        </CardContent>
      </Card>
    );
  }

  if (!managedUser) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text>Não foi possível carregar os dados do usuário.</Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button onClick={() => navigate(-1)} className="bg-transparent p-0">
        <ArrowLeftIcon size={20} />
        <Text>Voltar</Text>
      </Button>

      <header className="space-y-1">
        <Label>Atualizar usuário</Label>
        <Text>Edite as informações e mantenha o usuário atualizado.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      {userQuery.isError && (
        <Text role="alert" className="animate-pulse-once">
          Não foi possível carregar o usuário. Exibindo dados de exemplo; a
          atualização está indisponível.
        </Text>
      )}

      <UserForm
        key={managedUser.id}
        initialValues={{
          name: managedUser.name,
          email: managedUser.email,
          document: managedUser.document,
          phone: managedUser.phone,
          avatarUrl: managedUser.avatarUrl,
          role: managedUser.role,
        }}
        submitLabel="Atualizar usuário"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={() => {
          toast("Não foi possível atualizar os dados do usuário.", {
            variant: "danger",
          });
        }}
        onBack={() =>
          navigate(`${managementBaseUrl}${urls.users}`, { replace: true })
        }
        isPending={updateUserMutation.isPending}
      />
    </main>
  );
}
