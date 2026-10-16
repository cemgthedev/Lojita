import { useAddressesQuery } from "@/api/resources/addresses/queries";
import type { Address } from "@/api/resources/addresses/validations/address.schema";
import { TYPE } from "@/api/resources/addresses/validations/type.schema";
import { useStoreQuery } from "@/api/resources/stores/queries";
import {
  Button,
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
import { ListProducts } from "@/pages/Products/components/ListProducts";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";

function formatAddress(address: Address) {
  return `${address.street}, ${address.number} - ${address.city}/${address.state}`;
}

export function StoreDetailsPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const storeQuery = useStoreQuery(id);
  const addressesQuery = useAddressesQuery();
  const store = storeQuery.data;
  const addresses = addressesQuery.data ?? [];
  const storeAddress = store
    ? addresses.find(
        (address) =>
          address.userId === store.userId && address.type === TYPE.STORE,
      )
    : undefined;
  const formattedAddress = storeAddress && formatAddress(storeAddress);
  const googleMapsUrl = storeAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${formattedAddress}, ${storeAddress.cep}, ${storeAddress.neighborhood}, Brasil`,
      )}`
    : undefined;

  if (!id) {
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
          <Text>Não foi possível carregar os dados da loja. {id}</Text>
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

      <header className="flex gap-4 flex-col md:flex-row">
        <div className="md:min-w-fit flex items-center gap-4">
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
            <div>
              <Link to={`${urls.stores}/${encodeURIComponent(store.id)}`}>
                @{store.url}
              </Link>
            </div>
            {storeAddress && googleMapsUrl && (
              <div>
                <Link to={googleMapsUrl}>{formatAddress(storeAddress)}</Link>
              </div>
            )}
          </div>
        </div>

        <Separator
          className="hidden md:block"
          orientation="vertical"
          variant="secondary"
        />
        <Separator
          className="block md:hidden"
          orientation="horizontal"
          variant="secondary"
        />

        {store.description && (
          <Text className="line-clamp-6">{store.description}</Text>
        )}
      </header>

      {(storeQuery.isError || addressesQuery.isError) && (
        <Text role="status" className="animate-pulse-once">
          Não foi possível carregar alguns dados da loja. Exibindo dados de
          exemplo.
        </Text>
      )}

      <ListProducts />
    </main>
  );
}
