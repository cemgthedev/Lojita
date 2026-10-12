import type { PaymentMethodQuery } from "@/api/resources/payment-methods/validations/query.schema";

export const paymentMethodsKeys = {
  all: ["paymentMethods"] as const,
  lists: () => [...paymentMethodsKeys.all, "list"] as const,
  list: (query?: PaymentMethodQuery) => [
    ...paymentMethodsKeys.lists(),
    query,
  ] as const,
  details: () => [...paymentMethodsKeys.all, "detail"] as const,
  detail: (id: string) => [...paymentMethodsKeys.details(), id] as const,
};
