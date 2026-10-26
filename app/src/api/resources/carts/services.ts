import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import type { CreateCart } from "@/api/resources/carts/validations/create-cart.schema";
import type { CreateCartItem } from "@/api/resources/carts/validations/create-cart-item.schema";
import {
  cartItemSchema,
  type CartItem,
} from "@/api/resources/carts/validations/cart-item.schema";
import {
  cartItemQuerySchema,
  type CartItemQuery,
} from "@/api/resources/carts/validations/cart-item-query.schema";
import {
  cartQuerySchema,
  type CartQuery,
} from "@/api/resources/carts/validations/cart-query.schema";
import {
  cartSchema,
  type Cart,
} from "@/api/resources/carts/validations/cart.schema";
import type { UpdateCart } from "@/api/resources/carts/validations/update-cart.schema";
import type { UpdateCartItem } from "@/api/resources/carts/validations/update-cart-item.schema";
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

export const cartsService = {
  async list(query?: CartQuery): Promise<Cart[]> {
    const parsedQuery = cartQuerySchema.parse(query ?? {});
    const response = await http.get<unknown>(
      `${endpoints.carts}${queryString(parsedQuery)}`,
    );
    return cartSchema.array().parse(response.data);
  },
  async findById(id: string): Promise<Cart> {
    const response = await http.get<unknown>(endpoint(endpoints.carts, id));
    return cartSchema.parse(response.data);
  },
  async create(cart: CreateCart): Promise<Cart> {
    assertNoMockIds("carrinho", cart.userId);
    const response = await http.post<unknown>(endpoints.carts, cart);
    return cartSchema.parse(response.data);
  },
  async update({ id, ...cart }: UpdateCart): Promise<Cart> {
    assertNoMockIds("carrinho", id, cart.userId);
    const response = await http.put<unknown>(endpoint(endpoints.carts, id), cart);
    return cartSchema.parse(response.data);
  },
  async remove(id: string): Promise<void> {
    assertNoMockIds("carrinho", id);
    await http.delete<void>(endpoint(endpoints.carts, id));
  },
};

export const cartItemsService = {
  async list(query?: CartItemQuery): Promise<CartItem[]> {
    const parsedQuery = cartItemQuerySchema.parse(query ?? {});
    const response = await http.get<unknown>(
      `${endpoints.cartItems}${queryString(parsedQuery)}`,
    );
    return cartItemSchema.array().parse(response.data);
  },
  async findById(cartId: string, variantId: string): Promise<CartItem> {
    const path = `${endpoint(endpoints.cartItems, cartId)}/${encodeURIComponent(variantId)}`;
    const response = await http.get<unknown>(path);
    return cartItemSchema.parse(response.data);
  },
  async create(item: CreateCartItem): Promise<CartItem> {
    assertNoMockIds("item do carrinho", item.cartId, item.variantId);
    const response = await http.post<unknown>(endpoints.cartItems, item);
    return cartItemSchema.parse(response.data);
  },
  async update({ cartId, variantId, ...item }: UpdateCartItem): Promise<CartItem> {
    assertNoMockIds("item do carrinho", cartId, variantId);
    const path = `${endpoint(endpoints.cartItems, cartId)}/${encodeURIComponent(variantId)}`;
    const response = await http.put<unknown>(path, item);
    return cartItemSchema.parse(response.data);
  },
  async remove(cartId: string, variantId: string): Promise<void> {
    assertNoMockIds("item do carrinho", cartId, variantId);
    const path = `${endpoint(endpoints.cartItems, cartId)}/${encodeURIComponent(variantId)}`;
    await http.delete<void>(path);
  },
};

export const cartService = cartsService;
