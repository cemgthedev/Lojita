import {
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
} from "@/api/resources/products/attributes/mutations";
import type { CreateAttribute } from "@/api/resources/products/attributes/validations/create-attribute.schema";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import { Button, Label, Separator, Text } from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { AttributeForm } from "@/pages/Attributes/form/AttributeForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useNavigate } from "react-router";

export function AttributeCreatePage() {
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const createAttributeMutation = useCreateAttributeMutation();
  const updateAttributeMutation = useUpdateAttributeMutation();
  const canManageAttributes = user.role.some(
    (role) =>
      role === ROLE.ADMIN || role === ROLE.SUPPORT || role === ROLE.SELLER,
  );
  const managementBaseUrl = user.role.includes(ROLE.ADMIN)
    ? urls.admin_dashboard
    : user.role.includes(ROLE.SUPPORT)
      ? urls.support_dashboard
      : urls.seller_dashboard;

  async function handleSubmit(
    values: CreateAttribute,
    existingAttributeId?: string,
  ) {
    if (existingAttributeId) {
      return updateAttributeMutation.mutateAsync({
        id: existingAttributeId,
        ...values,
      });
    }

    return createAttributeMutation.mutateAsync(values);
  }

  async function handleSuccess() {
    toast("Atributo criado com sucesso.", { variant: "success" });
    navigate(`${managementBaseUrl}${urls.attributes}`);
  }

  if (!canManageAttributes) {
    return <Navigate to={urls.home} replace />;
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button onClick={() => navigate(-1)} className="bg-transparent p-0">
        <ArrowLeftIcon size={20} />
        <Text>Voltar</Text>
      </Button>

      <header className="space-y-1">
        <Label>Cadastrar atributo</Label>
        <Text>Informe o nome, o tipo e os valores do atributo.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      <AttributeForm
        submitLabel="Cadastrar atributo"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={() => {
          toast("Não foi possível cadastrar o atributo.", {
            variant: "danger",
          });
        }}
        onBack={() =>
          navigate(`${managementBaseUrl}${urls.attributes}`, { replace: true })
        }
        isPending={
          createAttributeMutation.isPending || updateAttributeMutation.isPending
        }
      />
    </main>
  );
}
