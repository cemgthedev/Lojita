import { useAddressesQuery } from "@/api/resources/addresses/queries";
import type { Address } from "@/api/resources/addresses/validations/address.schema";
import { TYPE } from "@/api/resources/addresses/validations/type.schema";
import { useStoreQuery } from "@/api/resources/stores/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  Image,
  ImageContent,
  ImageFallback,
  Label,
  Separator,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { mockAddresses } from "@/mocks/addresses.mock";
import { mockStores } from "@/mocks/stores.mock";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Link, Navigate, useNavigate, useParams } from "react-router";

function formatAddress(address: Address) {
  return `${address.street}, ${address.number} - ${address.city}/${address.state}`;
}

export function StoreManagementPage() {
  const { storeId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const storeQuery = useStoreQuery(storeId);
  const addressesQuery = useAddressesQuery();
  const shouldUseMock =
    !storeQuery.isPending && (storeQuery.isError || !storeQuery.data);
  const mockStore =
    mockStores.find((store) => store.id === storeId) ??
    mockStores.find((store) => store.userId === user.id);
  const store = storeQuery.data ?? (shouldUseMock ? mockStore : undefined);
  const shouldUseMockAddresses =
    !addressesQuery.isPending &&
    (addressesQuery.isError || !addressesQuery.data?.length);
  const addresses = shouldUseMockAddresses
    ? mockAddresses
    : (addressesQuery.data ?? []);
  const storeAddress = addresses.find(
    (address) => address.userId === user.id && address.type === TYPE.STORE,
  );
  const canUpdateStore = user.role.some(
    (role) => role === ROLE.ADMIN || role === ROLE.SELLER,
  );
  const formattedAddress = storeAddress && formatAddress(storeAddress);
  const googleMapsUrl = storeAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${formattedAddress}, ${storeAddress.cep}, ${storeAddress.neighborhood}, Brasil`,
      )}`
    : undefined;
  const googleMapsEmbedUrl = storeAddress
    ? `https://www.google.com/maps?${new URLSearchParams({
        q: `${formattedAddress}, ${storeAddress.cep}, ${storeAddress.neighborhood}, Brasil`,
        output: "embed",
      }).toString()}`
    : undefined;

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

  if (storeQuery.isPending || addressesQuery.isPending) {
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
          <Text>Não foi possível carregar os dados da loja.</Text>
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

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <Image className="size-40 shrink-0">
            <ImageContent src={store.logoUrl || undefined} alt={store.name} />
            <ImageFallback variant="primary">
              {store.name.slice(0, 2).toLocaleUpperCase()}
            </ImageFallback>
          </Image>
          <div className="space-y-1">
            <Label>{store.name}</Label>
            <Text>{store.businessEmail}</Text>
            <Text>{store.phone}</Text>
            <Link to={`${urls.stores}/${encodeURIComponent(store.id)}`}>
              @{store.url}
            </Link>
          </div>
        </div>
        {canUpdateStore && (
          <Link
            to={`${urls.store_dashboard}${urls.update}/${encodeURIComponent(store.id)}`}
            className={buttonVariants({ variant: "secondary-bordered" })}
          >
            Atualizar loja
          </Link>
        )}
      </header>

      <Separator variant="secondary" />

      <Card size="md" rounded="lg" className="p-0 border-none">
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>{store.description && <Text>{store.description}</Text>}</div>
          <div className="space-y-3">
            {googleMapsEmbedUrl && storeAddress && (
              <iframe
                src={googleMapsEmbedUrl}
                title={`Mapa da localização de ${storeAddress.name}`}
                className="pointer-events-none aspect-video w-full rounded-lg"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                tabIndex={-1}
              />
            )}
            {storeAddress && googleMapsUrl ? (
              <>
                <Text>{formatAddress(storeAddress)}</Text>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ variant: "success-ghost" })}
                >
                  Ver no Google Maps
                </a>
              </>
            ) : (
              <Text>Endereço da loja não encontrado.</Text>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
