import { useProductsQuery } from "@/api/resources/products/products/queries";
import { useUpdateStoreMutation } from "@/api/resources/stores/mutations";
import { useStoresQuery } from "@/api/resources/stores/queries";
import type { StoreQuery } from "@/api/resources/stores/validations/query.schema";
import {
  STORE_STATUS,
  STORE_STATUS_LABEL,
  STORE_STATUS_VARIANT,
  storeStatusSchema,
} from "@/api/resources/stores/validations/status.schema";
import { useUsersQuery } from "@/api/resources/users/queries";
import {
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Image,
  ImageContent,
  ImageFallback,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
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
import { urls } from "@/constants/urls";
import { StoresHeaderFilters } from "@/pages/Stores/components/StoresHeaderFilters";
import { EllipsisIcon, ExternalLinkIcon, PencilIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

export function TableStores() {
  const [filters, setFilters] = useState<StoreQuery>({});
  const storesQuery = useStoresQuery();
  const usersQuery = useUsersQuery();
  const productsQuery = useProductsQuery();
  const updateStoreMutation = useUpdateStoreMutation();

  const stores = useMemo(() => {
    const normalizedName = filters.name?.trim().toLocaleLowerCase("pt-BR");

    return (storesQuery.data ?? []).filter((store) => {
      const matchesName =
        !normalizedName ||
        [store.name, store.businessEmail, store.phone, store.url].some(
          (value) =>
            value.toLocaleLowerCase("pt-BR").includes(normalizedName),
        );
      const matchesStatus = !filters.status || store.status === filters.status;
      const matchesUser = !filters.userId || store.userId === filters.userId;

      return matchesName && matchesStatus && matchesUser;
    });
  }, [filters.name, filters.status, filters.userId, storesQuery.data]);

  const userById = useMemo(
    () => new Map((usersQuery.data ?? []).map((user) => [user.id, user])),
    [usersQuery.data],
  );
  const productCountByStoreId = useMemo(() => {
    const counts = new Map<string, number>();
    for (const product of productsQuery.data ?? []) {
      counts.set(product.storeId, (counts.get(product.storeId) ?? 0) + 1);
    }
    return counts;
  }, [productsQuery.data]);

  async function updateStatus(
    storeId: string,
    status: (typeof STORE_STATUS)[keyof typeof STORE_STATUS],
  ) {
    try {
      await updateStoreMutation.mutateAsync({ id: storeId, status });
      toast("Status da loja atualizado.", { variant: "success" });
    } catch {
      toast("Não foi possível atualizar o status da loja.", {
        variant: "danger",
      });
    }
  }

  const isPending =
    storesQuery.isPending || usersQuery.isPending || productsQuery.isPending;

  return (
    <section aria-labelledby="stores-list-heading" className="space-y-4">
      <StoresHeaderFilters
        filters={filters}
        setFilters={setFilters}
        resultCount={stores.length}
      />
      <Label id="stores-list-heading" className="sr-only">
        Lista de lojas
      </Label>
      <Separator orientation="horizontal" variant="secondary" />

      {isPending && <Text role="status">Carregando lojas...</Text>}
      {(storesQuery.isError || usersQuery.isError || productsQuery.isError) && (
        <Text role="alert" className="animate-pulse-once">
          Não foi possível carregar todos os dados. Exibindo os dados
          disponíveis.
        </Text>
      )}

      {!isPending && (
        <div className="overflow-x-auto rounded-lg border border-secondary-600 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Label size="xs">Vendedor</Label>
                </TableHead>
                <TableHead>
                  <Label size="xs">Loja</Label>
                </TableHead>
                <TableHead>
                  <Label size="xs">Status</Label>
                </TableHead>
                <TableHead>
                  <Label size="xs">N. produtos</Label>
                </TableHead>
                <TableHead className="text-right">
                  <Label size="xs">Ações</Label>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center">
                    <Text>Nenhuma loja encontrada.</Text>
                  </TableCell>
                </TableRow>
              ) : (
                stores.map((store) => {
                  const seller = userById.get(store.userId);
                  const storeUrl = `${urls.admin_dashboard}${urls.stores}/${encodeURIComponent(store.id)}`;

                  return (
                    <TableRow key={store.id}>
                      <TableCell>
                        <div className="flex min-w-56 items-center gap-3">
                          <Image
                            size="sm"
                            rounded="full"
                            aria-label={`Imagem de ${seller?.name ?? "vendedor"}`}
                          >
                            <ImageContent
                              src={seller?.avatarUrl || undefined}
                              alt={seller?.name}
                            />
                            <ImageFallback variant="muted">
                              <Text size="xs">Sem imagem</Text>
                            </ImageFallback>
                          </Image>
                          <div className="min-w-0">
                            <Text>{seller?.name ?? "Vendedor não encontrado"}</Text>
                            <Text size="sm" variant="secondary">
                              {seller?.email ?? "E-mail não encontrado"}
                            </Text>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex min-w-56 items-center gap-3">
                          <Image
                            size="sm"
                            rounded="md"
                            aria-label={`Imagem de ${store.name}`}
                          >
                            <ImageContent
                              src={store.logoUrl || undefined}
                              alt={store.name}
                            />
                            <ImageFallback variant="muted">
                              <Text size="xs">Sem imagem</Text>
                            </ImageFallback>
                          </Image>
                          <div className="min-w-0">
                            <Text>{store.name}</Text>
                            <Text size="sm" variant="secondary">
                              {store.businessEmail || `@${store.url}`}
                            </Text>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={store.status}
                          onValueChange={(value) => {
                            const status = storeStatusSchema.safeParse(value);
                            if (
                              status.success &&
                              status.data !== store.status
                            ) {
                              void updateStatus(store.id, status.data);
                            }
                          }}
                          disabled={updateStoreMutation.isPending}
                        >
                          <SelectTrigger
                            aria-label={`Alterar status da loja ${store.name}`}
                            size="sm"
                            rounded="full"
                          >
                            <SelectValue>
                              <Badge
                                size="xs"
                                rounded="full"
                                variant={STORE_STATUS_VARIANT[store.status]}
                              >
                                {STORE_STATUS_LABEL[store.status]}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(STORE_STATUS).map((status) => (
                              <SelectItem key={status} value={status}>
                                {STORE_STATUS_LABEL[status]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Text>{productCountByStoreId.get(store.id) ?? 0}</Text>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                type="button"
                                variant="secondary-ghost"
                                size="sm"
                                aria-label={`Ações para ${store.name}`}
                              >
                                <EllipsisIcon size={18} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={storeUrl}>
                                  <ExternalLinkIcon />
                                  Visualizar
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`${storeUrl}${urls.update}`}>
                                  <PencilIcon />
                                  Atualizar
                                </Link>
                              </DropdownMenuItem>
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
      )}
    </section>
  );
}