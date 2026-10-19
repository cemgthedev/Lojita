import { useUpdateCategoryMutation } from "@/api/resources/categories/mutations";
import { useCategoryQuery } from "@/api/resources/categories/queries";
import type { CreateCategory } from "@/api/resources/categories/validations/create.schema";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
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
import { CategoryForm } from "@/pages/Categories/form/CategoryForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";

export function CategoryUpdatePage() {
  const { categoryId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const categoryQuery = useCategoryQuery(categoryId);
  const updateCategoryMutation = useUpdateCategoryMutation();
  const category = categoryQuery.data;
  const canUpdateCategory = user.role.some(
    (role) => role === ROLE.ADMIN || role === ROLE.SUPPORT,
  );
  const managementBaseUrl = user.role.includes(ROLE.ADMIN)
    ? urls.admin_dashboard
    : urls.support_dashboard;

  async function handleSubmit(values: CreateCategory) {
    if (!category) {
      throw new Error("Category is required before it can be updated.");
    }

    if (categoryQuery.isError) {
      throw new Error("Demo category data cannot be updated through the API.");
    }

    return updateCategoryMutation.mutateAsync({
      id: category.id,
      title: values.title,
      description: values.description,
      imageUrl: values.imageUrl,
    });
  }

  async function handleSuccess() {
    toast("Categoria atualizada com sucesso.", { variant: "success" });
    navigate(`${managementBaseUrl}${urls.categories}`);
  }

  if (!canUpdateCategory) {
    return <Navigate to={urls.home} replace />;
  }

  if (!categoryId) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text>Não foi possível encontrar a categoria.</Text>
        </CardContent>
      </Card>
    );
  }

  if (categoryQuery.isPending) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text>Carregando categoria...</Text>
        </CardContent>
      </Card>
    );
  }

  if (!category) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text>
            Não foi possível carregar os dados da categoria para atualização.
          </Text>
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
        <Label>Atualizar categoria</Label>
        <Text>Edite as informações e mantenha a categoria atualizada.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      {categoryQuery.isError && (
        <Text role="alert" className="animate-pulse-once">
          Não foi possível carregar a categoria. Exibindo dados de exemplo; a
          atualização está indisponível.
        </Text>
      )}

      <CategoryForm
        key={category.id}
        initialValues={{
          title: category.title,
          description: category.description,
          imageUrl: category.imageUrl,
        }}
        submitLabel="Atualizar categoria"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={() => {
          toast("Não foi possível atualizar os dados da categoria.", {
            variant: "danger",
          });
        }}
        onBack={() =>
          navigate(`${managementBaseUrl}${urls.categories}`, {
            replace: true,
          })
        }
        isPending={updateCategoryMutation.isPending}
      />
    </main>
  );
}
