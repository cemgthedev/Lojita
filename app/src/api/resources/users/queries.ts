import { useQuery } from "@tanstack/react-query";
import { mockUserRecords } from "@/api/resources/users/users.mock";
import { usersKeys } from "@/api/resources/users/keys";
import { usersService } from "@/api/resources/users/services";
import type { UserQuery } from "@/api/resources/users/validations/query.schema";
import {
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";

export function useUsersQuery(query?: UserQuery) {
  const result = useQuery({
    queryKey: usersKeys.list(query),
    queryFn: () => usersService.list(query),
  });
  const mockData = mockUserRecords.filter((user) => {
    if (query?.id && user.id !== query.id) return false;
    if (query?.role && !user.role.includes(query.role)) return false;

    return Object.entries(query ?? {}).every(([key, value]) => {
      if (value === undefined || key === "role" || key === "page" || key === "limit") {
        return true;
      }

      return user[key as keyof typeof user] === value;
    });
  });
  const start = query?.page && query.limit ? (query.page - 1) * query.limit : 0;
  const end = query?.limit ? start + query.limit : undefined;
  return withMockArrayFallback(result, mockData.slice(start, end));
}

export function useUserQuery(id: string) {
  const result = useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockUserRecords.find((user) => user.id === id),
  );
}