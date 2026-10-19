import type { CategoryQuery } from "@/api/resources/categories/validations/query.schema";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  Text,
} from "@/components/ui";
import { SearchIcon, XIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

export type CategoryHeaderFiltersProps = {
  title: string;
  subtitle: string;
  filters: CategoryQuery;
  setFilters: Dispatch<SetStateAction<CategoryQuery>>;
};

export function CategoryHeaderFilters({
  title,
  subtitle,
  filters,
  setFilters,
}: CategoryHeaderFiltersProps) {
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

  function clearFilters() {
    setSearchValue("");
    setFilters({});
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full max-w-2xl flex gap-2">
          <InputGroup className="w-full">
            <InputGroupInput
              aria-label="Buscar categorias pelo título"
              placeholder="Buscar categorias..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon size={20} className="h-5 w-5" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 space-y-2">
          <div className="space-y-1">
            <Label id="categories-heading" size="sm">
              {title}
            </Label>
            <Text>{subtitle}</Text>
          </div>
          {filters.title && (
            <div className="flex flex-wrap items-center gap-2">
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
      </div>
    </div>
  );
}
