import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "@/api/resources/users/keys";
import { usersService } from "@/api/resources/users/services";
import type { UserQuery } from "@/api/resources/users/validations/query.schema";

export function useUsersQuery(query?: UserQuery) {
  return useQuery({
    queryKey: usersKeys.list(query),
    queryFn: () => usersService.list(query),
  });
}

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersService.findById(id),
    enabled: id.length > 0,
  });
}