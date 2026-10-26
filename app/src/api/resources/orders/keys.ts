import type { OrderAddressQuery } from "@/api/resources/orders/validations/order-address-query.schema";
import type { OrderItemQuery } from "@/api/resources/orders/validations/order-item-query.schema";
import type { OrderQuery } from "@/api/resources/orders/validations/order-query.schema";
import type { OrderSellerQuery } from "@/api/resources/orders/validations/order-seller-query.schema";

function resourceKeys<T>(name: string) {
  return {
    all: [name] as const,
    lists: () => [name, "list"] as const,
    list: (query?: T) => [name, "list", query] as const,
    details: () => [name, "detail"] as const,
    detail: (id: string) => [name, "detail", id] as const,
  };
}

export const ordersKeys = resourceKeys<OrderQuery>("orders");
export const orderItemsKeys = resourceKeys<OrderItemQuery>("order-items");
export const orderSellersKeys = resourceKeys<OrderSellerQuery>("order-sellers");
export const orderAddressesKeys = resourceKeys<OrderAddressQuery>("order-addresses");
