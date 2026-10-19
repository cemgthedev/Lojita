import { useDeleteCategoryMutation } from "@/api/resources/categories/mutations";
import { useCategoriesQuery } from "@/api/resources/categories/queries";
import type { CategoryQuery } from "@/api/resources/categories/validations/query.schema";
import { useStoresQuery } from "@/api/resources/stores/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Image,
  ImageContent,
  ImageFallback,
  Label,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { useHighestRole } from "@/hooks/useHighestRole";
import { CategoryHeaderFilters } from "@/pages/Categories/components/CategoryHeaderFilters";
import { useRequiredAuth } from "@/providers/AuthProvider";
import {
  EllipsisIcon,
  ExternalLinkIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

export function TableCategories() {
  const { user } = useRequiredAuth();
  const role = useHighestRole(user.role);
  const isSeller = role === ROLE.SELLER;
  const [filters, setFilters] = useState<CategoryQuery>({});
  const ownStoresQuery = useStoresQuery({ userId: user.id }, isSeller);
  const storeId = isSeller
    ? ownStoresQuery.data?.find((store) => store.userId === user.id)?.id
    : undefined;
  const categoriesQuery = useCategoriesQuery();
  const deleteCategoryMutation = useDeleteCategoryMutation();
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
    <section
      aria-labelledby="categories-management-heading"
      className="space-y-4"
    >
      <CategoryHeaderFilters
        title={filters.title ? "Resultados" : "Todas"}
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
          {deleteCategoryMutation.isError && (
            <Text role="alert" className="animate-pulse-once">
              Não foi possível apagar a categoria. Tente novamente.
            </Text>
          )}
          <div className="overflow-x-auto rounded-lg border border-secondary-600 p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Label size="xs">Categoria</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Descrição</Label>
                  </TableHead>
                  <TableHead className="text-right">
                    <Label size="xs">Ações</Label>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex min-w-48 items-center gap-3">
                        <Image
                          size="sm"
                          rounded="md"
                          aria-label={`Imagem da categoria ${category.title}`}
                        >
                          <ImageContent
                            src={category.imageUrl ?? undefined}
                            alt={category.title}
                          />
                          <ImageFallback variant="muted">
                            <Text size="xs">Sem imagem</Text>
                          </ImageFallback>
                        </Image>
                        <Text>{category.title}</Text>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Text>
                        {category.description || "Sem descrição disponível."}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="secondary-ghost"
                              size="sm"
                              aria-label={`Ações para ${category.title}`}
                            >
                              <EllipsisIcon size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                to={`${managementBaseUrl}${urls.categories}/${encodeURIComponent(category.id)}`}
                              >
                                <ExternalLinkIcon />
                                Visualizar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                to={`${managementBaseUrl}${urls.categories}/${encodeURIComponent(category.id)}${urls.update}`}
                              >
                                <PencilIcon />
                                Atualizar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="danger"
                              disabled={deleteCategoryMutation.isPending}
                              onSelect={(event) => {
                                if (
                                  !window.confirm(
                                    `Deseja apagar a categoria "${category.title}"?`,
                                  )
                                ) {
                                  event.preventDefault();
                                  return;
                                }

                                deleteCategoryMutation.mutate(category.id);
                              }}
                            >
                              <Trash2Icon />
                              Apagar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="py-8 text-center">
                      <Text>Nenhuma categoria encontrada.</Text>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </section>
  );
}
