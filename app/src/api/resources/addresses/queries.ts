import { addressesKeys } from "@/api/resources/addresses/keys";
import { mockAddresses } from "@/api/resources/addresses/addresses.mock";
import { addressesService } from "@/api/resources/addresses/services";
import type { AddressQuery } from "@/api/resources/addresses/validations/query.schema";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function useAddressesQuery(query?: AddressQuery) {
  const result = useQuery({
    queryKey: addressesKeys.list(query),
    queryFn: () => addressesService.list(query),
  });
  return withMockArrayFallback(
    result,
    filterMockData(mockAddresses, query),
  );
}

export function useAddressQuery(id: string) {
  const result = useQuery({
    queryKey: addressesKeys.detail(id),
    queryFn: () => addressesService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockAddresses.find((address) => address.id === id),
  );
}
