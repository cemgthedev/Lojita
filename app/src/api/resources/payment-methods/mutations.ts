import { paymentMethodsKeys } from "@/api/resources/payment-methods/keys";
import { paymentMethodsService } from "@/api/resources/payment-methods/services";
import type { CreatePaymentMethod } from "@/api/resources/payment-methods/validations/create.schema";
import type { UpdatePaymentMethod } from "@/api/resources/payment-methods/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePaymentMethodMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createdPaymentMethod: CreatePaymentMethod) =>
      paymentMethodsService.create(createdPaymentMethod),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: paymentMethodsKeys.lists() }),
  });
}

export function useUpdatePaymentMethodMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedPaymentMethod: UpdatePaymentMethod) =>
      paymentMethodsService.update(updatedPaymentMethod),
    onSuccess: (paymentMethod) => {
      queryClient.setQueryData(
        paymentMethodsKeys.detail(paymentMethod.id),
        paymentMethod,
      );
      return queryClient.invalidateQueries({
        queryKey: paymentMethodsKeys.lists(),
      });
    },
  });
}

export function useDeletePaymentMethodMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => paymentMethodsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: paymentMethodsKeys.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({
        queryKey: paymentMethodsKeys.lists(),
      });
    },
  });
}
