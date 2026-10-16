import { paymentMethodsKeys } from "@/api/resources/payment-methods/keys";
import { mockPaymentMethods } from "@/api/resources/payment-methods/payment-methods.mock";
import { paymentMethodsService } from "@/api/resources/payment-methods/services";
import type { PaymentMethodQuery } from "@/api/resources/payment-methods/validations/query.schema";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function usePaymentMethodsQuery(query?: PaymentMethodQuery) {
  const result = useQuery({
    queryKey: paymentMethodsKeys.list(query),
    queryFn: () => paymentMethodsService.list(query),
  });
  return withMockArrayFallback(
    result,
    filterMockData(mockPaymentMethods, query),
  );
}

export function usePaymentMethodQuery(id: string) {
  const result = useQuery({
    queryKey: paymentMethodsKeys.detail(id),
    queryFn: () => paymentMethodsService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockPaymentMethods.find((paymentMethod) => paymentMethod.id === id),
  );
}
