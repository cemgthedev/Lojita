import type { UserQuery } from "@/api/resources/users/validations/query.schema";

export const addressesKeys = {
  all: ["addresses"] as const,
  lists: () => [...addressesKeys.all, "list"] as const,
  list: (query?: UserQuery) => [...addressesKeys.lists(), query] as const,
  details: () => [...addressesKeys.all, "detail"] as const,
  detail: (id: string) => [...addressesKeys.details(), id] as const,
};
