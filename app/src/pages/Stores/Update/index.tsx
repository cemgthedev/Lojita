import { useUpdateStoreMutation } from "@/api/resources/stores/mutations";
import { useStoreQuery } from "@/api/resources/stores/queries";
import type { CreateStore } from "@/api/resources/stores/validations/create.schema";
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
import { mockStores } from "@/mocks/stores.mock";
import { StoreForm } from "@/pages/Stores/form/StoreForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";

export function StoreUpdatePage() {
  const { storeId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const storeQuery = useStoreQuery(storeId);
  const updateStoreMutation = useUpdateStoreMutation();
  const shouldUseMock =
    !storeQuery.isPending && (storeQuery.isError || !storeQuery.data);
  const store =
    storeQuery.data ??
    (shouldUseMock
      ? mockStores.find(
          (mockStore) =>
            mockStore.id === storeId || mockStore.userId === user.id,
        )
      : undefined);
  const canUpdateStore = user.role.some(
    (role) => role === ROLE.ADMIN || role === ROLE.SELLER,
  );

  async function handleSubmit(values: CreateStore) {
    if (!store) {
      throw new Error("Store is required before it can be updated.");
    }

    return updateStoreMutation.mutateAsync({
      id: store.id,
      name: values.name,
      description: values.description,
      logoUrl: values.logoUrl,
      businessEmail: values.businessEmail,
      phone: values.phone,
      url: values.url,
    });
  }

  async function handleSuccess() {
    toast("Loja atualizada com sucesso.", { variant: "success" });
    navigate(`${urls.store_dashboard}/details/${encodeURIComponent(storeId)}`);
  }

  if (!canUpdateStore) {
    return <Navigate to={urls.home} replace />;
  }

  if (!storeId) {
    return (
      <Card className="p-6 border-none" size="md" rounded="lg">
        <CardContent>
          <Text>Não foi possível encontrar a loja.</Text>
        </CardContent>
      </Card>
    );
  }

  if (storeQuery.isPending) {
    return (
      <Card className="p-6 border-none" size="md" rounded="lg">
        <CardContent>
          <Text>Carregando loja...</Text>
        </CardContent>
      </Card>
    );
  }

  if (!store) {
    return (
      <Card className="p-6 border-none" size="md" rounded="lg">
        <CardContent>
          <Text>
            Não foi possível carregar os dados da loja para atualização.
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
        <Label>Atualizar loja</Label>
        <Text>Edite as informações e mantenha sua loja atualizada.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      <StoreForm
        key={store.id}
        userId={store.userId}
        initialValues={{
          name: store.name,
          description: store.description,
          logoUrl: store.logoUrl,
          businessEmail: store.businessEmail,
          phone: store.phone,
          url: store.url,
        }}
        submitLabel="Atualizar loja"
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={() => {
          toast("Não foi possível atualizar os dados da loja.", {
            variant: "danger",
          });
        }}
        onBack={() =>
          navigate(
            `${urls.store_dashboard}/details/${encodeURIComponent(store.id)}`,
          )
        }
        isPending={updateStoreMutation.isPending}
      />
    </main>
  );
}
