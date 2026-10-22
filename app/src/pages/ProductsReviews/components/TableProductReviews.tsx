import { useCategoriesQuery } from "@/api/resources/categories/queries";
import { productReviewsKeys } from "@/api/resources/product-reviews/keys";
import { useUpdateProductReviewMutation } from "@/api/resources/product-reviews/mutations";
import { productReviewsService } from "@/api/resources/product-reviews/services";
import type { ProductReview } from "@/api/resources/product-reviews/validations/product-review.schema";
import { mockProductReviews } from "@/api/resources/products/products.mock";
import { useProductsQuery } from "@/api/resources/products/products/queries";
import {
  filterMockData,
  withMockArrayFallback,
} from "@/api/resources/query-fallback";
import { useStoresQuery } from "@/api/resources/stores/queries";
import { useUsersQuery } from "@/api/resources/users/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
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
import { toast } from "@/components/ui/toast";
import { useHighestRole } from "@/hooks/useHighestRole";
import { ProductReviewsHeaderFilters } from "@/pages/ProductsReviews/components/ProductReviewsHeaderFilters";
import { productReviewStatusLabel } from "@/pages/ProductsReviews/components/productReviewStatusLabel";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { useQueries } from "@tanstack/react-query";
import { EllipsisIcon, EyeIcon, StarIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useMemo, useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const emptyReviews: ProductReview[] = [];

function formatDate(date: string) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "Data indisponível"
    : dateFormatter.format(parsedDate);
}

function statusVariant(status: string) {
  if (["active", "visible", "published"].includes(status))
    return "success-ghost";
  if (status === "hide_requested") return "warning-ghost";
  if (status === "hidden") return "danger-ghost";
  return "muted";
}

function ReviewRating({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-1"
      aria-label={`${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon
          key={index}
          aria-hidden="true"
          size={16}
          className={
            index < rating
              ? "fill-warning-500 text-warning-500"
              : "text-muted-400"
          }
        />
      ))}
    </span>
  );
}

export function TableProductReviews() {
  const { user } = useRequiredAuth();
  const role = useHighestRole(user.role);
  const isSeller = role === ROLE.SELLER;
  const canModerate = role === ROLE.ADMIN || role === ROLE.SUPPORT;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedReview, setSelectedReview] = useState<ProductReview | null>(
    null,
  );

  const storesQuery = useStoresQuery({ userId: user.id }, isSeller);
  const storeId = storesQuery.data?.find(
    (store) => store.userId === user.id,
  )?.id;
  const productsQuery = useProductsQuery(
    isSeller && storeId ? { storeId } : undefined,
    !isSeller || (!storesQuery.isPending && Boolean(storeId)),
  );
  const sellerProducts = useMemo(
    () =>
      isSeller
        ? (productsQuery.data ?? []).filter(
            (product) => product.storeId === storeId,
          )
        : [],
    [isSeller, productsQuery.data, storeId],
  );

  const reviewQueries = useQueries({
    queries: isSeller
      ? sellerProducts.map((product) => {
          const query = { productId: product.id };
          return {
            queryKey: productReviewsKeys.list(query),
            queryFn: () => productReviewsService.list(query),
          };
        })
      : [
          {
            queryKey: productReviewsKeys.list(),
            queryFn: () => productReviewsService.list(),
          },
        ],
  });

  const reviews = useMemo(() => {
    if (isSeller) {
      return reviewQueries.flatMap((query, index) => {
        const productId = sellerProducts[index]?.id;
        const fallback = filterMockData(
          mockProductReviews,
          productId ? { productId } : {},
        );
        return withMockArrayFallback(query, fallback).data ?? emptyReviews;
      });
    }

    return (
      withMockArrayFallback(reviewQueries[0], mockProductReviews).data ??
      emptyReviews
    );
  }, [isSeller, reviewQueries, sellerProducts]);

  const categoriesQuery = useCategoriesQuery();
  const usersQuery = useUsersQuery();
  const userById = useMemo(
    () =>
      new Map(
        (usersQuery.data ?? []).map((reviewUser) => [
          reviewUser.id,
          reviewUser,
        ]),
      ),
    [usersQuery.data],
  );
  const productById = useMemo(
    () =>
      new Map(
        (productsQuery.data ?? []).map((product) => [product.id, product]),
      ),
    [productsQuery.data],
  );
  const categoryById = useMemo(
    () =>
      new Map(
        (categoriesQuery.data ?? []).map((category) => [category.id, category]),
      ),
    [categoriesQuery.data],
  );
  const statusOptions = useMemo(
    () => [...new Set(reviews.map((review) => review.status))].toSorted(),
    [reviews],
  );

  const visibleReviews = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");

    return reviews
      .filter((review) => {
        if (statusFilter !== "all" && review.status !== statusFilter) {
          return false;
        }
        if (!normalizedSearch) return true;

        const customerName = userById.get(review.userId)?.name ?? "";
        const productTitle = productById.get(review.productId)?.title ?? "";
        return [customerName, productTitle].some((value) =>
          value.toLocaleLowerCase("pt-BR").includes(normalizedSearch),
        );
      })
      .toSorted((reviewA, reviewB) => {
        const dateDifference =
          Date.parse(reviewB.createdAt) - Date.parse(reviewA.createdAt);
        return sortOrder === "newest" ? dateDifference : -dateDifference;
      });
  }, [productById, reviews, search, sortOrder, statusFilter, userById]);

  const updateReviewMutation = useUpdateProductReviewMutation();
  const isLoading =
    categoriesQuery.isPending ||
    usersQuery.isPending ||
    (!isSeller && productsQuery.isPending) ||
    (isSeller &&
      (storesQuery.isPending ||
        (Boolean(storeId) && productsQuery.isPending))) ||
    reviewQueries.some((query) => query.isPending);
  const hasLoadError =
    (isSeller && (storesQuery.isError || productsQuery.isError)) ||
    reviewQueries.some((query) => query.isError);

  async function updateReviewStatus(
    review: ProductReview,
    status: "hide_requested" | "hidden" | "published",
  ) {
    try {
      await updateReviewMutation.mutateAsync({ id: review.id, status });
      toast(
        status === "hide_requested"
          ? "Solicitação de ocultação registrada."
          : status === "hidden"
            ? "Avaliação ocultada."
            : "Avaliação publicada.",
        { variant: "success" },
      );
    } catch {
      toast("Não foi possível atualizar a avaliação.", {
        variant: "danger",
      });
    }
  }

  function nextStatus(review: ProductReview) {
    if (isSeller) {
      return review.status === "hide_requested" || review.status === "hidden"
        ? undefined
        : "hide_requested";
    }
    if (canModerate) {
      return review.status === "hidden" ? "published" : "hidden";
    }
    return undefined;
  }

  return (
    <section
      aria-labelledby="product-reviews-management-heading"
      className="space-y-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <ProductReviewsHeaderFilters
          title="Avaliações de produtos"
          subtitle={`${visibleReviews.length} ${
            visibleReviews.length === 1
              ? "avaliação encontrada"
              : "avaliações encontradas"
          }`}
          searchName={search}
          onSearchNameChange={setSearch}
          searchPlaceholder="Cliente ou produto"
          searchAriaLabel="Buscar avaliações por cliente ou produto"
          searchFilterLabel="Busca"
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          onRatingFilterChange={() => undefined}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          statusOptions={statusOptions}
          showStatusFilter
          onClearFilters={() => {
            setSearch("");
            setStatusFilter("all");
          }}
        />
      </div>
      <Separator orientation="horizontal" variant="secondary" />

      {isSeller && storesQuery.isError && (
        <Text role="status" className="animate-pulse-once">
          Não foi possível carregar a loja vinculada a este usuário.
        </Text>
      )}
      {isSeller && !storesQuery.isPending && !storeId && (
        <Text role="status" className="animate-pulse-once">
          Não foi encontrada uma loja vinculada a este usuário.
        </Text>
      )}
      {isLoading ? (
        <Text role="status">Carregando avaliações...</Text>
      ) : (
        <>
          {hasLoadError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar todos os dados. Exibindo os dados
              disponíveis.
            </Text>
          )}
          {usersQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar os nomes dos clientes.
            </Text>
          )}
          {productsQuery.isError && !isSeller && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar os nomes dos produtos.
            </Text>
          )}
          {categoriesQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar as categorias. Exibindo dados
              disponíveis.
            </Text>
          )}
          <div className="overflow-x-auto rounded-lg border border-secondary-600 p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Label size="xs">Cliente</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Produto</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Data</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Status</Label>
                  </TableHead>
                  <TableHead className="text-right">
                    <Label size="xs">Ações</Label>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleReviews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center">
                      <Text>Nenhuma avaliação encontrada.</Text>
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleReviews.map((review) => {
                    const customer = userById.get(review.userId);
                    const product = productById.get(review.productId);
                    const actionStatus = nextStatus(review);

                    return (
                      <TableRow key={review.id}>
                        <TableCell>
                          <div className="flex min-w-56 items-center gap-3">
                            <Image
                              size="sm"
                              rounded="full"
                              aria-label={`Imagem de ${customer?.name}`}
                            >
                              <ImageContent
                                src={customer?.avatarUrl ?? undefined}
                                alt={customer?.name}
                              />
                              <ImageFallback variant="muted">
                                <Text size="xs">Sem imagem</Text>
                              </ImageFallback>
                            </Image>
                            <div className="min-w-0">
                              <Text>
                                {customer?.name ?? "Nome não definido"}
                              </Text>
                              <Text size="sm" variant="secondary">
                                {customer?.email ?? "Categoria não encontrada"}
                              </Text>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex min-w-56 items-center gap-3">
                            <Image
                              size="sm"
                              rounded="full"
                              aria-label={`Imagem de ${product?.title}`}
                            >
                              <ImageContent
                                src={
                                  product?.defaultVariant?.urlImage ?? undefined
                                }
                                alt={product?.title}
                              />
                              <ImageFallback variant="muted">
                                <Text size="xs">Sem imagem</Text>
                              </ImageFallback>
                            </Image>
                            <div className="min-w-0">
                              <Text>
                                {product?.title ?? "Nome não definido"}
                              </Text>
                              <Text size="sm" variant="secondary">
                                {categoryById.get(product?.categoryId ?? "")
                                  ?.title ?? "Categoria não encontrada"}
                              </Text>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Text className="whitespace-nowrap">
                            {formatDate(review.createdAt)}
                          </Text>
                        </TableCell>
                        <TableCell>
                          <Badge
                            size="xs"
                            rounded="full"
                            variant={statusVariant(review.status)}
                          >
                            {productReviewStatusLabel(review.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  type="button"
                                  variant="secondary-ghost"
                                  size="sm"
                                  aria-label={`Ações para avaliação de ${customer?.name ?? "cliente"}`}
                                >
                                  <EllipsisIcon aria-hidden="true" size={18} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() => setSelectedReview(review)}
                                >
                                  <EyeIcon aria-hidden="true" />
                                  Ver avaliação
                                </DropdownMenuItem>
                                {actionStatus && (
                                  <DropdownMenuItem
                                    disabled={updateReviewMutation.isPending}
                                    variant={
                                      actionStatus === "published"
                                        ? "default"
                                        : "danger"
                                    }
                                    onSelect={() =>
                                      void updateReviewStatus(
                                        review,
                                        actionStatus,
                                      )
                                    }
                                  >
                                    {actionStatus === "hide_requested"
                                      ? "Solicitar ocultação"
                                      : actionStatus === "hidden"
                                        ? "Ocultar avaliação"
                                        : "Publicar avaliação"}
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      <Dialog
        open={selectedReview !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedReview(null);
        }}
      >
        <DialogContent>
          {selectedReview && (
            <>
              <DialogHeader>
                <DialogPrimitive.Title className="text-lg font-semibold">
                  Avaliação do produto
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="text-sm text-muted-foreground">
                  {productById.get(selectedReview.productId)?.title ??
                    "Produto não identificado"}
                </DialogPrimitive.Description>
              </DialogHeader>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Text>
                    {userById.get(selectedReview.userId)?.name ??
                      "Cliente não identificado"}
                  </Text>
                  <ReviewRating rating={selectedReview.rating} />
                </div>
                <Text size="sm" variant="secondary">
                  {formatDate(selectedReview.createdAt)} ·{" "}
                  {productReviewStatusLabel(selectedReview.status)}
                </Text>
                <Text className="whitespace-pre-wrap">
                  {selectedReview.comment}
                </Text>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
