import { storesKeys } from "@/api/resources/stores/keys";
import { mockStores } from "@/api/resources/stores/stores.mock";
import { storesService } from "@/api/resources/stores/services";
import type { StoreQuery } from "@/api/resources/stores/validations/query.schema";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function useStoresQuery(query?: StoreQuery, enabled = true) {
  const result = useQuery({
    queryKey: storesKeys.list(query),
    queryFn: () => storesService.list(query),
    enabled,
  });
  const mockData = filterMockData(mockStores, query);
  return withMockArrayFallback(result, mockData);
}

export function useStoreQuery(id: string) {
  const result = useQuery({
    queryKey: storesKeys.detail(id),
    queryFn: () => storesService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockStores.find((store) => store.id === id || store.url === id),
  );
}
