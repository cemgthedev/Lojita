import {
  orderAddressesKeys,
  orderItemsKeys,
  orderSellersKeys,
  ordersKeys,
} from "@/api/resources/orders/keys";
import {
  orderAddressesService,
  orderItemsService,
  orderSellersService,
  ordersService,
} from "@/api/resources/orders/services";
import type { CreateOrder } from "@/api/resources/orders/validations/create-order.schema";
import type { CreateOrderAddress } from "@/api/resources/orders/validations/create-order-address.schema";
import type { CreateOrderItem } from "@/api/resources/orders/validations/create-order-item.schema";
import type { CreateOrderSeller } from "@/api/resources/orders/validations/create-order-seller.schema";
import type { UpdateOrder } from "@/api/resources/orders/validations/update-order.schema";
import type { UpdateOrderAddress } from "@/api/resources/orders/validations/update-order-address.schema";
import type { UpdateOrderItem } from "@/api/resources/orders/validations/update-order-item.schema";
import type { UpdateOrderSeller } from "@/api/resources/orders/validations/update-order-seller.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function orderItemDetailKey(orderSellerId: string, id: string, variantId: string) {
  return orderItemsKeys.detail(`${orderSellerId}:${id}:${variantId}`);
}

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: CreateOrder) => ordersService.create(order),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ordersKeys.lists() }),
  });
}

export function useUpdateOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (order: UpdateOrder) => ordersService.update(order),
    onSuccess: (order) => {
      queryClient.setQueryData(ordersKeys.detail(order.id), order);
      return queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
    },
  });
}

export function useDeleteOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ordersService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ordersKeys.detail(id), exact: true });
      queryClient.invalidateQueries({ queryKey: orderItemsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderSellersKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderAddressesKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
    },
  });
}

export function useCreateOrderItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: CreateOrderItem) => orderItemsService.create(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderSellersKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: orderItemsKeys.lists() });
    },
  });
}

export function useUpdateOrderItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: UpdateOrderItem) => orderItemsService.update(item),
    onSuccess: (item) => {
      queryClient.setQueryData(
        orderItemDetailKey(item.orderSellerId, item.id, item.variantId),
        item,
      );
      queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderSellersKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: orderItemsKeys.lists() });
    },
  });
}

export function useDeleteOrderItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderSellerId, id, variantId }: { orderSellerId: string; id: string; variantId: string }) =>
      orderItemsService.remove(orderSellerId, id, variantId),
    onSuccess: (_data, { orderSellerId, id, variantId }) => {
      queryClient.removeQueries({
        queryKey: orderItemDetailKey(orderSellerId, id, variantId),
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderSellersKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: orderItemsKeys.lists() });
    },
  });
}

export function useCreateOrderSellerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (seller: CreateOrderSeller) => orderSellersService.create(seller),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: orderSellersKeys.lists() });
    },
  });
}

export function useUpdateOrderSellerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (seller: UpdateOrderSeller) => orderSellersService.update(seller),
    onSuccess: (seller) => {
      queryClient.setQueryData(orderSellersKeys.detail(seller.id), seller);
      queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: orderSellersKeys.lists() });
    },
  });
}

export function useDeleteOrderSellerMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => orderSellersService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: orderSellersKeys.detail(id), exact: true });
      queryClient.invalidateQueries({ queryKey: orderItemsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: orderSellersKeys.lists() });
    },
  });
}

export function useCreateOrderAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (address: CreateOrderAddress) => orderAddressesService.create(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: orderAddressesKeys.lists() });
    },
  });
}

export function useUpdateOrderAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (address: UpdateOrderAddress) => orderAddressesService.update(address),
    onSuccess: (address) => {
      queryClient.setQueryData(orderAddressesKeys.detail(address.id), address);
      queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: orderAddressesKeys.lists() });
    },
  });
}

export function useDeleteOrderAddressMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => orderAddressesService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: orderAddressesKeys.detail(id), exact: true });
      queryClient.invalidateQueries({ queryKey: ordersKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: orderAddressesKeys.lists() });
    },
  });
}
