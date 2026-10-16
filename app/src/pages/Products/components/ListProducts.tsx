import { useProductsQuery } from "@/api/resources/products/products/queries";
import type { ProductQuery } from "@/api/resources/products/products/validations/query.schema";
import { Separator, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { CardProduct } from "@/pages/Products/components/CardProduct";
import {
  ProductHeaderFilters,
  type ProductSort,
} from "@/pages/Products/components/ProductHeaderFilters";
import { useMemo, useState } from "react";

export type ListProductsProps = {
  storeId: string;
};

export function ListProducts({ storeId }: ListProductsProps) {
  const [filters, setFilters] = useState<ProductQuery>({});
  const [sort, setSort] = useState<ProductSort>("price-asc");
  const productsQuery = useProductsQuery({ storeId, ...filters });

  const products = useMemo(() => {
    const storeProducts = (productsQuery.data ?? []).filter(
      (product) => product.storeId === storeId,
    );
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
    sort,
    storeId,
  ]);

  return (
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
      ) : (
        <>
          {productsQuery.isError && (
            <Text role="status">
              Não foi possível carregar os produtos. Exibindo dados de exemplo.
            </Text>
          )}

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  baseUrl={`${urls.stores}/${encodeURIComponent(storeId)}/products`}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <Text>Esta loja ainda não possui produtos cadastrados.</Text>
          )}
        </>
      )}
    </section>
  );
}
