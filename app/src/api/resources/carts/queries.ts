import {
  cartItemsKeys,
  cartsKeys,
} from "@/api/resources/carts/keys";
import { mockCartItems, mockCarts } from "@/api/resources/carts/carts.mock";
import { cartItemsService, cartsService } from "@/api/resources/carts/services";
import type { CartItemQuery } from "@/api/resources/carts/validations/cart-item-query.schema";
import type { CartQuery } from "@/api/resources/carts/validations/cart-query.schema";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function useCartsQuery(query?: CartQuery, enabled = true) {
  const result = useQuery({
    queryKey: cartsKeys.list(query),
    queryFn: () => cartsService.list(query),
    enabled,
  });
  return withMockArrayFallback(result, filterMockData(mockCarts, query));
}

export function useCartQuery(id: string) {
  const result = useQuery({
    queryKey: cartsKeys.detail(id),
    queryFn: () => cartsService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(result, mockCarts.find((cart) => cart.id === id));
}

export function useCartItemsQuery(query?: CartItemQuery, enabled = true) {
  const result = useQuery({
    queryKey: cartItemsKeys.list(query),
    queryFn: () => cartItemsService.list(query),
    enabled,
  });
  return withMockArrayFallback(result, filterMockData(mockCartItems, query));
}

export function useCartItemQuery(cartId: string, variantId: string) {
  const result = useQuery({
    queryKey: cartItemsKeys.detail(cartId, variantId),
    queryFn: () => cartItemsService.findById(cartId, variantId),
    enabled: cartId.length > 0 && variantId.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockCartItems.find(
      (item) => item.cartId === cartId && item.variantId === variantId,
    ),
  );
}
