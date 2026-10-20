import { useUpdateProductMutation } from "@/api/resources/products/products/mutations";
import { useProductQuery } from "@/api/resources/products/products/queries";
import {
  useCreateVariantImageMutation,
  useDeleteVariantImageMutation,
  useUpdateVariantImageMutation,
} from "@/api/resources/products/variant-images/mutations";
import { useVariantImagesQuery } from "@/api/resources/products/variant-images/queries";
import type { VariantImage } from "@/api/resources/products/variant-images/validations/variant-image.schema";
import {
  useCreateVariantMutation,
  useDeleteVariantMutation,
  useUpdateVariantMutation,
} from "@/api/resources/products/variants/mutations";
import { useVariantsQuery } from "@/api/resources/products/variants/queries";
import type { Variant } from "@/api/resources/products/variants/validations/variant.schema";
import {
  useCreateSpecificationMutation,
  useDeleteSpecificationMutation,
  useUpdateSpecificationMutation,
} from "@/api/resources/specifications/mutations";
import { useSpecificationsQuery } from "@/api/resources/specifications/queries";
import { useStoresQuery } from "@/api/resources/stores/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import {
  Button,
  Card,
  CardContent,
  Label,
  Separator,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import {
  ProductForm,
  type ProductFormInitialValues,
  type ProductRegistrationValues,
} from "@/pages/Products/form/ProductForm";
import type { VariantFormValues } from "@/pages/Products/form/VariantForm.types";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";

function getVariantFormValues(
  variant: Variant,
  images: VariantImage[],
): VariantFormValues {
  const variantImages = images
    .filter((image) => image.variantId === variant.id)
    .sort((first, second) => first.sortOrder - second.sortOrder);

  return {
    price: String(variant.price),
    stock: String(variant.stock),
    status: variant.status,
    sku: variant.sku,
    images:
      variantImages.length > 0
        ? variantImages.map((image) => image.url)
        : variant.urlImage
          ? [variant.urlImage]
          : [],
    details: [],
  };
}

function getLoadingCard(message: string) {
  return (
    <Card className="border-none p-6" size="md" rounded="lg">
      <CardContent>
        <Text>{message}</Text>
      </CardContent>
    </Card>
  );
}

function ProductUpdateContent({ productId }: { productId: string }) {
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const isSeller = user.role.includes(ROLE.SELLER);
  const storesQuery = useStoresQuery({ userId: user.id }, isSeller);
  const productQuery = useProductQuery(productId);
  const variantsQuery = useVariantsQuery({ productId });
  const imagesQuery = useVariantImagesQuery();
  const specificationsQuery = useSpecificationsQuery({ productId });
  const updateProductMutation = useUpdateProductMutation();
  const createVariantMutation = useCreateVariantMutation();
  const updateVariantMutation = useUpdateVariantMutation();
  const deleteVariantMutation = useDeleteVariantMutation();
  const createVariantImageMutation = useCreateVariantImageMutation();
  const updateVariantImageMutation = useUpdateVariantImageMutation();
  const deleteVariantImageMutation = useDeleteVariantImageMutation();
  const createSpecificationMutation = useCreateSpecificationMutation();
  const updateSpecificationMutation = useUpdateSpecificationMutation();
  const deleteSpecificationMutation = useDeleteSpecificationMutation();
  const product = productQuery.data;
  const ownStore = storesQuery.data?.find((store) => store.userId === user.id);
  const managementBaseUrl = user.role.includes(ROLE.ADMIN)
    ? urls.admin_dashboard
    : user.role.includes(ROLE.SUPPORT)
      ? urls.support_dashboard
      : urls.seller_dashboard;
  const isPending =
    updateProductMutation.isPending ||
    createVariantMutation.isPending ||
    updateVariantMutation.isPending ||
    deleteVariantMutation.isPending ||
    createVariantImageMutation.isPending ||
    updateVariantImageMutation.isPending ||
    deleteVariantImageMutation.isPending ||
    createSpecificationMutation.isPending ||
    updateSpecificationMutation.isPending ||
    deleteSpecificationMutation.isPending;

  if (
    productQuery.isPending ||
    variantsQuery.isPending ||
    imagesQuery.isPending ||
    specificationsQuery.isPending ||
    (isSeller && storesQuery.isPending)
  ) {
    return getLoadingCard("Carregando dados do produto...");
  }

  /**
   * if (
    !product ||
    productQuery.isError ||
    variantsQuery.isError ||
    imagesQuery.isError ||
    specificationsQuery.isError ||
    (isSeller && storesQuery.isError)
  ) {
    return getLoadingCard(
      "Não foi possível carregar os dados reais do produto para atualização. Tente novamente mais tarde.",
    );
  }
   */

  const loadedProduct = product;
  if (!loadedProduct) {
    return getLoadingCard("Não foi possível encontrar o produto.");
  }

  if (isSeller && (!ownStore || ownStore.id !== loadedProduct.storeId)) {
    return <Navigate to={urls.home} replace />;
  }

  const variants = variantsQuery.data ?? [];
  const images = imagesQuery.data ?? [];
  const specifications = specificationsQuery.data ?? [];
  const defaultVariant =
    variants.find((variant) => variant.id === loadedProduct.defaultVariantId) ??
    loadedProduct.defaultVariant;

  if (!defaultVariant) {
    return getLoadingCard(
      "Não foi possível encontrar a variante padrão do produto.",
    );
  }

  const initialValues: ProductFormInitialValues = {
    product: {
      title: loadedProduct.title,
      description: loadedProduct.description,
      categoryId: loadedProduct.categoryId,
      storeId: loadedProduct.storeId,
    },
    defaultVariant: getVariantFormValues(defaultVariant, images),
    defaultVariantEntityId: defaultVariant.id,
    variants: variants
      .filter((variant) => variant.id !== defaultVariant.id)
      .map((variant) => ({
        id: variant.id,
        values: getVariantFormValues(variant, images),
        isDefault: false,
      })),
    defaultVariantId: "product",
    specifications: specifications.map((specification) => ({
      id: specification.id,
      name: specification.name,
      value: specification.value,
    })),
  };

  async function saveVariantImages(variantId: string, urlsToSave: string[]) {
    const remainingImages = images.filter(
      (image) => image.variantId === variantId,
    );

    for (const [sortOrder, url] of urlsToSave.entries()) {
      const existingIndex = remainingImages.findIndex(
        (image) => image.url === url,
      );
      if (existingIndex >= 0) {
        const [existingImage] = remainingImages.splice(existingIndex, 1);
        if (existingImage.sortOrder !== sortOrder) {
          await updateVariantImageMutation.mutateAsync({
            id: existingImage.id,
            url,
            sortOrder,
            variantId,
          });
        }
      } else {
        await createVariantImageMutation.mutateAsync({
          url,
          sortOrder,
          variantId,
        });
      }
    }

    for (const image of remainingImages) {
      await deleteVariantImageMutation.mutateAsync(image.id);
    }
  }

  async function handleSubmit(values: ProductRegistrationValues) {
    const originalVariants = variants;
    const originalVariantIds = new Set(
      originalVariants.map((variant) => variant.id),
    );
    const persistedVariantIds = new Map<string, string>();
    const defaultVariantId = values.defaultVariantEntityId;

    if (!defaultVariantId) {
      throw new Error("Não foi possível identificar a variante padrão.");
    }

    const defaultVariantResult = await updateVariantMutation.mutateAsync({
      id: defaultVariantId,
      ...toVariantPayload(values.defaultVariant),
      productId: loadedProduct?.id ?? "",
    });
    persistedVariantIds.set("product", defaultVariantResult.id);
    await saveVariantImages(
      defaultVariantResult.id,
      values.defaultVariant.images,
    );

    const submittedVariantIds = new Set<string>();
    for (const variant of values.variants) {
      submittedVariantIds.add(variant.id);
      const payload = {
        ...toVariantPayload(variant.values),
        productId: loadedProduct?.id ?? "",
      };
      const savedVariant = originalVariantIds.has(variant.id)
        ? await updateVariantMutation.mutateAsync({
            id: variant.id,
            ...payload,
          })
        : await createVariantMutation.mutateAsync(payload);

      persistedVariantIds.set(variant.id, savedVariant.id);
      await saveVariantImages(savedVariant.id, variant.values.images);
    }

    for (const variant of originalVariants) {
      if (
        variant.id === defaultVariantId ||
        submittedVariantIds.has(variant.id)
      ) {
        continue;
      }
      for (const image of images.filter(
        (item) => item.variantId === variant.id,
      )) {
        await deleteVariantImageMutation.mutateAsync(image.id);
      }
      await deleteVariantMutation.mutateAsync(variant.id);
    }

    const selectedDefaultVariantId = persistedVariantIds.get(
      values.defaultVariantId,
    );
    if (!selectedDefaultVariantId) {
      throw new Error("Selecione uma variante padrão válida.");
    }

    await updateProductMutation.mutateAsync({
      id: loadedProduct?.id ?? "",
      ...values.product,
      defaultVariantId: selectedDefaultVariantId,
    });

    const originalSpecifications = specificationsQuery.data ?? [];
    const originalSpecificationIds = new Set(
      originalSpecifications.map((specification) => specification.id),
    );
    const submittedSpecificationIds = new Set(
      values.specifications.map((specification) => specification.id),
    );

    for (const specification of values.specifications) {
      const payload = {
        name: specification.name,
        value: specification.value,
        productId: loadedProduct?.id ?? "",
      };
      if (originalSpecificationIds.has(specification.id)) {
        await updateSpecificationMutation.mutateAsync({
          id: specification.id,
          ...payload,
        });
      } else {
        await createSpecificationMutation.mutateAsync(payload);
      }
    }

    for (const specification of originalSpecifications) {
      if (!submittedSpecificationIds.has(specification.id)) {
        await deleteSpecificationMutation.mutateAsync(specification.id);
      }
    }

    if (
      [
        values.defaultVariant,
        ...values.variants.map((variant) => variant.values),
      ].some((variant) => variant.details.length > 0)
    ) {
      toast(
        "Produto atualizado. Os detalhes de atributos das variantes não foram salvos porque esse recurso ainda não está disponível na API.",
        { variant: "warning" },
      );
    }
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button onClick={() => navigate(-1)} className="bg-transparent p-0">
        <ArrowLeftIcon aria-hidden="true" size={20} />
        <Text>Voltar</Text>
      </Button>

      <header className="space-y-1">
        <Label>Atualizar produto</Label>
        <Text>
          Edite as informações, variantes e especificações do produto.
        </Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      <ProductForm
        key={loadedProduct.id}
        storeId={loadedProduct.storeId}
        initialValues={initialValues}
        submitLabel="Atualizar produto"
        onSubmit={handleSubmit}
        onSuccess={() => {
          toast("Produto atualizado com sucesso.", { variant: "success" });
          navigate(`${managementBaseUrl}${urls.products}`);
        }}
        onError={() => {
          toast("Não foi possível atualizar todas as informações do produto.", {
            variant: "danger",
          });
        }}
        onCancel={() =>
          navigate(`${managementBaseUrl}${urls.products}`, { replace: true })
        }
        isPending={isPending}
      />
    </main>
  );
}

function toVariantPayload(values: VariantFormValues) {
  return {
    price: Number(values.price),
    stock: Number(values.stock),
    status: values.status,
    sku: values.sku.trim(),
  };
}

export function ProductUpdatePage() {
  const { productId = "" } = useParams();
  const { user } = useRequiredAuth();
  const canUpdateProducts = user.role.some(
    (role) =>
      role === ROLE.ADMIN || role === ROLE.SUPPORT || role === ROLE.SELLER,
  );

  if (!canUpdateProducts) {
    return <Navigate to={urls.home} replace />;
  }

  if (!productId) {
    return getLoadingCard("Não foi possível encontrar o produto.");
  }

  return <ProductUpdateContent productId={productId} />;
}
