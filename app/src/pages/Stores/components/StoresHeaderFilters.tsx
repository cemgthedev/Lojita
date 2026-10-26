import type { StoreQuery } from "@/api/resources/stores/validations/query.schema";
import {
  STORE_STATUS,
  STORE_STATUS_LABEL,
  storeStatusSchema,
} from "@/api/resources/stores/validations/status.schema";
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
import { FunnelIcon, SearchIcon, XIcon } from "lucide-react";
import { Dialog } from "radix-ui";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

type StoresHeaderFiltersProps = {
  filters: StoreQuery;
  setFilters: Dispatch<SetStateAction<StoreQuery>>;
  resultCount: number;
};

export function StoresHeaderFilters({
  filters,
  setFilters,
  resultCount,
}: StoresHeaderFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.name ?? "");
  const hasFilters = Boolean(filters.name || filters.status);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const name = searchValue.trim() || undefined;
      if (name !== filters.name) {
        setFilters((current) => ({ ...current, name }));
      }
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [filters.name, searchValue, setFilters]);

  function updateStatus(value: string) {
    if (value === "all") {
      setFilters((current) => ({ ...current, status: undefined }));
      return;
    }

    const status = storeStatusSchema.safeParse(value);
    if (status.success) {
      setFilters((current) => ({ ...current, status: status.data }));
    }
  }

  function clearFilters() {
    setSearchValue("");
    setFilters({});
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full max-w-2xl gap-2">
          <InputGroup className="w-full">
            <InputGroupInput
              aria-label="Buscar lojas por nome, endereço de e-mail, telefone ou URL"
              placeholder="Buscar lojas..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <InputGroupAddon align="inline-start">
              <SearchIcon size={20} className="h-5 w-5" />
            </InputGroupAddon>
          </InputGroup>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="dark-bordered"
                size="lg"
                className="shrink-0"
                aria-label="Abrir filtros de lojas"
              >
                <FunnelIcon size={20} className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader>
                <Dialog.Title className="text-lg font-semibold">
                  Filtrar lojas
                </Dialog.Title>
                <Text>Refine a busca pelo status da loja.</Text>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4 pb-4">
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Select
                    value={filters.status ?? "all"}
                    onValueChange={updateStatus}
                  >
                    <SelectTrigger
                      aria-label="Filtrar lojas por status"
                      size="sm"
                      rounded="full"
                      className="min-w-40 px-2 py-1"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      {Object.values(STORE_STATUS).map((status) => (
                        <SelectItem key={status} value={status}>
                          {STORE_STATUS_LABEL[status]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                {hasFilters && (
                  <Button
                    type="button"
                    variant="secondary-ghost"
                    onClick={clearFilters}
                  >
                    <XIcon size={16} />
                    Limpar filtros
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 space-y-2">
          <div className="space-y-1">
            <Label id="stores-heading" size="sm">
              {hasFilters ? "Resultados" : "Todas as lojas"}
            </Label>
            <Text>{resultCount} lojas encontradas</Text>
          </div>
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2">
              {filters.name && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() => {
                    setSearchValue("");
                    setFilters((current) => ({ ...current, name: undefined }));
                  }}
                >
                  Loja: {filters.name}
                </Button>
              )}
              {filters.status && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() =>
                    setFilters((current) => ({
                      ...current,
                      status: undefined,
                    }))
                  }
                >
                  Status: {STORE_STATUS_LABEL[filters.status]}
                </Button>
              )}
              <Button
                type="button"
                size="xs"
                variant="dark-bordered"
                rounded="full"
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