import { useCategoriesQuery } from "@/api/resources/categories/queries";
import type { CategoryQuery } from "@/api/resources/categories/validations/query.schema";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import { Separator, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { useHighestRole } from "@/hooks/useHighestRole";
import { CardCategory } from "@/pages/Categories/components/CardCategory";
import { CategoryHeaderFilters } from "@/pages/Categories/components/CategoryHeaderFilters";
import { useAuth } from "@/providers/AuthProvider";
import { useStoresQuery } from "@/api/resources/stores/queries";
import { useMemo, useState } from "react";

export function ListCategory() {
  const { user } = useAuth();
  const role = useHighestRole(user?.role ?? []);
  const isSeller = role === ROLE.SELLER;
  const [filters, setFilters] = useState<CategoryQuery>({});
  const ownStoresQuery = useStoresQuery({ userId: user?.id }, isSeller);
  const storeId = isSeller
    ? ownStoresQuery.data?.find((store) => store.userId === user?.id)?.id
    : undefined;
  const categoriesQuery = useCategoriesQuery();
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

  const categories = useMemo(() => {
    const normalizedTitle = filters.title?.trim().toLocaleLowerCase("pt-BR");

    return (categoriesQuery.data ?? []).filter(
      (category) =>
        !normalizedTitle ||
        category.title.toLocaleLowerCase("pt-BR").includes(normalizedTitle),
    );
  }, [categoriesQuery.data, filters.title]);

  return (
    <section aria-label="Lista de categorias" className="space-y-4">
      <CategoryHeaderFilters
        title={filters.title ? "Resultados" : "Todas as categorias"}
        subtitle={`${categories.length} categorias encontradas`}
        filters={filters}
        setFilters={setFilters}
      />
      <Separator orientation="horizontal" variant="secondary" />

      {isSeller && ownStoresQuery.isPending ? (
        <Text>Carregando categorias...</Text>
      ) : isSeller && !storeId ? (
        <Text role="status">
          Não foi encontrada uma loja vinculada a este usuário.
        </Text>
      ) : categoriesQuery.isPending ? (
        <Text>Carregando categorias...</Text>
      ) : (
        <>
          {ownStoresQuery.isError && isSeller && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar a loja vinculada a este usuário.
              {storeId && " Exibindo dados de exemplo."}
            </Text>
          )}
          {categoriesQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar as categorias. Exibindo dados de
              exemplo.
            </Text>
          )}
          {categories.length === 0 ? (
            <div className="rounded-lg border border-secondary-600 p-8 text-center">
              <Text>Nenhuma categoria encontrada.</Text>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => (
                <CardCategory
                  key={category.id}
                  baseUrl={`${managementBaseUrl}${urls.categories}`}
                  category={category}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
