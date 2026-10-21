import { useDeleteUserMutation } from "@/api/resources/users/mutations";
import { useUsersQuery } from "@/api/resources/users/queries";
import type { UserQuery } from "@/api/resources/users/validations/query.schema";
import {
  ROLE_LABEL,
  type Role,
} from "@/api/resources/users/validations/auth.schema";
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
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { useHighestRole } from "@/hooks/useHighestRole";
import { UserHeaderFilters } from "@/pages/Users/components/UserHeaderFilters";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { EllipsisIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

export function TableUsers() {
  const { user: currentUser } = useRequiredAuth();
  const role = useHighestRole(currentUser.role);
  const [filters, setFilters] = useState<UserQuery>({});
  const usersQuery = useUsersQuery();
  const deleteUserMutation = useDeleteUserMutation();
  const managementBaseUrl =
    role === "admin" ? urls.admin_dashboard : urls.support_dashboard;

  const users = useMemo(() => {
    const normalizedSearch = filters.name?.trim().toLocaleLowerCase("pt-BR");

    return (usersQuery.data ?? []).filter((user) => {
      const matchesSearch =
        !normalizedSearch ||
        [user.name, user.email, user.document, user.phone].some((value) =>
          value.toLocaleLowerCase("pt-BR").includes(normalizedSearch),
        );
      const matchesRole = !filters.role || user.role.includes(filters.role);

      return matchesSearch && matchesRole;
    });
  }, [filters.name, filters.role, usersQuery.data]);

  return (
    <section aria-labelledby="users-management-heading" className="space-y-4">
      <UserHeaderFilters
        title={filters.name || filters.role ? "Resultados" : "Todos"}
        subtitle={`${users.length} usuários encontrados`}
        filters={filters}
        setFilters={setFilters}
      />
      <Separator orientation="horizontal" variant="secondary" />

      {usersQuery.isPending ? (
        <Text>Carregando usuários...</Text>
      ) : (
        <>
          {usersQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar os usuários. Exibindo dados de exemplo.
            </Text>
          )}
          {deleteUserMutation.isError && (
            <Text role="alert" className="animate-pulse-once">
              Não foi possível apagar o usuário. Tente novamente.
            </Text>
          )}
          <div className="overflow-x-auto rounded-lg border border-secondary-600 p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Label size="xs">Usuário</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Documento</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Telefone</Label>
                  </TableHead>
                  <TableHead>
                    <Label size="xs">Perfil</Label>
                  </TableHead>
                  <TableHead className="text-right">
                    <Label size="xs">Ações</Label>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex min-w-56 items-center gap-3">
                        <Image
                          size="xs"
                          rounded="full"
                          aria-label={`Foto de ${user.name}`}
                        >
                          <ImageContent
                            src={user.avatarUrl || undefined}
                            alt={user.name}
                          />
                          <ImageFallback variant="muted">
                            <Text size="xs">
                              {user.name.slice(0, 1).toLocaleUpperCase("pt-BR")}
                            </Text>
                          </ImageFallback>
                        </Image>
                        <div className="min-w-0">
                          <Text className="line-clamp-2">{user.name}</Text>
                          <Text size="sm" variant="secondary">
                            {user.email}
                          </Text>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Text>{user.document}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>{user.phone || "Não informado"}</Text>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.role.map((userRole: Role) => (
                          <Badge
                            key={userRole}
                            size="xs"
                            variant="primary-ghost"
                            rounded="full"
                            className="min-w-30"
                          >
                            {ROLE_LABEL[userRole]}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="secondary-ghost"
                              size="sm"
                              aria-label={`Ações para ${user.name}`}
                            >
                              <EllipsisIcon size={18} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                to={`${managementBaseUrl}${urls.users}/${encodeURIComponent(user.id)}${urls.update}`}
                              >
                                <PencilIcon />
                                Atualizar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="danger"
                              disabled={
                                deleteUserMutation.isPending ||
                                user.id === currentUser.id
                              }
                              onSelect={(event) => {
                                if (
                                  !window.confirm(
                                    `Deseja apagar o usuário "${user.name}"?`,
                                  )
                                ) {
                                  event.preventDefault();
                                  return;
                                }

                                deleteUserMutation.mutate(user.id);
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
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center">
                      <Text>Nenhum usuário encontrado.</Text>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </section>
  );
}
