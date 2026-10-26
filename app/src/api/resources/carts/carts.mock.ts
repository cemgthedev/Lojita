import { mockProducts, mockVariants } from "@/api/resources/products/products.mock";
import { mockUsersByRole } from "@/api/resources/users/users.mock";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import type { Cart } from "@/api/resources/carts/validations/cart.schema";
import type { CartItem } from "@/api/resources/carts/validations/cart-item.schema";

const createdAt = "2026-01-01T00:00:00.000Z";
const cartId = "mock-cart-customer-1";
const customerId = mockUsersByRole[ROLE.CUSTOMER].id;

export const mockCarts: Cart[] = [
  { id: cartId, userId: customerId, createdAt },
];

const productsByVariantId = new Map(
  mockProducts.map((product) => [product.defaultVariantId, product]),
);

export const mockCartItems: CartItem[] = mockVariants
  .filter((variant) => productsByVariantId.has(variant.id))
  .slice(0, 5)
  .map((variant) => ({
    quantity: 1,
    cartId,
    variantId: variant.id,
    createdAt,
  }));
