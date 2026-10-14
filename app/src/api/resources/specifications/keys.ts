import type { SpecificationQuery } from "@/api/resources/specifications/validations/query.schema";

export const specificationsKeys = {
  all: ["specifications"] as const,
  lists: () => [...specificationsKeys.all, "list"] as const,
  list: (query?: SpecificationQuery) => [...specificationsKeys.lists(), query] as const,
  details: () => [...specificationsKeys.all, "detail"] as const,
  detail: (id: string) => [...specificationsKeys.details(), id] as const,
};
