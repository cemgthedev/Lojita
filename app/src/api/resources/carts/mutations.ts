import {
  cartItemsKeys,
  cartsKeys,
} from "@/api/resources/carts/keys";
import { cartItemsService, cartsService } from "@/api/resources/carts/services";
import type { CreateCart } from "@/api/resources/carts/validations/create-cart.schema";
import type { CreateCartItem } from "@/api/resources/carts/validations/create-cart-item.schema";
import type { UpdateCart } from "@/api/resources/carts/validations/update-cart.schema";
import type { UpdateCartItem } from "@/api/resources/carts/validations/update-cart-item.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cart: CreateCart) => cartsService.create(cart),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cartsKeys.lists() }),
  });
}

export function useUpdateCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cart: UpdateCart) => cartsService.update(cart),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartsKeys.detail(cart.id), cart);
      return queryClient.invalidateQueries({ queryKey: cartsKeys.lists() });
    },
  });
}

export function useDeleteCartMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cartsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: cartsKeys.detail(id), exact: true });
      queryClient.invalidateQueries({ queryKey: cartItemsKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: cartsKeys.lists() });
    },
  });
}

export function useCreateCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: CreateCartItem) => cartItemsService.create(item),
    onSuccess: (item) => {
      queryClient.setQueryData(
        cartItemsKeys.detail(item.cartId, item.variantId),
        item,
      );
      queryClient.invalidateQueries({ queryKey: cartsKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: cartItemsKeys.lists() });
    },
  });
}

export function useUpdateCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: UpdateCartItem) => cartItemsService.update(item),
    onSuccess: (item) => {
      queryClient.setQueryData(
        cartItemsKeys.detail(item.cartId, item.variantId),
        item,
      );
      return queryClient.invalidateQueries({ queryKey: cartItemsKeys.lists() });
    },
  });
}

export function useDeleteCartItemMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cartId, variantId }: { cartId: string; variantId: string }) =>
      cartItemsService.remove(cartId, variantId),
    onSuccess: (_data, { cartId, variantId }) => {
      queryClient.removeQueries({
        queryKey: cartItemsKeys.detail(cartId, variantId),
        exact: true,
      });
      return queryClient.invalidateQueries({ queryKey: cartItemsKeys.lists() });
    },
  });
}
