import { useQuery } from "@tanstack/react-query";
import { specificationsKeys } from "@/api/resources/specifications/keys";
import { specificationsService } from "@/api/resources/specifications/services";
import type { SpecificationQuery } from "@/api/resources/specifications/validations/query.schema";
import { mockSpecifications } from "@/api/resources/products/products.mock";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";

export function useSpecificationsQuery(
  query?: SpecificationQuery,
  enabled = true,
) {
  const result = useQuery({
    queryKey: specificationsKeys.list(query),
    queryFn: () => specificationsService.list(query),
    enabled,
  });
  return withMockArrayFallback(result, filterMockData(mockSpecifications, query));
}

export function useSpecificationQuery(id: string) {
  const result = useQuery({
    queryKey: specificationsKeys.detail(id),
    queryFn: () => specificationsService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockSpecifications.find((specification) => specification.id === id),
  );
}
