import { addressesKeys } from "@/api/resources/addresses/keys";
import { addressesService } from "@/api/resources/addresses/services";
import type { AddressQuery } from "@/api/resources/addresses/validations/query.schema";
import { useQuery } from "@tanstack/react-query";

export function useAddressesQuery(query?: AddressQuery) {
  return useQuery({
    queryKey: addressesKeys.list(query),
    queryFn: () => addressesService.list(query),
  });
}

export function useAddressQuery(id: string) {
  return useQuery({
    queryKey: addressesKeys.detail(id),
    queryFn: () => addressesService.findById(id),
    enabled: id.length > 0,
  });
}
