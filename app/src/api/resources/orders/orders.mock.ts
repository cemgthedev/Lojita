import type { OrderAddress } from "@/api/resources/orders/validations/order-address.schema";
import type { OrderItem } from "@/api/resources/orders/validations/order-item.schema";
import type { OrderSeller } from "@/api/resources/orders/validations/order-seller.schema";
import type { Order } from "@/api/resources/orders/validations/order.schema";
import { mockVariants, mockProducts } from "@/api/resources/products/products.mock";
import { mockAddresses } from "@/api/resources/addresses/addresses.mock";
import { mockStores } from "@/api/resources/stores/stores.mock";
import { mockUsersByRole } from "@/api/resources/users/users.mock";
import { ROLE } from "@/api/resources/users/validations/auth.schema";

const createdAt = "2026-01-01T00:00:00.000Z";
const orderId = "mock-order-1";
const orderSellerId = "mock-order-seller-1";
const customer = mockUsersByRole[ROLE.CUSTOMER];
const store = mockStores[0];
const address = mockAddresses.find((item) => item.userId === customer.id);

if (!address) throw new Error("Endereço de demonstração do cliente não encontrado.");

const orderProducts = mockProducts.slice(0, 5);
const orderVariants = orderProducts.map((product) => {
  const variant = mockVariants.find((item) => item.id === product.defaultVariantId);
  if (!variant) throw new Error(`Variação de demonstração não encontrada: ${product.defaultVariantId}`);
  return { product, variant };
});

export const mockOrders: Order[] = [
  {
    id: orderId,
    status: "pending",
    total: orderVariants.reduce((total, { variant }) => total + variant.price, 0),
    userId: customer.id,
    createdAt,
    shippingTotal: 0,
    discountTotal: 0,
    subtotal: orderVariants.reduce((total, { variant }) => total + variant.price, 0),
  },
];

export const mockOrderSellers: OrderSeller[] = [
  {
    id: orderSellerId,
    status: "pending",
    subtotal: mockOrders[0].subtotal,
    total: mockOrders[0].total ?? 0,
    shippingTotal: mockOrders[0].shippingTotal,
    discountTotal: mockOrders[0].discountTotal,
    storeId: store.id,
    orderId,
    createdAt,
    sortOrder: 0,
  },
];

export const mockOrderItems: OrderItem[] = orderVariants.map(
  ({ product, variant }, index) => ({
    quantity: 1,
    unitPrice: variant.price,
    subtotal: variant.price,
    orderId,
    variantId: variant.id,
    createdAt,
    id: `mock-order-item-${index + 1}`,
    productName: product.title,
    sku: variant.sku,
    orderSellerId,
  }),
);

export const mockOrderAddresses: OrderAddress[] = [
  {
    id: "mock-order-address-1",
    recipientName: customer.name,
    name: address.name,
    cep: address.cep,
    city: address.city,
    state: address.state,
    street: address.street,
    number: address.number || null,
    neighborhood: address.neighborhood,
    orderId,
    createdAt,
  },
];
