import { useUpdateAttributeMutation } from "@/api/resources/products/attributes/mutations";
import { useAttributeQuery } from "@/api/resources/products/attributes/queries";
import type { CreateAttribute } from "@/api/resources/products/attributes/validations/create-attribute.schema";
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
import { AttributeForm } from "@/pages/Attributes/form/AttributeForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";

export function AttributeUpdatePage() {
  const { attributeId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const attributeQuery = useAttributeQuery(attributeId);
  const updateAttributeMutation = useUpdateAttributeMutation();
  const attribute = attributeQuery.data;
  const canManageAttributes = user.role.some(
    (role) =>
      role === ROLE.ADMIN || role === ROLE.SUPPORT || role === ROLE.SELLER,
  );
  const managementBaseUrl = user.role.includes(ROLE.ADMIN)
    ? urls.admin_dashboard
    : user.role.includes(ROLE.SUPPORT)
      ? urls.support_dashboard
      : urls.seller_dashboard;

  async function handleSubmit(values: CreateAttribute) {
    if (!attribute) {
      throw new Error("Attribute is required before it can be updated.");
    }

    if (attributeQuery.isError) {
      throw new Error("Demo attribute data cannot be updated through the API.");
    }

    return updateAttributeMutation.mutateAsync({ id: attribute.id, ...values });
  }

  async function handleSuccess() {
    toast("Atributo atualizado com sucesso.", { variant: "success" });
    navigate(`${managementBaseUrl}${urls.attributes}`);
  }

  if (!canManageAttributes) {
    return <Navigate to={urls.home} replace />;
  }

  if (!attributeId) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text>Não foi possível encontrar o atributo.</Text>
        </CardContent>
      </Card>
    );
  }

  if (attributeQuery.isPending) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text>Carregando atributo...</Text>
        </CardContent>
      </Card>
    );
  }

  if (!attribute) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text>Não foi possível carregar os dados do atributo.</Text>
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
        <Label>Atualizar atributo</Label>
        <Text>Edite os dados e os valores do atributo.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      {attributeQuery.isError && (
        <Text role="alert" className="animate-pulse-once">
          Não foi possível carregar o atributo. Dados de exemplo são exibidos e
          não podem ser alterados.
        </Text>
      )}

      <AttributeForm
        key={attribute.id}
        initialValues={{ name: attribute.name, type: attribute.type }}
        attributeId={attribute.id}
        canEditValues={!attributeQuery.isError}
        submitLabel="Atualizar atributo"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={() => {
          toast("Não foi possível atualizar o atributo.", {
            variant: "danger",
          });
        }}
        onBack={() =>
          navigate(`${managementBaseUrl}${urls.attributes}`, {
            replace: true,
          })
        }
        isPending={updateAttributeMutation.isPending || attributeQuery.isError}
      />
    </main>
  );
}
