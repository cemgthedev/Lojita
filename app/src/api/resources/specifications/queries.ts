import { useQuery } from "@tanstack/react-query";
import { specificationsKeys } from "@/api/resources/specifications/keys";
import { specificationsService } from "@/api/resources/specifications/services";
import type { SpecificationQuery } from "@/api/resources/specifications/validations/query.schema";

export function useSpecificationsQuery(query?: SpecificationQuery) {
  return useQuery({
    queryKey: specificationsKeys.list(query),
    queryFn: () => specificationsService.list(query),
  });
}

export function useSpecificationQuery(id: string) {
  return useQuery({
    queryKey: specificationsKeys.detail(id),
    queryFn: () => specificationsService.findById(id),
    enabled: id.length > 0,
  });
}
