import type { UserQuery } from "@/api/resources/users/validations/query.schema";

export const storesKeys = {
  all: ["stores"] as const,
  lists: () => [...storesKeys.all, "list"] as const,
  list: (query?: UserQuery) => [...storesKeys.lists(), query] as const,
  details: () => [...storesKeys.all, "detail"] as const,
  detail: (id: string) => [...storesKeys.details(), id] as const,
};
