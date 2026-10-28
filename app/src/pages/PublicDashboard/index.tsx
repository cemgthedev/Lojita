import { useCategoriesQuery } from "@/api/resources/categories/queries";
import { useStoresQuery } from "@/api/resources/stores/queries";
import {
  Heading,
  Image,
  ImageContent,
  Input,
  Label,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { CardCategory } from "@/pages/Categories/components/CardCategory";
import { ListProducts } from "@/pages/Products/components/ListProducts";
import { CardStore } from "@/pages/Stores/components/CardStore";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

export function PublicDashboard() {
  const [categorySearch, setCategorySearch] = useState("");
  const categoriesQuery = useCategoriesQuery();
  const storesQuery = useStoresQuery({ status: "active" });
  const search = categorySearch.trim().toLocaleLowerCase("pt-BR");

  const categories = useMemo(
    () =>
      (categoriesQuery.data ?? []).filter((category) =>
        category.title.toLocaleLowerCase("pt-BR").includes(search),
      ),
    [categoriesQuery.data, search],
  );
  const stores = storesQuery.data ?? [];

  return (
    <main className="space-y-10 pb-10">
      <Image className="h-64 w-full rounded-none">
        <ImageContent
          src="/banner.svg"
          alt="Descubra produtos e lojas na Lojita"
        />
      </Image>

      <section
        aria-labelledby="public-categories-heading"
        className="space-y-4 px-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <Label id="public-categories-heading">Pesquise por categoria</Label>
            <Text>Encontre rapidamente o que você está procurando.</Text>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <SearchIcon
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input
              type="search"
              value={categorySearch}
              onChange={(event) => setCategorySearch(event.target.value)}
              placeholder="Buscar categoria..."
              aria-label="Buscar categoria"
              className="pl-10"
            />
          </div>
        </div>

        {categoriesQuery.isPending ? (
          <Text role="status">Carregando categorias...</Text>
        ) : (
          <>
            {categoriesQuery.isError && (
              <Text role="alert" className="animate-pulse-once">
                Não foi possível atualizar as categorias. Exibindo os dados
                disponíveis.
              </Text>
            )}
            {categories.length === 0 ? (
              <div className="rounded-lg border border-secondary-600 p-8 text-center">
                <Text>
                  {search
                    ? "Nenhuma categoria corresponde à sua busca."
                    : "Nenhuma categoria disponível no momento."}
                </Text>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {categories.map((category) => (
                  <CardCategory
                    key={category.id}
                    baseUrl={`${urls.products}?categoryId=`}
                    category={category}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <section
        aria-labelledby="public-stores-heading"
        className="space-y-4 px-6"
      >
        <header className="space-y-1">
          <Label id="public-stores-heading">Lojas</Label>
          <Text>Conheça lojas ativas e encontre novas marcas.</Text>
        </header>
        {storesQuery.isPending ? (
          <Text role="status">Carregando lojas...</Text>
        ) : (
          <>
            {storesQuery.isError && (
              <Text role="alert" className="animate-pulse-once">
                Não foi possível atualizar as lojas. Exibindo os dados
                disponíveis.
              </Text>
            )}
            {stores.length === 0 ? (
              <div className="rounded-lg border border-secondary-600 p-8 text-center">
                <Text>Nenhuma loja ativa encontrada.</Text>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stores.map((store) => (
                  <CardStore key={store.id} store={store} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <section
        aria-labelledby="public-products-heading"
        className="space-y-4 px-6"
      >
        <header className="space-y-1">
          <Heading id="public-products-heading" size="sm">
            Produtos
          </Heading>
          <Text>Explore os produtos disponíveis na Lojita.</Text>
        </header>
        <ListProducts />
      </section>
    </main>
  );
}
