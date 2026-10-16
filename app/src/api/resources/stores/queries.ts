import { storesKeys } from "@/api/resources/stores/keys";
import { storesService } from "@/api/resources/stores/services";
import type { StoreQuery } from "@/api/resources/stores/validations/query.schema";
import { useQuery } from "@tanstack/react-query";

export function useStoresQuery(query?: StoreQuery, enabled = true) {
  return useQuery({
    queryKey: storesKeys.list(query),
    queryFn: () => storesService.list(query),
    enabled,
  });
}

export function useStoreQuery(id: string) {
  return useQuery({
    queryKey: storesKeys.detail(id),
    queryFn: () => storesService.findById(id),
    enabled: id.length > 0,
  });
}
