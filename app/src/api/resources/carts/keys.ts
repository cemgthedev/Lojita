import type { CartItemQuery } from "@/api/resources/carts/validations/cart-item-query.schema";
import type { CartQuery } from "@/api/resources/carts/validations/cart-query.schema";

export const cartsKeys = {
  all: ["carts"] as const,
  lists: () => [...cartsKeys.all, "list"] as const,
  list: (query?: CartQuery) => [...cartsKeys.lists(), query] as const,
  details: () => [...cartsKeys.all, "detail"] as const,
  detail: (id: string) => [...cartsKeys.details(), id] as const,
};

export const cartItemsKeys = {
  all: ["cart-items"] as const,
  lists: () => [...cartItemsKeys.all, "list"] as const,
  list: (query?: CartItemQuery) => [...cartItemsKeys.lists(), query] as const,
  details: () => [...cartItemsKeys.all, "detail"] as const,
  detail: (cartId: string, variantId: string) =>
    [...cartItemsKeys.details(), cartId, variantId] as const,
};
