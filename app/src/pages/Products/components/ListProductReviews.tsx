import { useUpdateProductReviewMutation } from "@/api/resources/product-reviews/mutations";
import { useProductReviewsQuery } from "@/api/resources/product-reviews/queries";
import type { ProductReview } from "@/api/resources/product-reviews/validations/product-review.schema";
import { useUsersQuery } from "@/api/resources/users/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import {
  Button,
  InputGroup,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { useHighestRole } from "@/hooks/useHighestRole";
import { ProductReviewsHeaderFilters } from "@/pages/Products/components/ProductReviewsHeaderFilters";
import { productReviewStatusLabel } from "@/pages/Products/components/productReviewStatusLabel";
import { useAuth } from "@/providers/AuthProvider";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-react";
import { useMemo, useState } from "react";

const pageSize = 5;
const emptyReviews: ProductReview[] = [];

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(date: string) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "Data indisponível"
    : dateFormatter.format(parsedDate);
}

function ReviewStars({ rating }: { rating: number }) {
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

export function ListProductReviews({ productId }: { productId: string }) {
  const { isAuthenticated, user } = useAuth();
  const role = useHighestRole(user?.role ?? []);
  const isCustomer = !isAuthenticated || role === ROLE.CUSTOMER;
  const isSeller = role === ROLE.SELLER;
  const canManage = role === ROLE.ADMIN || role === ROLE.SUPPORT;
  const [searchName, setSearchName] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | undefined>();
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [requestedPage, setRequestedPage] = useState(1);

  const reviewsQuery = useProductReviewsQuery({ productId });
  const usersQuery = useUsersQuery();
  const updateReviewMutation = useUpdateProductReviewMutation();
  const reviews = reviewsQuery.data ?? emptyReviews;
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
  const statusOptions = [
    ...new Set(reviews.map((review) => review.status)),
  ].toSorted();

  const filteredReviews = useMemo(() => {
    const normalizedName = searchName.trim().toLocaleLowerCase("pt-BR");

    return reviews
      .filter((review) => {
        if (
          isCustomer &&
          (review.status === "hidden" || review.status === "hide_requested")
        ) {
          return false;
        }
        if (ratingFilter && review.rating !== ratingFilter) return false;
        if (statusFilter !== "all" && review.status !== statusFilter) {
          return false;
        }
        if (!normalizedName) return true;
        return (userById.get(review.userId)?.name ?? "")
          .toLocaleLowerCase("pt-BR")
          .includes(normalizedName);
      })
      .toSorted((reviewA, reviewB) =>
        sortOrder === "newest"
          ? Date.parse(reviewB.createdAt) - Date.parse(reviewA.createdAt)
          : Date.parse(reviewA.createdAt) - Date.parse(reviewB.createdAt),
      );
  }, [
    isCustomer,
    ratingFilter,
    reviews,
    searchName,
    sortOrder,
    statusFilter,
    userById,
  ]);

  const pageCount = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const page = Math.min(requestedPage, pageCount);
  const visibleReviews = filteredReviews.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function clearFilters() {
    setSearchName("");
    setRatingFilter(undefined);
    setStatusFilter("all");
    setRequestedPage(1);
  }

  async function updateReviewStatus(
    review: ProductReview,
    status: "hide_requested" | "hidden",
  ) {
    try {
      await updateReviewMutation.mutateAsync({ id: review.id, status });
      toast(
        status === "hidden"
          ? "Avaliação ocultada."
          : "Solicitação de ocultação registrada.",
        { variant: "success" },
      );
    } catch {
      toast("Não foi possível atualizar a avaliação.", {
        variant: "danger",
      });
    }
  }

  function notificationHref(review: ProductReview) {
    const reviewUser = userById.get(review.userId);
    if (!reviewUser?.email) return undefined;

    const subject = encodeURIComponent("Sobre sua avaliação de produto");
    const body = encodeURIComponent(
      `Olá ${reviewUser.name},\n\nEntramos em contato sobre sua avaliação do produto:\n\n"${review.comment}"`,
    );
    return `mailto:${encodeURIComponent(reviewUser.email)}?subject=${subject}&body=${body}`;
  }

  return (
    <section aria-labelledby="product-reviews-heading" className="space-y-5">
      <ProductReviewsHeaderFilters
        title="Avaliações"
        subtitle={`${filteredReviews.length} ${
          filteredReviews.length === 1
            ? "avaliação encontrada"
            : "avaliações encontradas"
        }`}
        searchName={searchName}
        onSearchNameChange={(value) => {
          setSearchName(value);
          setRequestedPage(1);
        }}
        ratingFilter={ratingFilter}
        onRatingFilterChange={(rating) => {
          setRatingFilter(rating);
          setRequestedPage(1);
        }}
        statusFilter={statusFilter}
        onStatusFilterChange={(status) => {
          setStatusFilter(status);
          setRequestedPage(1);
        }}
        statusOptions={statusOptions}
        showStatusFilter={!isCustomer}
        onClearFilters={clearFilters}
      />

      <Separator variant={"secondary"} />

      <div
        role="group"
        aria-label="Filtrar avaliações por nota"
        className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-1"
      >
        <Button
          type="button"
          size="sm"
          rounded={"full"}
          variant={
            ratingFilter === undefined ? "warning-ghost" : "warning-bordered"
          }
          aria-pressed={ratingFilter === undefined}
          onClick={() => {
            setRatingFilter(undefined);
            setRequestedPage(1);
          }}
          className="shrink-0"
        >
          Todas
        </Button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <Button
            key={rating}
            size="sm"
            type="button"
            rounded={"full"}
            variant={
              ratingFilter === rating ? "warning-ghost" : "warning-bordered"
            }
            aria-pressed={ratingFilter === rating}
            onClick={() => {
              setRatingFilter(rating);
              setRequestedPage(1);
            }}
            className="min-w-16 shrink-0"
          >
            <StarIcon aria-hidden="true" size={15} />
            {rating}
          </Button>
        ))}
        <InputGroup className="w-70 flex shrink-0 items-center gap-2 border-none">
          <Text className="whitespace-nowrap">Ordenar por</Text>
          <Select
            value={sortOrder}
            onValueChange={(value) =>
              setSortOrder(value === "oldest" ? "oldest" : "newest")
            }
          >
            <SelectTrigger
              aria-label="Ordenar avaliações"
              className="w-48 rounded-full"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigas</SelectItem>
            </SelectContent>
          </Select>
        </InputGroup>
      </div>

      {reviewsQuery.isPending ? (
        <Text role="status">Carregando avaliações...</Text>
      ) : !reviewsQuery.isError ? (
        <Text role="alert">Não foi possível carregar as avaliações.</Text>
      ) : (
        <>
          {visibleReviews.length === 0 ? (
            <div className="rounded-lg border border-secondary-600 p-6 text-center">
              <Text>Nenhuma avaliação encontrada.</Text>
            </div>
          ) : (
            <ul>
              {visibleReviews.map((review) => {
                const reviewUser = userById.get(review.userId);
                const mailto = notificationHref(review);

                return (
                  <li
                    key={review.id}
                    className="space-y-3 py-5 border border-secondary-600 rounded-lg p-3"
                  >
                    <article className="space-y-2">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <Label>
                            {reviewUser?.name ?? "Usuário não identificado"}
                          </Label>
                          <Text size="sm">
                            {formatDate(review.createdAt)}
                            {!isCustomer &&
                              ` · ${productReviewStatusLabel(review.status)}`}
                          </Text>
                        </div>
                        <ReviewStars rating={review.rating} />
                      </div>
                      <Text className="whitespace-pre-wrap">
                        {review.comment}
                      </Text>
                    </article>

                    {(isSeller || canManage) && (
                      <div className="flex flex-wrap gap-2">
                        {isSeller && (
                          <Button
                            type="button"
                            rounded={"full"}
                            size="sm"
                            variant="danger-bordered"
                            disabled={
                              review.status === "hide_requested" ||
                              updateReviewMutation.isPending
                            }
                            onClick={() =>
                              updateReviewStatus(review, "hide_requested")
                            }
                          >
                            Solicitar ocultação
                          </Button>
                        )}
                        {canManage && (
                          <Button
                            type="button"
                            rounded={"full"}
                            size="sm"
                            variant="danger-bordered"
                            disabled={
                              review.status === "hidden" ||
                              updateReviewMutation.isPending
                            }
                            onClick={() => updateReviewStatus(review, "hidden")}
                          >
                            Ocultar avaliação
                          </Button>
                        )}
                        {mailto ? (
                          <Button
                            rounded={"full"}
                            size="sm"
                            variant="secondary-ghost"
                          >
                            <a href={mailto}>Enviar notificação por e-mail</a>
                          </Button>
                        ) : (
                          <Text size="sm" variant="secondary">
                            E-mail do usuário indisponível para notificação.
                          </Text>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          {filteredReviews.length > pageSize && (
            <nav
              aria-label="Paginação das avaliações"
              className="flex items-center justify-center gap-3"
            >
              <Button
                type="button"
                variant="secondary-bordered"
                size="sm"
                aria-label="Página anterior"
                disabled={page === 1}
                onClick={() =>
                  setRequestedPage((current) => Math.max(1, current - 1))
                }
              >
                <ChevronLeftIcon aria-hidden="true" size={16} />
              </Button>
              <Text size="sm">
                Página {page} de {pageCount}
              </Text>
              <Button
                type="button"
                variant="secondary-bordered"
                size="sm"
                aria-label="Próxima página"
                disabled={page === pageCount}
                onClick={() =>
                  setRequestedPage((current) =>
                    Math.min(pageCount, current + 1),
                  )
                }
              >
                <ChevronRightIcon aria-hidden="true" size={16} />
              </Button>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
