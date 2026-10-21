import {
  ROLE,
  ROLE_LABEL,
  type Role,
} from "@/api/resources/users/validations/auth.schema";
import type { UserQuery } from "@/api/resources/users/validations/query.schema";
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

export type UserHeaderFiltersProps = {
  title: string;
  subtitle: string;
  filters: UserQuery;
  setFilters: Dispatch<SetStateAction<UserQuery>>;
};

const roles = Object.values(ROLE);

function isRole(value: string): value is Role {
  return roles.some((role) => role === value);
}

export function UserHeaderFilters({
  title,
  subtitle,
  filters,
  setFilters,
}: UserHeaderFiltersProps) {
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
              aria-label="Buscar usuários por nome, e-mail, documento ou telefone"
              placeholder="Buscar usuários..."
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
                aria-label="Abrir filtros de usuários"
              >
                <FunnelIcon size={20} className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-auto">
              <SheetHeader>
                <Dialog.Title className="text-lg font-semibold">
                  Filtrar usuários
                </Dialog.Title>
                <Text>Refine a busca pelo perfil do usuário.</Text>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4 pb-4">
                <Field>
                  <FieldLabel>Perfil</FieldLabel>
                  <Select
                    value={filters.role ?? "all"}
                    onValueChange={(value) => {
                      if (value === "all") {
                        setFilters((current) => ({
                          ...current,
                          role: undefined,
                        }));
                      } else if (isRole(value)) {
                        setFilters((current) => ({ ...current, role: value }));
                      }
                    }}
                  >
                    <SelectTrigger
                      aria-label="Filtrar por perfil"
                      size="sm"
                      rounded="full"
                      className="min-w-40 px-2 py-1"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {ROLE_LABEL[role]}
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
          variant={!filters.role ? "secondary-ghost" : "dark-ghost"}
          className="px-2 py-1"
          onClick={() =>
            setFilters((current) => ({ ...current, role: undefined }))
          }
        >
          Todos
        </Button>
        {roles.map((role) => (
          <Button
            key={role}
            type="button"
            size="sm"
            rounded="full"
            variant={filters.role === role ? "secondary-ghost" : "dark-ghost"}
            className="px-2 py-1"
            onClick={() => setFilters((current) => ({ ...current, role }))}
          >
            {ROLE_LABEL[role]}
          </Button>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="min-w-0 space-y-2">
          <div className="space-y-1">
            <Label id="users-heading" size="sm">
              {title}
            </Label>
            <Text>{subtitle}</Text>
          </div>
          {(filters.name || filters.role) && (
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
                  Busca: {filters.name}
                </Button>
              )}
              {filters.role && (
                <Button
                  type="button"
                  size="xs"
                  variant="secondary-ghost"
                  rounded="full"
                  className="px-2 py-1"
                  endContent={<XIcon aria-hidden="true" size={14} />}
                  onClick={() =>
                    setFilters((current) => ({ ...current, role: undefined }))
                  }
                >
                  Perfil: {ROLE_LABEL[filters.role]}
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
