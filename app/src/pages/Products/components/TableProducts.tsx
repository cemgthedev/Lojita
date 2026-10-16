import { useCategoriesQuery } from "@/api/resources/categories/queries";
import { useDeleteProductMutation } from "@/api/resources/products/products/mutations";
import { useProductsQuery } from "@/api/resources/products/products/queries";
import type { ProductQuery } from "@/api/resources/products/products/validations/query.schema";
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
import {
  ProductHeaderFilters,
  type ProductSort,
} from "@/pages/Products/components/ProductHeaderFilters";
import { useRequiredAuth } from "@/providers/AuthProvider";
import {
  EllipsisIcon,
  ExternalLinkIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function TableProducts() {
  const { user } = useRequiredAuth();
  const role = useHighestRole(user.role);
  const isSeller = role === ROLE.SELLER;
  const [filters, setFilters] = useState<ProductQuery>({});
  const [sort, setSort] = useState<ProductSort>("price-asc");
  const ownStoresQuery = useStoresQuery({ userId: user.id }, isSeller);
  const storeId = isSeller
    ? ownStoresQuery.data?.find((store) => store.userId === user.id)?.id
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

          <div className="border border-secondary-600 rounded-lg p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Label size="xs">Produto</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Preços</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Estoque</Label>
                  </TableHead>
                  <TableHead className="text-right">
                    <Label size="xs">Ações</Label>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length > 0 &&
                  products.map((product) => {
                    const category = categories.find(
                      (item) => item.id === product.categoryId,
                    );

                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex min-w-56 items-center gap-3">
                            <Image
                              size="sm"
                              rounded="md"
                              aria-label={`Imagem de ${product.title}`}
                            >
                              <ImageContent
                                src={
                                  product.defaultVariant?.urlImage ?? undefined
                                }
                                alt={product.title}
                              />
                              <ImageFallback variant="muted">
                                <Text size="xs">Sem imagem</Text>
                              </ImageFallback>
                            </Image>
                            <div className="min-w-0">
                              <Text>{product.title}</Text>
                              <Text size="sm" variant="secondary">
                                {category?.title ?? "Categoria não encontrada"}
                              </Text>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Text>
                            {product.defaultVariant?.price == null
                              ? "Preço indisponível"
                              : currencyFormatter.format(
                                  product.defaultVariant.price,
                                )}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Text>
                            {product.defaultVariant?.stock ?? "Indisponível"}
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
                                  aria-label={`Ações para ${product.title}`}
                                >
                                  <EllipsisIcon size={18} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link
                                    to={`${managementBaseUrl}${urls.products}/${encodeURIComponent(product.id)}`}
                                  >
                                    <ExternalLinkIcon />
                                    Visualizar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link
                                    to={`${managementBaseUrl}${urls.products}/${encodeURIComponent(product.id)}${urls.update}`}
                                  >
                                    <PencilIcon />
                                    Atualizar
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  variant="danger"
                                  disabled={deleteProductMutation.isPending}
                                  onSelect={(event) => {
                                    if (
                                      !window.confirm(
                                        `Deseja apagar o produto "${product.title}"?`,
                                      )
                                    ) {
                                      event.preventDefault();
                                      return;
                                    }

                                    deleteProductMutation.mutate(product.id);
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
                    );
                  })}
                {products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center">
                      <Text>Nenhum produto encontrado.</Text>
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
