import type { AttributeQuery } from "@/api/resources/products/attributes/validations/attribute-query.schema";
import type { AttributeType } from "@/api/resources/products/attributes/validations/attribute.schema";
import {
  ATTRIBUTE_LABEL,
  ATTRIBUTE_TYPE,
} from "@/api/resources/products/attributes/validations/attribute.schema";
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

export type AttributeHeaderFiltersProps = {
  title: string;
  subtitle: string;
  filters: AttributeQuery;
  setFilters: Dispatch<SetStateAction<AttributeQuery>>;
};

const attributeTypes = Object.values(ATTRIBUTE_TYPE);

function isAttributeType(value: string): value is AttributeType {
  return attributeTypes.some((type) => type === value);
}

export function AttributeHeaderFilters({
  title,
  subtitle,
  filters,
  setFilters,
}: AttributeHeaderFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.name ?? "");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nameFilter = searchValue.trim() || undefined;
      if (nameFilter !== filters.name) {
        setFilters((current) => ({ ...current, name: nameFilter }));
      }
    }, 350);

    return () => window.clearTimeout(timeoutId);
  }, [filters.name, searchValue, setFilters]);

  function clearFilters() {
    setSearchValue("");
    setFilters({});
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex w-full max-w-2xl gap-2">
          <InputGroup className="w-full">
            <InputGroupInput
              aria-label="Buscar atributos pelo nome"
              placeholder="Buscar atributos por nome"
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
                aria-label="Abrir filtros de atributos"
              >
                <FunnelIcon size={20} className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader>
                <Dialog.Title className="text-lg font-semibold">
                  Filtrar atributos
                </Dialog.Title>
                <Text>Refine a busca pelo tipo de atributo.</Text>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4 pb-4">
                <Field>
                  <FieldLabel>Tipo</FieldLabel>
                  <Select
                    value={filters.type ?? "all"}
                    onValueChange={(type) => {
                      if (type === "all") {
                        setFilters((current) => ({
                          ...current,
                          type: undefined,
                        }));
                      } else if (isAttributeType(type)) {
                        setFilters((current) => ({ ...current, type }));
                      }
                    }}
                  >
                    <SelectTrigger
                      aria-label="Filtrar por tipo"
                      size="sm"
                      rounded="full"
                      className="min-w-40 px-2 py-1"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {attributeTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {ATTRIBUTE_LABEL[type]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          rounded="full"
          variant={!filters.type ? "secondary-ghost" : "dark-ghost"}
          className="px-2 py-1"
          onClick={() =>
            setFilters((current) => ({ ...current, type: undefined }))
          }
        >
          Todos
        </Button>
        {attributeTypes.map((type) => (
          <Button
            key={type}
            type="button"
            size="sm"
            rounded="full"
            variant={filters.type === type ? "secondary-ghost" : "dark-ghost"}
            className="px-2 py-1"
            onClick={() => setFilters((current) => ({ ...current, type }))}
          >
            {ATTRIBUTE_LABEL[type]}
          </Button>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 space-y-2">
          <div className="space-y-1">
            <Label id="attributes-heading" size="sm">
              {title}
            </Label>
            <Text>{subtitle}</Text>
          </div>
          {(filters.name || filters.type) && (
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
                  Título: {filters.name}
                </Button>
              )}
              {filters.type && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() =>
                    setFilters((current) => ({ ...current, type: undefined }))
                  }
                >
                  Tipo: {ATTRIBUTE_LABEL[filters.type]}
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
