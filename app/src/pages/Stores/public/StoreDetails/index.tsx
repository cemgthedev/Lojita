import { useAddressesQuery } from "@/api/resources/addresses/queries";
import type { Address } from "@/api/resources/addresses/validations/address.schema";
import { TYPE } from "@/api/resources/addresses/validations/type.schema";
import { useProductsQuery } from "@/api/resources/products/products/queries";
import type { ProductQuery } from "@/api/resources/products/products/validations/query.schema";
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
import { mockAddresses } from "@/mocks/addresses.mock";
import { mockProducts } from "@/mocks/products.mock";
import { mockStores } from "@/mocks/stores.mock";
import { CardProduct } from "@/pages/Products/CardProduct";
import {
  ProductHeaderFilters,
  type ProductSort,
} from "@/pages/Products/ProductHeaderFilters";
import { ArrowLeftIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

function formatAddress(address: Address) {
  return `${address.street}, ${address.number} - ${address.city}/${address.state}`;
}

export function StoreDetailsPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<ProductQuery>({});
  const [sort, setSort] = useState<ProductSort>("price-asc");
  const storeQuery = useStoreQuery(id);
  const addressesQuery = useAddressesQuery();
  const shouldUseMockStore =
    !storeQuery.isPending && (storeQuery.isError || !storeQuery.data);
  const mockStore = mockStores.find(
    (store) => store.id === id || store.url === id,
  );
  const store = storeQuery.data ?? (shouldUseMockStore ? mockStore : undefined);
  const productsQuery = useProductsQuery(
    store ? { storeId: store.id, ...filters } : undefined,
  );
  const shouldUseMockAddresses =
    !addressesQuery.isPending &&
    (addressesQuery.isError || !addressesQuery.data?.length);
  const addresses = shouldUseMockAddresses
    ? mockAddresses
    : (addressesQuery.data ?? []);
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
  const products = useMemo(() => {
    const storeProducts = store
      ? (
          productsQuery.data ?? (productsQuery.isError ? mockProducts : [])
        ).filter((product) => product.storeId === store.id)
      : [];
    const normalizedTitle = filters.title?.trim().toLocaleLowerCase("pt-BR");

    return storeProducts
      .filter((product) => {
        const matchesTitle =
          !normalizedTitle ||
          product.title.toLocaleLowerCase("pt-BR").includes(normalizedTitle);
        const matchesCategory =
          !filters.categoryId || product.categoryId === filters.categoryId;

        return matchesTitle && matchesCategory;
      })
      .toSorted((productA, productB) => {
        if (sort === "title-asc") {
          return productA.title.localeCompare(productB.title, "pt-BR");
        }

        const priceA = productA.defaultVariant?.price;
        const priceB = productB.defaultVariant?.price;

        if (priceA == null || priceB == null) {
          if (priceA == null && priceB == null) return 0;
          return priceA == null ? 1 : -1;
        }

        return sort === "price-asc" ? priceA - priceB : priceB - priceA;
      });
  }, [
    filters.categoryId,
    filters.title,
    productsQuery.data,
    productsQuery.isError,
    sort,
    store,
  ]);

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

      <section aria-labelledby="store-products-heading" className="space-y-4">
        <ProductHeaderFilters
          title={filters.categoryId || filters.title ? "Resultados" : "Todos"}
          subtitle={`${products.length} produtos encontrados`}
          filters={filters}
          setFilters={setFilters}
          sort={sort}
          setSort={setSort}
        />

        <Separator orientation="horizontal" variant="secondary" />

        {productsQuery.isPending ? (
          <Text>Carregando produtos...</Text>
        ) : productsQuery.isError && !productsQuery.data && !products ? (
          <Text role="status">
            Não foi possível carregar os produtos. Exibindo dados de exemplo.
          </Text>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <CardProduct
                key={product.id}
                baseUrl={`${urls.stores}/${encodeURIComponent(store.id)}/products`}
                product={product}
              />
            ))}
          </div>
        ) : (
          <Text>Esta loja ainda não possui produtos cadastrados.</Text>
        )}
      </section>
    </main>
  );
}
