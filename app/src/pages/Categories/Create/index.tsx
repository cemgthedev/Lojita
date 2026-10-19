import { useCreateCategoryMutation } from "@/api/resources/categories/mutations";
import type { CreateCategory } from "@/api/resources/categories/validations/create.schema";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import { Button, Label, Separator, Text } from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { CategoryForm } from "@/pages/Categories/form/CategoryForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useNavigate } from "react-router";

export function CategoryCreatePage() {
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const createCategoryMutation = useCreateCategoryMutation();
  const canUpdateCategory = user.role.some(
    (role) => role === ROLE.ADMIN || role === ROLE.SUPPORT,
  );
  const managementBaseUrl = user.role.includes(ROLE.ADMIN)
    ? urls.admin_dashboard
    : urls.support_dashboard;

  async function handleSubmit(values: CreateCategory) {
    return createCategoryMutation.mutateAsync(values);
  }

  async function handleSuccess() {
    toast("Categoria criada com sucesso.", { variant: "success" });
    navigate(`${managementBaseUrl}${urls.categories}`);
  }

  if (!canUpdateCategory) {
    return <Navigate to={urls.home} replace />;
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button onClick={() => navigate(-1)} className="bg-transparent p-0">
        <ArrowLeftIcon size={20} />
        <Text>Voltar</Text>
      </Button>

      <header className="space-y-1">
        <Label>Cadastrar categoria</Label>
        <Text>Preencha as informações para cadastrar uma categoria.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      <CategoryForm
        submitLabel="Cadastrar categoria"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={() => {
          toast("Não foi possível cadastrar a categoria.", {
            variant: "danger",
          });
        }}
        onBack={() =>
          navigate(`${managementBaseUrl}${urls.categories}`, { replace: true })
        }
        isPending={createCategoryMutation.isPending}
      />
    </main>
  );
}
