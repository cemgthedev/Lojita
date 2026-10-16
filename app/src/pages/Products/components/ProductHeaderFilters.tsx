import { useCategoriesQuery } from "@/api/resources/categories/queries";
import type { Category } from "@/api/resources/categories/validations/category.schema";
import type { ProductQuery } from "@/api/resources/products/products/validations/query.schema";
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
import { mockCategories } from "@/mocks/products.mock";
import { FunnelIcon, SearchIcon, XIcon } from "lucide-react";
import { Dialog } from "radix-ui";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

export type ProductSort = "price-asc" | "price-desc" | "title-asc";

function isProductSort(value: string): value is ProductSort {
  return (
    value === "price-asc" || value === "price-desc" || value === "title-asc"
  );
}

export type ProductHeaderFiltersProps = {
  title: string;
  subtitle: string;
  filters: ProductQuery;
  setFilters: Dispatch<SetStateAction<ProductQuery>>;
  sort: ProductSort;
  setSort: (sort: ProductSort) => void;
};

export function ProductHeaderFilters({
  title,
  subtitle,
  filters,
  setFilters,
  sort,
  setSort,
}: ProductHeaderFiltersProps) {
  const categoriesQuery = useCategoriesQuery();
  const categories: Category[] =
    categoriesQuery.data ?? (categoriesQuery.isError ? mockCategories : []);
  const [searchValue, setSearchValue] = useState(filters.title ?? "");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const titleFilter = searchValue.trim() || undefined;
      if (titleFilter !== filters.title) {
        setFilters((current) => ({ ...current, title: titleFilter }));
      }
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [filters.title, searchValue, setFilters]);

  const selectedCategory = categories.find(
    (category) => category.id === filters.categoryId,
  );
  function updateCategory(categoryId?: string) {
    setFilters((current) => ({ ...current, categoryId }));
  }

  function clearFilters() {
    setSearchValue("");
    setFilters({});
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full max-w-2xl flex gap-2">
          <InputGroup>
            <InputGroupInput
              aria-label="Buscar produtos por título"
              placeholder="Buscar produtos..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <InputGroupAddon align={"inline-start"}>
              <SearchIcon size={20} className="w-5 h-5" />
            </InputGroupAddon>
          </InputGroup>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="dark-bordered"
                size="lg"
                className="shrink-0"
              >
                <FunnelIcon size={20} className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader>
                <Dialog.Title className="text-lg font-semibold">
                  Filtrar produtos
                </Dialog.Title>
                <Text>
                  Refine sua busca com filtros personalizados de produtos.
                </Text>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4 pb-4">
                <Field>
                  <FieldLabel>Categoria</FieldLabel>
                  <Select
                    value={selectedCategory ? selectedCategory.id : "all"}
                    onValueChange={(value) => {
                      const categoryId = value ? value : undefined;

                      updateCategory(categoryId);
                    }}
                  >
                    <SelectTrigger
                      aria-label="Ordenar produtos"
                      size={"sm"}
                      rounded={"full"}
                      className="min-w-40 px-2 py-1"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={"category-undefined"} value={"all"}>
                        Todas
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            rounded={"full"}
            variant={!filters.categoryId ? "secondary-ghost" : "dark-ghost"}
            className="px-2 py-1"
            onClick={() => updateCategory(undefined)}
          >
            Todas
          </Button>
          {categories.slice(0, 10).map((category) => (
            <Button
              key={category.id}
              type="button"
              size="sm"
              rounded={"full"}
              variant={
                filters.categoryId === category.id
                  ? "secondary-ghost"
                  : "dark-ghost"
              }
              className="px-2 py-1"
              onClick={() => updateCategory(category.id)}
            >
              {category.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 space-y-2">
          <div className="space-y-1">
            <Label id="store-products-heading" size="sm">
              {title}
            </Label>
            <Text>{subtitle}</Text>
          </div>
          {(filters.title || selectedCategory) && (
            <div className="flex flex-wrap items-center gap-2">
              {filters.title && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded={"full"}
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => {
                    setSearchValue("");
                    setFilters((current) => ({ ...current, title: undefined }));
                  }}
                >
                  Título: {filters.title}
                </Button>
              )}
              {selectedCategory && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded={"full"}
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => updateCategory(undefined)}
                >
                  Categoria: {selectedCategory.title}
                </Button>
              )}
              <Button
                type="button"
                size="xs"
                variant="dark-bordered"
                rounded={"full"}
                className="px-2 py-1"
                onClick={clearFilters}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Text className="whitespace-nowrap">Ordenar por</Text>
          <Select
            value={sort}
            onValueChange={(value) => {
              if (isProductSort(value)) {
                setSort(value);
              }
            }}
          >
            <SelectTrigger
              aria-label="Ordenar produtos"
              size={"sm"}
              rounded={"full"}
              className="min-w-40 px-2 py-1"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Menor preço</SelectItem>
              <SelectItem value="price-desc">Maior preço</SelectItem>
              <SelectItem value="title-asc">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
