import { useDeleteAttributeMutation } from "@/api/resources/products/attributes/mutations";
import {
  useAttributesQuery,
  useAttributeValuesQuery,
} from "@/api/resources/products/attributes/queries";
import type { AttributeQuery } from "@/api/resources/products/attributes/validations/attribute-query.schema";
import type { AttributeValue } from "@/api/resources/products/attributes/validations/attribute-value.schema";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@/components/ui";
import { AttributeHeaderFilters } from "@/pages/Attributes/components/AttributeHeaderFilters";
import {
  EllipsisIcon,
  ExternalLinkIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";

import { ATTRIBUTE_LABEL } from "@/api/resources/products/attributes/validations/attribute.schema";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import { Separator } from "@/components/ui";
import { urls } from "@/constants/urls";
import { useHighestRole } from "@/hooks/useHighestRole";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { Link } from "react-router";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

function formatDate(value: string | null) {
  return value ? dateFormatter.format(new Date(value)) : "—";
}

export function TableAttributes() {
  const [filters, setFilters] = useState<AttributeQuery>({});
  const attributesQuery = useAttributesQuery(filters);
  const attributeValuesQuery = useAttributeValuesQuery();
  const deleteAttributeMutation = useDeleteAttributeMutation();
  const attributes = attributesQuery.data ?? [];
  const attributeValues = attributeValuesQuery.data ?? [];
  const isPending = attributesQuery.isPending || attributeValuesQuery.isPending;
  const isError = attributesQuery.isError || attributeValuesQuery.isError;
  const valuesByAttributeId = new Map<string, AttributeValue[]>();

  const { user } = useRequiredAuth();
  const role = useHighestRole(user.role);
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

  for (const attributeValue of attributeValues) {
    const values = valuesByAttributeId.get(attributeValue.attributeId) ?? [];
    values.push(attributeValue);
    valuesByAttributeId.set(attributeValue.attributeId, values);
  }

  return (
    <div className="space-y-4">
      <AttributeHeaderFilters
        title={
          filters.name || filters.type ? "Resultados" : "Todos os atributos"
        }
        subtitle={`${attributes.length} atributos encontrados`}
        filters={filters}
        setFilters={setFilters}
      />
      <Separator orientation="horizontal" variant="secondary" />
      {isPending ? (
        <Text>Carregando atributos...</Text>
      ) : (
        <div className="space-y-3">
          {deleteAttributeMutation.isError && (
            <Text role="alert" className="animate-pulse-once">
              Não foi possível apagar o atributo. Tente novamente.
            </Text>
          )}
          {isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar os atributos ou seus valores.
            </Text>
          )}
          <div className="overflow-x-auto rounded-lg border border-secondary-600 p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Label size="xs">Atributo</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Valores</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Data de criação</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Última atualização</Label>
                  </TableHead>
                  <TableHead className="text-right">
                    <Label size="xs">Ações</Label>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attributes.map((attribute) => {
                  const values = valuesByAttributeId.get(attribute.id) ?? [];

                  return (
                    <TableRow key={attribute.id}>
                      <TableCell>
                        <div className="min-w-36 space-y-1">
                          <Text>{attribute.name}</Text>
                          <Text size="sm" variant="secondary">
                            {ATTRIBUTE_LABEL[attribute.type]}
                          </Text>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Text className="min-w-48">
                          {values.length > 0
                            ? values.map((value) => value.title).join(", ")
                            : "Sem valores"}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Text className="whitespace-nowrap">
                          {formatDate(attribute.createdAt)}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Text className="whitespace-nowrap">
                          {formatDate(attribute.updatedAt)}
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
                                aria-label={`Ações para ${attribute.name}`}
                                disabled={deleteAttributeMutation.isPending}
                              >
                                <EllipsisIcon size={18} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link
                                  to={`${managementBaseUrl}${urls.attributes}/${encodeURIComponent(attribute.id)}`}
                                >
                                  <ExternalLinkIcon />
                                  Visualizar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  to={`${managementBaseUrl}${urls.attributes}/${encodeURIComponent(attribute.id)}${urls.update}`}
                                >
                                  <PencilIcon />
                                  Atualizar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                variant="danger"
                                disabled={deleteAttributeMutation.isPending}
                                onSelect={(event) => {
                                  if (
                                    !window.confirm(
                                      `Deseja apagar o atributo "${attribute.name}"?`,
                                    )
                                  ) {
                                    event.preventDefault();
                                    return;
                                  }

                                  deleteAttributeMutation.mutate(attribute.id);
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
                {attributes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center">
                      <Text>Nenhum atributo encontrado.</Text>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}
