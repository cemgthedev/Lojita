import type { UserQuery } from "@/api/resources/users/validations/query.schema";

export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (query?: UserQuery) => [...usersKeys.lists(), query] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
};