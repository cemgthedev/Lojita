import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "@/api/resources/carts/mutations";
import {
  useCartItemsQuery,
  useCartsQuery,
} from "@/api/resources/carts/queries";
import { useAttributeValuesQuery } from "@/api/resources/products/attributes/queries";
import { mockVariantAttributes } from "@/api/resources/products/products.mock";
import { useProductsQuery } from "@/api/resources/products/products/queries";
import type { Product } from "@/api/resources/products/products/validations/product.schema";
import { useVariantsQuery } from "@/api/resources/products/variants/queries";
import type { Variant } from "@/api/resources/products/variants/validations/variant.schema";
import { useStoresQuery } from "@/api/resources/stores/queries";
import {
  Button,
  Heading,
  Image,
  ImageContent,
  ImageFallback,
  Input,
  Label,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { EmptyCart } from "@/pages/Carts/components/EmptyCart";
import { useAuth } from "@/providers/AuthProvider";
import {
  MinusIcon,
  PackageIcon,
  PlusIcon,
  ShoppingCartIcon,
  Trash2Icon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type CartLine = {
  key: string;
  cartId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: Variant;
};

export function CartPage() {
  const { user } = useAuth();
  const cartsQuery = useCartsQuery({ userId: user?.id }, Boolean(user?.id));
  const cart = cartsQuery.data?.[0];
  const cartItemsQuery = useCartItemsQuery(
    { cartId: cart?.id },
    Boolean(cart?.id),
  );
  const items = useMemo(() => cartItemsQuery.data ?? [], [cartItemsQuery.data]);
  const variantsQuery = useVariantsQuery(undefined, items.length > 0);
  const productsQuery = useProductsQuery(undefined, items.length > 0);
  const attributeValuesQuery = useAttributeValuesQuery(
    undefined,
    items.length > 0,
  );
  const storesQuery = useStoresQuery(undefined, items.length > 0);
  const updateCartItem = useUpdateCartItemMutation();
  const deleteCartItem = useDeleteCartItemMutation();
  const [quantityOverrides, setQuantityOverrides] = useState<
    Record<string, number>
  >({});
  const [removedItems, setRemovedItems] = useState<string[]>([]);

  const lines = useMemo(() => {
    const productsById = new Map(
      (productsQuery.data ?? []).map((product) => [product.id, product]),
    );
    const variantsById = new Map(
      (variantsQuery.data ?? []).map((variant) => [variant.id, variant]),
    );

    return items.flatMap((item): CartLine[] => {
      const variant = variantsById.get(item.variantId);
      const product = variant && productsById.get(variant.productId);
      if (!variant || !product) return [];

      const key = `${item.cartId}:${item.variantId}`;
      if (removedItems.includes(key)) return [];

      return [
        {
          key,
          cartId: item.cartId,
          variantId: item.variantId,
          quantity: quantityOverrides[key] ?? item.quantity,
          product,
          variant,
        },
      ];
    });
  }, [
    items,
    productsQuery.data,
    quantityOverrides,
    removedItems,
    variantsQuery.data,
  ]);

  const storesById = useMemo(
    () => new Map((storesQuery.data ?? []).map((store) => [store.id, store])),
    [storesQuery.data],
  );
  const productsForStore = useMemo(() => {
    const groups = new Map<
      string,
      { storeName: string; storePhone: string; lines: CartLine[] }
    >();

    for (const line of lines) {
      const store = storesById.get(line.product.storeId);
      const group = groups.get(line.product.storeId) ?? {
        storeName: store?.name ?? "Loja",
        storePhone: store?.phone ?? "",
        lines: [],
      };
      group.lines.push(line);
      groups.set(line.product.storeId, group);
    }

    return [...groups.entries()];
  }, [lines, storesById]);

  const isLoading =
    (Boolean(user?.id) && cartsQuery.isPending) ||
    Boolean(cart && cartItemsQuery.isPending) ||
    (items.length > 0 &&
      (variantsQuery.isPending ||
        productsQuery.isPending ||
        attributeValuesQuery.isPending ||
        storesQuery.isPending));

  function updateQuantity(line: CartLine, quantity: number) {
    const nextQuantity = Math.max(1, Math.min(line.variant.stock, quantity));
    if (nextQuantity === line.quantity) return;

    if (line.cartId.startsWith("mock-") || line.variantId.startsWith("mock-")) {
      setQuantityOverrides((previous) => ({
        ...previous,
        [line.key]: nextQuantity,
      }));
      return;
    }

    updateCartItem.mutate(
      {
        cartId: line.cartId,
        variantId: line.variantId,
        quantity: nextQuantity,
      },
      {
        onSuccess: () =>
          toast("Quantidade atualizada.", { variant: "success" }),
        onError: () =>
          toast("Não foi possível atualizar a quantidade.", {
            variant: "danger",
          }),
      },
    );
  }

  function removeItem(line: CartLine) {
    if (line.cartId.startsWith("mock-") || line.variantId.startsWith("mock-")) {
      setRemovedItems((previous) => [...previous, line.key]);
      return;
    }

    deleteCartItem.mutate(
      { cartId: line.cartId, variantId: line.variantId },
      {
        onSuccess: () =>
          toast("Produto removido do carrinho.", { variant: "success" }),
        onError: () =>
          toast("Não foi possível remover o produto do carrinho.", {
            variant: "danger",
          }),
      },
    );
  }

  async function handlePlaceOrder(
    storeName: string,
    storePhone: string,
    storeLines: CartLine[],
  ) {
    const phoneDigits = storePhone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      toast("Esta loja não tem um telefone válido para contato.", {
        variant: "danger",
      });
      return;
    }

    const whatsappPhone = phoneDigits.startsWith("55")
      ? phoneDigits
      : `55${phoneDigits}`;
    const subtotal = storeLines.reduce(
      (total, line) => total + line.variant.price * line.quantity,
      0,
    );
    const orderMessage = [
      `Olá, ${storeName}! Gostaria de fazer este pedido:`,
      "",
      ...storeLines.map((line) => {
        const attributes = mockVariantAttributes
          .filter((attribute) => attribute.variantId === line.variantId)
          .map((attribute) =>
            attributeValuesQuery.data?.find(
              (value) => value.id === attribute.attributeValueId,
            ),
          )
          .filter((value) => value !== undefined)
          .map((value) => value.title)
          .join(", ");

        return `- ${line.quantity}x ${line.product.title}${attributes ? ` (${attributes})` : ""} — ${currencyFormatter.format(line.variant.price)} cada`;
      }),
      "",
      `Total: ${currencyFormatter.format(subtotal)}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(orderMessage)}`;
    const clipboardWrite = navigator.clipboard?.writeText(orderMessage);
    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;

    if (!clipboardWrite) {
      toast("Não foi possível copiar o pedido para a área de transferência.", {
        variant: "danger",
      });
      return;
    }

    try {
      await clipboardWrite;
      toast("Pedido copiado. Continue a conversa pelo WhatsApp.", {
        variant: "success",
      });
    } catch {
      toast("Não foi possível copiar o pedido para a área de transferência.", {
        variant: "danger",
      });
    }
  }

  const attributeValuesById = new Map(
    (attributeValuesQuery.data ?? []).map((value) => [value.id, value]),
  );

  return (
    <main className="space-y-6 p-6">
      <header className="space-y-1">
        <Heading id="cart-heading" size="sm">
          Meu carrinho
        </Heading>
        <Text>Confira seus produtos antes de fazer o pedido.</Text>
      </header>

      {cartsQuery.isError && (
        <Text role="status" className="animate-pulse-once">
          Não foi possível carregar o carrinho. Exibindo dados de exemplo.
        </Text>
      )}

      {isLoading ? (
        <Text role="status">Carregando carrinho...</Text>
      ) : !cart || items.length === 0 || lines.length === 0 ? (
        <EmptyCart />
      ) : (
        <section aria-labelledby="cart-heading" className="space-y-6">
          {cartItemsQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar os itens. Exibindo dados de exemplo.
            </Text>
          )}

          {productsForStore.map(([storeId, group], index) => {
            return (
              <section
                key={storeId}
                aria-label={`Pacote ${index + 1} de ${productsForStore.length}: ${group.storeName}`}
                className="space-y-4"
              >
                <header className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <PackageIcon aria-hidden="true" size={20} />
                    <Label size="xs">
                      Pacote {index + 1} de {productsForStore.length}:{" "}
                      {group.storeName}
                    </Label>
                  </div>
                  <Button
                    variant="secondary"
                    rounded="full"
                    disabled={group.lines.length === 0}
                    onClick={() =>
                      void handlePlaceOrder(
                        group.storeName,
                        group.storePhone,
                        group.lines,
                      )
                    }
                  >
                    Fazer pedido pelo WhatsApp
                  </Button>
                </header>

                <div className="space-y-4">
                  {group.lines.map((line) => {
                    const attributes = mockVariantAttributes
                      .filter(
                        (attribute) => attribute.variantId === line.variantId,
                      )
                      .map((attribute) =>
                        attributeValuesById.get(attribute.attributeValueId),
                      )
                      .filter((value) => value !== undefined);

                    return (
                      <article
                        key={line.key}
                        className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between rounded-lg border border-gray-300"
                      >
                        <Link
                          to={`${urls.customer_dashboard}${urls.products}/${encodeURIComponent(line.product.id)}`}
                          className="flex min-w-0 flex-1 items-center gap-4"
                        >
                          <Image
                            className="h-24 w-24 shrink-0 border-0"
                            aspect="square"
                            aria-label={line.product.title}
                          >
                            <ImageContent
                              src={line.variant.urlImage ?? undefined}
                              alt={line.product.title}
                            />
                            <ImageFallback variant="muted">
                              <ShoppingCartIcon aria-hidden="true" />
                            </ImageFallback>
                          </Image>
                          <div className="min-w-0 space-y-1">
                            <Label className="line-clamp-2" size="xs">
                              {line.product.title}
                            </Label>
                            <Text>
                              {attributes.length > 0
                                ? attributes
                                    .map(
                                      (attribute) =>
                                        `${attribute.title}: ${attribute.value}`,
                                    )
                                    .join(" · ")
                                : `SKU: ${line.variant.sku}`}
                            </Text>
                          </div>
                        </Link>

                        <div className="space-y-2">
                          <Label size="xs">Quantidade</Label>
                          <Text>{line.variant.stock} em estoque</Text>
                          <div className="flex items-center gap-2">
                            <Button
                              aria-label={`Diminuir quantidade de ${line.product.title}`}
                              variant="dark-bordered"
                              size="sm"
                              rounded={"full"}
                              disabled={line.quantity <= 1}
                              onClick={() =>
                                updateQuantity(line, line.quantity - 1)
                              }
                            >
                              <MinusIcon aria-hidden="true" size={16} />
                            </Button>
                            <Input
                              aria-label={`Quantidade de ${line.product.title}`}
                              className="h-10 w-16 border border-gray-200 text-center"
                              type="number"
                              rounded={"full"}
                              min={1}
                              max={line.variant.stock}
                              value={line.quantity}
                              onChange={(event) => {
                                const value = Number(event.target.value);
                                if (Number.isInteger(value) && value > 0) {
                                  updateQuantity(line, value);
                                }
                              }}
                            />
                            <Button
                              aria-label={`Aumentar quantidade de ${line.product.title}`}
                              variant="dark-bordered"
                              size="sm"
                              rounded={"full"}
                              disabled={line.quantity >= line.variant.stock}
                              onClick={() =>
                                updateQuantity(line, line.quantity + 1)
                              }
                            >
                              <PlusIcon aria-hidden="true" size={16} />
                            </Button>
                          </div>
                        </div>

                        <div className="flex min-w-28 md:min-w-40 items-center justify-center">
                          <Label variant="secondary">
                            {currencyFormatter.format(
                              line.variant.price * line.quantity,
                            )}
                          </Label>
                        </div>

                        <Button
                          aria-label={`Remover ${line.product.title} do carrinho`}
                          className="bg-transparent border-none p-0 text-danger-600"
                          size="sm"
                          onClick={() => removeItem(line)}
                        >
                          <Trash2Icon aria-hidden="true" size={24} />
                        </Button>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </section>
      )}
    </main>
  );
}
