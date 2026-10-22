import {
  Button,
  Field,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  Text,
} from "@/components/ui";
import { productReviewStatusLabel } from "@/pages/ProductsReviews/components/productReviewStatusLabel";
import { FunnelIcon, SearchIcon, XIcon } from "lucide-react";
import { Dialog } from "radix-ui";

export type ProductReviewsHeaderFiltersProps = {
  title: string;
  subtitle: string;
  searchName: string;
  onSearchNameChange: (value: string) => void;
  searchPlaceholder?: string;
  searchAriaLabel?: string;
  searchFilterLabel?: string;
  sortOrder?: "newest" | "oldest";
  onSortOrderChange?: (sortOrder: "newest" | "oldest") => void;
  ratingFilter?: number;
  onRatingFilterChange: (rating?: number) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  statusOptions: string[];
  showStatusFilter: boolean;
  onClearFilters: () => void;
};

export function ProductReviewsHeaderFilters({
  title,
  subtitle,
  searchName,
  onSearchNameChange,
  searchPlaceholder = "Nome do usuário",
  searchAriaLabel = "Buscar avaliações pelo nome do usuário",
  searchFilterLabel = "Usuário",
  sortOrder,
  onSortOrderChange,
  ratingFilter,
  onRatingFilterChange,
  statusFilter,
  onStatusFilterChange,
  statusOptions,
  showStatusFilter,
  onClearFilters,
}: ProductReviewsHeaderFiltersProps) {
  const hasActiveFilters =
    Boolean(searchName.trim()) ||
    ratingFilter !== undefined ||
    (showStatusFilter && statusFilter !== "all");

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full max-w-2xl gap-2">
          <InputGroup className="w-full">
            <InputGroupInput
              aria-label={searchAriaLabel}
              placeholder={searchPlaceholder}
              value={searchName}
              onChange={(event) => onSearchNameChange(event.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon size={20} className="h-5 w-5" />
            </InputGroupAddon>
          </InputGroup>
          {showStatusFilter && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="dark-bordered"
                  size="lg"
                  className="shrink-0"
                  aria-label="Abrir filtros de avaliações"
                >
                  <FunnelIcon size={20} className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader>
                  <Dialog.Title className="text-lg font-semibold">
                    Filtrar avaliações
                  </Dialog.Title>
                  <Text>Refine a busca pelo status da avaliação.</Text>
                </SheetHeader>
                <div className="flex flex-col gap-2 px-4 pb-4">
                  <Field>
                    <FieldLabel>Status</FieldLabel>
                    <Select
                      value={statusFilter}
                      onValueChange={onStatusFilterChange}
                    >
                      <SelectTrigger
                        aria-label="Filtrar avaliações por status"
                        size="sm"
                        rounded="full"
                        className="min-w-40 px-2 py-1"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {productReviewStatusLabel(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 space-y-2">
          <div className="space-y-1">
            <Label id="product-reviews-heading">{title}</Label>
            <Text>{subtitle}</Text>
          </div>
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {searchName.trim() && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => onSearchNameChange("")}
                >
                  {searchFilterLabel}: {searchName.trim()}
                </Button>
              )}
              {ratingFilter !== undefined && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => onRatingFilterChange(undefined)}
                >
                  {ratingFilter} estrelas
                </Button>
              )}
              {showStatusFilter && statusFilter !== "all" && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => onStatusFilterChange("all")}
                >
                  Status: {productReviewStatusLabel(statusFilter)}
                </Button>
              )}
              <Button
                type="button"
                size="xs"
                variant="dark-bordered"
                rounded="full"
                className="px-2 py-1"
                onClick={onClearFilters}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
        {sortOrder && onSortOrderChange && (
          <div className="flex shrink-0 items-center gap-2">
            <Text className="whitespace-nowrap">Ordenar por</Text>
            <Select
              value={sortOrder}
              onValueChange={(value) => {
                if (value === "newest" || value === "oldest") {
                  onSortOrderChange(value);
                }
              }}
            >
              <SelectTrigger
                aria-label="Ordenar avaliações"
                size="sm"
                rounded="full"
                className="min-w-40 px-2 py-1"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}
