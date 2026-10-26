import {
  orderAddressesKeys,
  orderItemsKeys,
  orderSellersKeys,
  ordersKeys,
} from "@/api/resources/orders/keys";
import {
  mockOrderAddresses,
  mockOrderItems,
  mockOrderSellers,
  mockOrders,
} from "@/api/resources/orders/orders.mock";
import {
  orderAddressesService,
  orderItemsService,
  orderSellersService,
  ordersService,
} from "@/api/resources/orders/services";
import type { OrderAddressQuery } from "@/api/resources/orders/validations/order-address-query.schema";
import type { OrderItemQuery } from "@/api/resources/orders/validations/order-item-query.schema";
import type { OrderQuery } from "@/api/resources/orders/validations/order-query.schema";
import type { OrderSellerQuery } from "@/api/resources/orders/validations/order-seller-query.schema";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function useOrdersQuery(query?: OrderQuery, enabled = true) {
  const result = useQuery({
    queryKey: ordersKeys.list(query),
    queryFn: () => ordersService.list(query),
    enabled,
  });
  return withMockArrayFallback(result, filterMockData(mockOrders, query));
}

export function useOrderQuery(id: string) {
  const result = useQuery({
    queryKey: ordersKeys.detail(id),
    queryFn: () => ordersService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(result, mockOrders.find((order) => order.id === id));
}

export function useOrderItemsQuery(query?: OrderItemQuery, enabled = true) {
  const result = useQuery({
    queryKey: orderItemsKeys.list(query),
    queryFn: () => orderItemsService.list(query),
    enabled,
  });
  return withMockArrayFallback(result, filterMockData(mockOrderItems, query));
}

export function useOrderItemQuery(orderSellerId: string, id: string, variantId: string) {
  const key = `${orderSellerId}:${id}:${variantId}`;
  const result = useQuery({
    queryKey: orderItemsKeys.detail(key),
    queryFn: () => orderItemsService.findById(orderSellerId, id, variantId),
    enabled: orderSellerId.length > 0 && id.length > 0 && variantId.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockOrderItems.find(
      (item) => item.orderSellerId === orderSellerId && item.id === id && item.variantId === variantId,
    ),
  );
}

export function useOrderSellersQuery(query?: OrderSellerQuery, enabled = true) {
  const result = useQuery({
    queryKey: orderSellersKeys.list(query),
    queryFn: () => orderSellersService.list(query),
    enabled,
  });
  return withMockArrayFallback(result, filterMockData(mockOrderSellers, query));
}

export function useOrderSellerQuery(id: string) {
  const result = useQuery({
    queryKey: orderSellersKeys.detail(id),
    queryFn: () => orderSellersService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockOrderSellers.find((seller) => seller.id === id),
  );
}

export function useOrderAddressesQuery(query?: OrderAddressQuery, enabled = true) {
  const result = useQuery({
    queryKey: orderAddressesKeys.list(query),
    queryFn: () => orderAddressesService.list(query),
    enabled,
  });
  return withMockArrayFallback(result, filterMockData(mockOrderAddresses, query));
}

export function useOrderAddressQuery(id: string) {
  const result = useQuery({
    queryKey: orderAddressesKeys.detail(id),
    queryFn: () => orderAddressesService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockOrderAddresses.find((address) => address.id === id),
  );
}
