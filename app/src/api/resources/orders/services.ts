import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateOrder } from "@/api/resources/orders/validations/create-order.schema";
import type { CreateOrderAddress } from "@/api/resources/orders/validations/create-order-address.schema";
import type { CreateOrderItem } from "@/api/resources/orders/validations/create-order-item.schema";
import type { CreateOrderSeller } from "@/api/resources/orders/validations/create-order-seller.schema";
import {
  orderAddressSchema,
  type OrderAddress,
} from "@/api/resources/orders/validations/order-address.schema";
import {
  orderAddressQuerySchema,
  type OrderAddressQuery,
} from "@/api/resources/orders/validations/order-address-query.schema";
import {
  orderItemSchema,
  type OrderItem,
} from "@/api/resources/orders/validations/order-item.schema";
import {
  orderItemQuerySchema,
  type OrderItemQuery,
} from "@/api/resources/orders/validations/order-item-query.schema";
import {
  orderQuerySchema,
  type OrderQuery,
} from "@/api/resources/orders/validations/order-query.schema";
import {
  orderSchema,
  type Order,
} from "@/api/resources/orders/validations/order.schema";
import {
  orderSellerSchema,
  type OrderSeller,
} from "@/api/resources/orders/validations/order-seller.schema";
import {
  orderSellerQuerySchema,
  type OrderSellerQuery,
} from "@/api/resources/orders/validations/order-seller-query.schema";
import type { UpdateOrder } from "@/api/resources/orders/validations/update-order.schema";
import type { UpdateOrderAddress } from "@/api/resources/orders/validations/update-order-address.schema";
import type { UpdateOrderItem } from "@/api/resources/orders/validations/update-order-item.schema";
import type { UpdateOrderSeller } from "@/api/resources/orders/validations/update-order-seller.schema";
import { assertNoMockIds } from "@/api/resources/query-fallback";

function endpoint(base: string, id: string) {
  return `${base}/${encodeURIComponent(id)}`;
}

function queryString(query: object) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

function itemEndpoint(orderSellerId: string, id: string, variantId: string) {
  return `${endpoint(endpoints.orderItems, orderSellerId)}/${encodeURIComponent(id)}/${encodeURIComponent(variantId)}`;
}

export const ordersService = {
  async list(query?: OrderQuery): Promise<Order[]> {
    const parsedQuery = orderQuerySchema.parse(query ?? {});
    const response = await http.get<unknown>(
      `${endpoints.orders}${queryString(parsedQuery)}`,
    );
    return orderSchema.array().parse(response.data);
  },
  async findById(id: string): Promise<Order> {
    const response = await http.get<unknown>(endpoint(endpoints.orders, id));
    return orderSchema.parse(response.data);
  },
  async create(order: CreateOrder): Promise<Order> {
    assertNoMockIds("pedido", order.userId);
    const response = await http.post<unknown>(endpoints.orders, order);
    return orderSchema.parse(response.data);
  },
  async update({ id, ...order }: UpdateOrder): Promise<Order> {
    assertNoMockIds("pedido", id, order.userId);
    const response = await http.put<unknown>(endpoint(endpoints.orders, id), order);
    return orderSchema.parse(response.data);
  },
  async remove(id: string): Promise<void> {
    assertNoMockIds("pedido", id);
    await http.delete<void>(endpoint(endpoints.orders, id));
  },
};

export const orderItemsService = {
  async list(query?: OrderItemQuery): Promise<OrderItem[]> {
    const parsedQuery = orderItemQuerySchema.parse(query ?? {});
    const response = await http.get<unknown>(
      `${endpoints.orderItems}${queryString(parsedQuery)}`,
    );
    return orderItemSchema.array().parse(response.data);
  },
  async findById(orderSellerId: string, id: string, variantId: string): Promise<OrderItem> {
    const response = await http.get<unknown>(itemEndpoint(orderSellerId, id, variantId));
    return orderItemSchema.parse(response.data);
  },
  async create(item: CreateOrderItem): Promise<OrderItem> {
    assertNoMockIds("item do pedido", item.orderId, item.variantId, item.id, item.orderSellerId);
    const response = await http.post<unknown>(endpoints.orderItems, item);
    return orderItemSchema.parse(response.data);
  },
  async update({ id, orderSellerId, variantId, ...item }: UpdateOrderItem): Promise<OrderItem> {
    assertNoMockIds("item do pedido", id, orderSellerId, variantId, item.orderId);
    const response = await http.put<unknown>(itemEndpoint(orderSellerId, id, variantId), item);
    return orderItemSchema.parse(response.data);
  },
  async remove(orderSellerId: string, id: string, variantId: string): Promise<void> {
    assertNoMockIds("item do pedido", orderSellerId, id, variantId);
    await http.delete<void>(itemEndpoint(orderSellerId, id, variantId));
  },
};

export const orderSellersService = {
  async list(query?: OrderSellerQuery): Promise<OrderSeller[]> {
    const parsedQuery = orderSellerQuerySchema.parse(query ?? {});
    const response = await http.get<unknown>(
      `${endpoints.orderSellers}${queryString(parsedQuery)}`,
    );
    return orderSellerSchema.array().parse(response.data);
  },
  async findById(id: string): Promise<OrderSeller> {
    const response = await http.get<unknown>(endpoint(endpoints.orderSellers, id));
    return orderSellerSchema.parse(response.data);
  },
  async create(seller: CreateOrderSeller): Promise<OrderSeller> {
    assertNoMockIds("vendedor do pedido", seller.storeId, seller.orderId);
    const response = await http.post<unknown>(endpoints.orderSellers, seller);
    return orderSellerSchema.parse(response.data);
  },
  async update({ id, ...seller }: UpdateOrderSeller): Promise<OrderSeller> {
    assertNoMockIds("vendedor do pedido", id, seller.storeId, seller.orderId);
    const response = await http.put<unknown>(endpoint(endpoints.orderSellers, id), seller);
    return orderSellerSchema.parse(response.data);
  },
  async remove(id: string): Promise<void> {
    assertNoMockIds("vendedor do pedido", id);
    await http.delete<void>(endpoint(endpoints.orderSellers, id));
  },
};

export const orderAddressesService = {
  async list(query?: OrderAddressQuery): Promise<OrderAddress[]> {
    const parsedQuery = orderAddressQuerySchema.parse(query ?? {});
    const response = await http.get<unknown>(
      `${endpoints.orderAddresses}${queryString(parsedQuery)}`,
    );
    return orderAddressSchema.array().parse(response.data);
  },
  async findById(id: string): Promise<OrderAddress> {
    const response = await http.get<unknown>(endpoint(endpoints.orderAddresses, id));
    return orderAddressSchema.parse(response.data);
  },
  async create(address: CreateOrderAddress): Promise<OrderAddress> {
    assertNoMockIds("endereço do pedido", address.orderId);
    const response = await http.post<unknown>(endpoints.orderAddresses, address);
    return orderAddressSchema.parse(response.data);
  },
  async update({ id, ...address }: UpdateOrderAddress): Promise<OrderAddress> {
    assertNoMockIds("endereço do pedido", id, address.orderId);
    const response = await http.put<unknown>(endpoint(endpoints.orderAddresses, id), address);
    return orderAddressSchema.parse(response.data);
  },
  async remove(id: string): Promise<void> {
    assertNoMockIds("endereço do pedido", id);
    await http.delete<void>(endpoint(endpoints.orderAddresses, id));
  },
};
