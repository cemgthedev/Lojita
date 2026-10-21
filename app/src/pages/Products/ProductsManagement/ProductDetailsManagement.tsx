import { useCategoryQuery } from "@/api/resources/categories/queries";
import {
  useAttributeValuesQuery,
  useAttributesQuery,
} from "@/api/resources/products/attributes/queries";
import { mockVariantAttributes } from "@/api/resources/products/products.mock";
import { useProductQuery } from "@/api/resources/products/products/queries";
import { useVariantImagesQuery } from "@/api/resources/products/variant-images/queries";
import { useVariantsQuery } from "@/api/resources/products/variants/queries";
import { useSpecificationsQuery } from "@/api/resources/specifications/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  Image,
  ImageContent,
  Input,
  Label,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { useHighestRole } from "@/hooks/useHighestRole";
import { ListProductReviews } from "@/pages/Products/components/ListProductReviews";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { cn } from "@/utils/cn";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExpandIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type SelectedAttributes = Record<string, string>;
type ProductScopedValue<T> = {
  productId: string;
  value: T;
};
type VariantScopedValue<T> = {
  variantId: string;
  value: T;
};

export function ProductDetailsManagement() {
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const role = useHighestRole(user.role);
  const isCustomer = role === ROLE.CUSTOMER;
  const { productId } = useParams();
  const productQuery = useProductQuery(productId ?? "");
  const product = productQuery.data;
  const categoryQuery = useCategoryQuery(product?.categoryId ?? "");
  const variantsQuery = useVariantsQuery(
    { productId: product?.id },
    Boolean(product?.id),
  );
  const specificationsQuery = useSpecificationsQuery(
    { productId: product?.id },
    Boolean(product?.id),
  );
  const attributesQuery = useAttributesQuery();
  const attributeValuesQuery = useAttributeValuesQuery();
  const [selectedVariantState, setSelectedVariantState] =
    useState<ProductScopedValue<string>>();
  const [selectedAttributeState, setSelectedAttributeState] =
    useState<ProductScopedValue<SelectedAttributes>>();
  const [imageState, setImageState] = useState<VariantScopedValue<number>>();
  const [galleryState, setGalleryState] =
    useState<VariantScopedValue<boolean>>();
  const [descriptionState, setDescriptionState] =
    useState<ProductScopedValue<boolean>>();
  const [quantityState, setQuantityState] =
    useState<VariantScopedValue<number>>();

  const variants = useMemo(() => {
    const productVariants = (variantsQuery.data ?? []).filter(
      (variant) => variant.productId === product?.id,
    );
    const defaultVariant = product?.defaultVariant;
    if (
      defaultVariant &&
      !productVariants.some((variant) => variant.id === defaultVariant.id)
    ) {
      productVariants.unshift(defaultVariant);
    }
    return productVariants;
  }, [product?.defaultVariant, product?.id, variantsQuery.data]);

  const selectedVariantId =
    selectedVariantState &&
    product &&
    selectedVariantState.productId === product.id
      ? selectedVariantState.value
      : product?.defaultVariantId;
  const selectedVariant =
    variants.find((variant) => variant.id === selectedVariantId) ??
    variants.find((variant) => variant.id === product?.defaultVariantId) ??
    variants[0];
  const selectedAttributes =
    selectedAttributeState &&
    product &&
    selectedAttributeState.productId === product.id
      ? selectedAttributeState.value
      : {};
  const selectedImage =
    imageState && selectedVariant && imageState.variantId === selectedVariant.id
      ? imageState.value
      : 0;
  const isGalleryOpen =
    galleryState &&
    selectedVariant &&
    galleryState.variantId === selectedVariant.id
      ? galleryState.value
      : false;
  const isDescriptionExpanded =
    descriptionState && product && descriptionState.productId === product.id
      ? descriptionState.value
      : false;
  const quantity =
    quantityState &&
    selectedVariant &&
    quantityState.variantId === selectedVariant.id
      ? quantityState.value
      : 1;
  const variantImagesQuery = useVariantImagesQuery(
    { variantId: selectedVariant?.id },
    Boolean(selectedVariant?.id),
  );
  const images = useMemo(() => {
    const imageUrls = [
      selectedVariant?.urlImage,
      ...(variantImagesQuery.data ?? [])
        .toSorted((imageA, imageB) => imageA.sortOrder - imageB.sortOrder)
        .map((image) => image.url),
    ].filter((url): url is string => Boolean(url));
    return [...new Set(imageUrls)];
  }, [selectedVariant?.urlImage, variantImagesQuery.data]);

  const availableVariantDetails = useMemo(() => {
    const variantIds = new Set(variants.map((variant) => variant.id));
    const attributeValues = attributeValuesQuery.data ?? [];
    const valueById = new Map(
      attributeValues.map((attributeValue) => [
        attributeValue.id,
        attributeValue,
      ]),
    );

    return mockVariantAttributes
      .filter((item) => variantIds.has(item.variantId))
      .flatMap((item) => {
        const attributeValue = valueById.get(item.attributeValueId);
        const attribute = attributesQuery.data?.find(
          (candidate) => candidate.id === attributeValue?.attributeId,
        );
        return attributeValue && attribute
          ? [{ ...item, attribute, attributeValue }]
          : [];
      });
  }, [attributeValuesQuery.data, attributesQuery.data, variants]);

  const variantAttributeGroups = useMemo(() => {
    const grouped = new Map<
      string,
      {
        attributeName: string;
        type: string;
        values: Map<string, string>;
      }
    >();
    for (const detail of availableVariantDetails) {
      const group = grouped.get(detail.attribute.id) ?? {
        attributeName: detail.attribute.name,
        type: detail.attribute.type,
        values: new Map<string, string>(),
      };
      group.values.set(detail.attributeValue.id, detail.attributeValue.title);
      grouped.set(detail.attribute.id, group);
    }
    return [...grouped.entries()].filter(([, group]) => group.values.size > 1);
  }, [availableVariantDetails]);

  function variantMatches(variantId: string, selection: SelectedAttributes) {
    return Object.entries(selection).every(([attributeId, valueId]) =>
      availableVariantDetails.some(
        (detail) =>
          detail.variantId === variantId &&
          detail.attribute.id === attributeId &&
          detail.attributeValue.id === valueId,
      ),
    );
  }

  function chooseAttribute(attributeId: string, valueId: string) {
    if (!product) return;
    const nextSelection = { ...selectedAttributes };
    if (nextSelection[attributeId] === valueId) {
      delete nextSelection[attributeId];
    } else {
      nextSelection[attributeId] = valueId;
    }
    const matchingVariant = variants.find((variant) =>
      variantMatches(variant.id, nextSelection),
    );
    if (!matchingVariant) {
      toast("Não há uma variante disponível para essa combinação.", {
        variant: "warning",
      });
      return;
    }
    setSelectedAttributeState({ productId: product.id, value: nextSelection });
    setSelectedVariantState({
      productId: product.id,
      value: matchingVariant.id,
    });
  }

  function changeQuantity(nextQuantity: number) {
    if (!selectedVariant) return;
    const maxQuantity = Math.max(selectedVariant?.stock ?? 1, 1);
    setQuantityState({
      variantId: selectedVariant.id,
      value: Math.min(Math.max(nextQuantity, 1), maxQuantity),
    });
  }

  if (!productId || (productQuery.isError && !product)) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text role="alert">
            {productId
              ? "Não foi possível carregar o produto."
              : "Produto não encontrado."}
          </Text>
        </CardContent>
      </Card>
    );
  }

  if (productQuery.isPending) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text role="status">Carregando produto...</Text>
        </CardContent>
      </Card>
    );
  }

  if (!product) {
    return (
      <Card className="border-none p-6" size="md" rounded="lg">
        <CardContent>
          <Text role="alert">Produto não encontrado.</Text>
        </CardContent>
      </Card>
    );
  }

  const selectedImageUrl = images[selectedImage];
  const isInStock = Boolean(
    selectedVariant &&
    selectedVariant.status === "active" &&
    selectedVariant.stock > 0,
  );

  return (
    <main className="space-y-6 p-6">
      <Button
        type="button"
        onClick={() => navigate(-1)}
        className="bg-transparent p-0"
      >
        <ArrowLeftIcon aria-hidden="true" size={20} />
        <Text>Voltar</Text>
      </Button>

      {productQuery.isError && (
        <Text role="status" className="animate-pulse-once">
          Não foi possível atualizar os dados do produto; exibindo dados de
          exemplo disponíveis.
        </Text>
      )}

      <section className="flex gap-4 flex-wrap">
        <div className="space-y-4">
          <div className="relative flex h-78 w-78 max-w-full items-center justify-center overflow-hidden rounded-lg bg-muted-200">
            {selectedImageUrl ? (
              <Image className="h-full w-full object-contain">
                <ImageContent
                  src={selectedImageUrl}
                  alt={`${product.title} - imagem ${selectedImage + 1}`}
                />
              </Image>
            ) : (
              <Text variant="secondary">Imagem indisponível</Text>
            )}
            {images.length > 1 && (
              <div className="absolute flex w-full justify-between px-2">
                <Button
                  type="button"
                  variant="dark"
                  size="sm"
                  rounded={"full"}
                  aria-label="Imagem anterior"
                  disabled={selectedImage === 0}
                  onClick={() =>
                    setImageState({
                      variantId: selectedVariant?.id ?? "",
                      value: selectedImage - 1,
                    })
                  }
                >
                  <ChevronLeftIcon aria-hidden="true" size={18} />
                </Button>
                <Button
                  type="button"
                  variant="dark"
                  size="sm"
                  rounded={"full"}
                  aria-label="Próxima imagem"
                  disabled={selectedImage === images.length - 1}
                  onClick={() =>
                    setImageState({
                      variantId: selectedVariant?.id ?? "",
                      value: selectedImage + 1,
                    })
                  }
                >
                  <ChevronRightIcon aria-hidden="true" size={18} />
                </Button>
              </div>
            )}
          </div>

          {images.length > 0 && (
            <Dialog
              open={isGalleryOpen}
              onOpenChange={(open) =>
                setGalleryState({
                  variantId: selectedVariant?.id ?? "",
                  value: open,
                })
              }
            >
              <div className="grid w-78 max-w-full grid-cols-2 gap-4">
                {[1, 2].map((index) => {
                  const image = images[index] ?? images[images.length - 1];
                  const opensGallery = index === 2;

                  return (
                    <button
                      key={`product-image-${index}`}
                      type="button"
                      aria-label={
                        opensGallery
                          ? "Abrir galeria de imagens"
                          : `Exibir imagem ${index + 1}`
                      }
                      aria-haspopup={opensGallery ? "dialog" : undefined}
                      aria-pressed={
                        !opensGallery && selectedImage === index
                          ? true
                          : undefined
                      }
                      onClick={() => {
                        if (opensGallery) {
                          setGalleryState({
                            variantId: selectedVariant?.id ?? "",
                            value: true,
                          });
                          return;
                        }
                        setImageState({
                          variantId: selectedVariant?.id ?? "",
                          value: index,
                        });
                      }}
                      className={cn(
                        "relative h-37 w-37 max-w-full overflow-hidden rounded-lg border",
                        !opensGallery && selectedImage === index
                          ? "border-primary-700"
                          : "border-secondary-600",
                      )}
                    >
                      <Image
                        className={cn(
                          "h-full w-full object-cover",
                          opensGallery ? "scale-110 blur-sm" : "",
                        )}
                      >
                        <ImageContent
                          src={image}
                          alt={
                            opensGallery
                              ? ""
                              : `${product.title} - imagem ${index + 1}`
                          }
                        />
                      </Image>
                      {opensGallery && (
                        <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/35 px-2 text-center font-semibold text-white">
                          <ExpandIcon aria-hidden="true" size={18} />
                          Abrir galeria
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <DialogContent
                aria-labelledby="product-image-gallery-title"
                className="max-h-[90vh] w-full overflow-y-auto sm:max-w-4xl"
              >
                <DialogHeader>
                  <h2
                    id="product-image-gallery-title"
                    className="text-lg font-semibold"
                  >
                    Galeria de imagens: {product.title}
                  </h2>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((image, index) => (
                    <button
                      key={`${image}-gallery-${index}`}
                      type="button"
                      aria-label={`Exibir imagem ${index + 1} no produto`}
                      aria-pressed={selectedImage === index}
                      onClick={() =>
                        setImageState({
                          variantId: selectedVariant?.id ?? "",
                          value: index,
                        })
                      }
                      className={`overflow-hidden rounded-lg border ${
                        selectedImage === index
                          ? "border-primary-700"
                          : "border-secondary-600"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} - imagem ${index + 1}`}
                        className="aspect-square w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <Text variant="secondary">
              {categoryQuery.data?.title ?? "Categoria não informada"}
            </Text>
            <Label>{product.title}</Label>
            <Label variant={"secondary"} className="font-semibold">
              {selectedVariant
                ? currencyFormatter.format(selectedVariant.price)
                : "Preço indisponível"}
            </Label>
          </div>

          <div className="space-y-1">
            <Label size={"sm"}>Descrição</Label>
            <Text
              className={
                isDescriptionExpanded ? "whitespace-pre-wrap" : "line-clamp-3"
              }
            >
              {product.description || "Este produto não possui descrição."}
            </Text>
            {(product.description?.length ?? 0) > 160 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setDescriptionState({
                    productId: product.id,
                    value: !isDescriptionExpanded,
                  })
                }
              >
                {isDescriptionExpanded ? "Ver menos" : "Ver mais"}
              </Button>
            )}
          </div>

          {variantAttributeGroups.map(([attributeId, group]) => {
            const otherSelections = Object.fromEntries(
              Object.entries(selectedAttributes).filter(
                ([selectedId]) => selectedId !== attributeId,
              ),
            );
            const availableValues = [...group.values.entries()].filter(
              ([valueId]) =>
                availableVariantDetails.some(
                  (detail) =>
                    detail.attribute.id === attributeId &&
                    detail.attributeValue.id === valueId &&
                    variantMatches(detail.variantId, otherSelections),
                ),
            );

            return (
              <fieldset key={attributeId} className="space-y-2">
                <Label size={"xs"}>{group.attributeName}</Label>
                <div className="flex flex-wrap gap-2">
                  {availableValues.map(([valueId, valueTitle]) => (
                    <Button
                      key={valueId}
                      type="button"
                      size="sm"
                      rounded={"full"}
                      className="min-w-10 min-h-10"
                      variant={
                        selectedAttributes[attributeId] === valueId
                          ? "secondary"
                          : "secondary-bordered"
                      }
                      aria-pressed={selectedAttributes[attributeId] === valueId}
                      onClick={() => chooseAttribute(attributeId, valueId)}
                    >
                      {valueTitle}
                    </Button>
                  ))}
                </div>
              </fieldset>
            );
          })}

          <div className="space-y-2">
            <Label size="sm">Quantidade</Label>
            <Text>
              {selectedVariant
                ? `${selectedVariant.stock} em estoque`
                : "Estoque indisponível"}
            </Text>
            <div className="flex w-fit items-center gap-2">
              <Button
                type="button"
                variant="dark-bordered"
                size="sm"
                rounded={"full"}
                aria-label="Diminuir quantidade"
                disabled={quantity <= 1}
                onClick={() => changeQuantity(quantity - 1)}
              >
                <MinusIcon aria-hidden="true" size={16} />
              </Button>
              <Input
                aria-label="Quantidade"
                type="number"
                size={"sm"}
                min={1}
                max={selectedVariant?.stock ?? 1}
                value={quantity}
                onChange={(event) =>
                  changeQuantity(Number(event.target.value) || 1)
                }
                className="h-10 w-16 rounded-md border border-gray-200 text-center"
              />
              <Button
                type="button"
                variant="dark-bordered"
                size="sm"
                rounded={"full"}
                aria-label="Aumentar quantidade"
                disabled={!selectedVariant || quantity >= selectedVariant.stock}
                onClick={() => changeQuantity(quantity + 1)}
              >
                <PlusIcon aria-hidden="true" size={16} />
              </Button>
            </div>
          </div>

          {isCustomer && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  rounded="full"
                  variant="primary-bordered"
                  disabled
                >
                  Adicionar ao carrinho
                </Button>
                <Button
                  type="button"
                  rounded="full"
                  variant="secondary"
                  disabled
                >
                  Comprar agora
                </Button>
              </div>
              <Text size="sm" variant="secondary">
                O carrinho e a finalização de compra ainda não estão
                disponíveis.
              </Text>
            </div>
          )}

          {!isInStock && (
            <Text role="status" variant="warning">
              Esta variante está indisponível para compra.
            </Text>
          )}
          {variantsQuery.isError && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar as variantes do produto.
            </Text>
          )}
          {variants.length > 1 && variantAttributeGroups.length === 0 && (
            <Text size="sm" variant="secondary" className="animate-pulse-once">
              As opções de atributos das variantes não estão disponíveis para
              este produto.
            </Text>
          )}
          {(attributesQuery.isError || attributeValuesQuery.isError) && (
            <Text role="status" className="animate-pulse-once">
              Não foi possível carregar as opções de atributos das variantes.
            </Text>
          )}
        </div>
      </section>

      <Separator variant={"secondary"} />

      <Tabs defaultValue="specifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="specifications">Especificações</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>
        <TabsContent value="specifications">
          {specificationsQuery.isPending ? (
            <Text role="status">Carregando especificações...</Text>
          ) : !specificationsQuery.isError ? (
            <Text role="alert">
              Não foi possível carregar as especificações do produto.
            </Text>
          ) : (specificationsQuery.data?.length ?? 0) !== 0 ? (
            <Text>
              Este produto ainda não possui especificações cadastradas.
            </Text>
          ) : (
            <div className="rounded-lg border border-secondary-600 max-w-3xl p-3">
              <Table>
                <TableBody className="divide-y divide-gray-300">
                  {specificationsQuery.data?.map((specification) => (
                    <TableRow
                      key={specification.id}
                      className="flex flex-wrap justify-between gap-3 py-3"
                    >
                      <TableCell className="font-medium">
                        {specification.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {specification.value}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="flex flex-wrap justify-between gap-3 py-3">
                    <TableCell className="font-medium">teste</TableCell>
                    <TableCell className="text-right">etetete</TableCell>
                  </TableRow>
                  <TableRow className="flex flex-wrap justify-between gap-3 py-3">
                    <TableCell className="font-medium">teste</TableCell>
                    <TableCell className="text-right">etetete</TableCell>
                  </TableRow>
                  <TableRow className="flex flex-wrap justify-between gap-3 py-3">
                    <TableCell className="font-medium">teste</TableCell>
                    <TableCell className="text-right">etetete</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
        <TabsContent value="reviews">
          <ListProductReviews productId={product.id} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
