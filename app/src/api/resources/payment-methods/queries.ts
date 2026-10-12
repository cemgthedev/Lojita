import { paymentMethodsKeys } from "@/api/resources/payment-methods/keys";
import { paymentMethodsService } from "@/api/resources/payment-methods/services";
import type { PaymentMethodQuery } from "@/api/resources/payment-methods/validations/query.schema";
import { useQuery } from "@tanstack/react-query";

export function usePaymentMethodsQuery(query?: PaymentMethodQuery) {
  return useQuery({
    queryKey: paymentMethodsKeys.list(query),
    queryFn: () => paymentMethodsService.list(query),
  });
}

export function usePaymentMethodQuery(id: string) {
  return useQuery({
    queryKey: paymentMethodsKeys.detail(id),
    queryFn: () => paymentMethodsService.findById(id),
    enabled: id.length > 0,
  });
}
