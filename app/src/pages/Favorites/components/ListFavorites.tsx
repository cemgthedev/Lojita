import { useFavoritesQuery } from "@/api/resources/favorites/queries";
import { useProductsQuery } from "@/api/resources/products/products/queries";
import type { ProductQuery } from "@/api/resources/products/products/validations/query.schema";
import { useVariantsQuery } from "@/api/resources/products/variants/queries";
import { Separator, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { CardProduct } from "@/pages/Products/components/CardProduct";
import {
  ProductHeaderFilters,
  type ProductSort,
} from "@/pages/Products/components/ProductHeaderFilters";
import { useAuth } from "@/providers/AuthProvider";
import { useMemo, useState } from "react";

export function ListFavorites() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<ProductQuery>({});
  const [sort, setSort] = useState<ProductSort>("price-asc");
  const favoritesQuery = useFavoritesQuery(
    { userId: user?.id },
    Boolean(user?.id),
  );
  const favorites = favoritesQuery.data ?? [];
  const variantsQuery = useVariantsQuery(undefined, favorites.length > 0);
  const productsQuery = useProductsQuery(
    undefined,
    favorites.length > 0 && !variantsQuery.isPending,
  );

  const favoriteProducts = useMemo(() => {
    const variants = variantsQuery.data ?? [];
    const products = productsQuery.data ?? [];
    const productsById = new Map(
      products.map((product) => [product.id, product]),
    );
    const variantsById = new Map(
      variants.map((variant) => [variant.id, variant]),
    );

    return (favoritesQuery.data ?? []).flatMap((favorite) => {
      const variant = variantsById.get(favorite.variantId);
      const product = variant && productsById.get(variant.productId);

      return variant && product
        ? [
            {
              variantId: favorite.variantId,
              product: { ...product, defaultVariant: variant },
            },
          ]
        : [];
    });
  }, [favoritesQuery.data, productsQuery.data, variantsQuery.data]);

  const filteredFavorites = useMemo(() => {
    const normalizedTitle = filters.title?.trim().toLocaleLowerCase("pt-BR");

    return favoriteProducts
      .filter(({ product }) => {
        const matchesTitle =
          !normalizedTitle ||
          product.title.toLocaleLowerCase("pt-BR").includes(normalizedTitle);
        const matchesCategory =
          !filters.categoryId || product.categoryId === filters.categoryId;

        return matchesTitle && matchesCategory;
      })
      .toSorted((favoriteA, favoriteB) => {
        if (sort === "title-asc") {
          return favoriteA.product.title.localeCompare(
            favoriteB.product.title,
            "pt-BR",
          );
        }

        const priceA = favoriteA.product.defaultVariant?.price;
        const priceB = favoriteB.product.defaultVariant?.price;

        if (priceA == null || priceB == null) {
          if (priceA == null && priceB == null) return 0;
          return priceA == null ? 1 : -1;
        }

        return sort === "price-asc" ? priceA - priceB : priceB - priceA;
      });
  }, [favoriteProducts, filters.categoryId, filters.title, sort]);

  const isLoading =
    favoritesQuery.isPending ||
    (favorites.length > 0 && variantsQuery.isPending) ||
    (favorites.length > 0 &&
      !variantsQuery.isPending &&
      productsQuery.isPending);

  return (
    <section aria-labelledby="favorites-heading" className="space-y-4">
      <ProductHeaderFilters
        title={filters.categoryId || filters.title ? "Resultados" : "Todos"}
        subtitle={`${filteredFavorites.length} produtos encontrados`}
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />

      <Separator orientation="horizontal" variant="secondary" />

      {isLoading ? (
        <Text>Carregando favoritos...</Text>
      ) : (
        <>
          {favoritesQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar os favoritos. Exibindo dados de
              exemplo.
            </Text>
          )}
          {variantsQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar as variações. Exibindo dados de
              exemplo.
            </Text>
          )}
          {productsQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar os produtos. Exibindo dados de exemplo.
            </Text>
          )}

          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredFavorites.map(({ variantId, product }) => (
                <CardProduct
                  key={variantId}
                  baseUrl={`${urls.customer_dashboard}${urls.products}`}
                  product={product}
                  isFavorite
                />
              ))}
            </div>
          ) : (
            <Text role="status">
              {favoriteProducts.length > 0
                ? "Nenhum favorito corresponde aos filtros selecionados."
                : "Você ainda não tem produtos favoritos."}
            </Text>
          )}
        </>
      )}
    </section>
  );
}