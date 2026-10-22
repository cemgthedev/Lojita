import { useCategoriesQuery } from "@/api/resources/categories/queries";
import { useDeleteProductMutation } from "@/api/resources/products/products/mutations";
import { useProductsQuery } from "@/api/resources/products/products/queries";
import type { ProductQuery } from "@/api/resources/products/products/validations/query.schema";
import { useStoresQuery } from "@/api/resources/stores/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import { Separator, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { useHighestRole } from "@/hooks/useHighestRole";
import { CardProduct } from "@/pages/Products/components/CardProduct";
import {
  ProductHeaderFilters,
  type ProductSort,
} from "@/pages/Products/components/ProductHeaderFilters";
import { useAuth } from "@/providers/AuthProvider";
import { useMemo, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function ListProducts() {
  const { user } = useAuth();
  const role = useHighestRole(user?.role ?? []);
  const isSeller = role === ROLE.SELLER;
  const [filters, setFilters] = useState<ProductQuery>({});
  const [sort, setSort] = useState<ProductSort>("price-asc");
  const ownStoresQuery = useStoresQuery({ userId: user?.id }, isSeller);
  const storeId = isSeller
    ? ownStoresQuery.data?.find((store) => store.userId === user?.id)?.id
    : undefined;
  const productsQuery = useProductsQuery(
    { ...filters, ...(storeId ? { storeId } : {}) },
    !isSeller || (!ownStoresQuery.isPending && Boolean(storeId)),
  );
  const categoriesQuery = useCategoriesQuery();
  const categories = categoriesQuery.data ?? [];
  const deleteProductMutation = useDeleteProductMutation();
  const managementBaseUrl =
    role === ROLE.ADMIN
      ? urls.admin_dashboard
      : role === ROLE.SUPPORT
        ? urls.support_dashboard
        : role === ROLE.SELLER
          ? urls.seller_dashboard
          : role === ROLE.CUSTOMER
            ? urls.customer_dashboard
            : "";

  const products = useMemo(() => {
    const storeProducts = (productsQuery.data ?? []).filter(
      (product) => !storeId || product.storeId === storeId,
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
  }, [filters.categoryId, filters.title, productsQuery.data, sort, storeId]);

  return (
    <section
      aria-labelledby="products-management-heading"
      className="space-y-4"
    >
      <ProductHeaderFilters
        title={filters.categoryId || filters.title ? "Resultados" : "Todos"}
        subtitle={`${products.length} produtos encontrados`}
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
      />

      <Separator orientation="horizontal" variant="secondary" />

      {isSeller && ownStoresQuery.isPending ? (
        <Text>Carregando produtos...</Text>
      ) : isSeller && !storeId ? (
        <Text role="status">
          Não foi encontrada uma loja vinculada a este usuário.
        </Text>
      ) : productsQuery.isPending ? (
        <Text>Carregando produtos...</Text>
      ) : (
        <>
          {ownStoresQuery.isError && isSeller && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar a loja vinculada a este usuário.
              {storeId && " Exibindo dados de exemplo."}
            </Text>
          )}
          {productsQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar os produtos. Exibindo dados de exemplo.
            </Text>
          )}
          {categoriesQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar as categorias. Exibindo dados de
              exemplo.
            </Text>
          )}

          {products.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  baseUrl={`${managementBaseUrl}${urls.products}`}
                  product={product}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
