import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/api/resources/products/products/mutations";
import { useCreateVariantImageMutation } from "@/api/resources/products/variant-images/mutations";
import { useCreateVariantMutation } from "@/api/resources/products/variants/mutations";
import { useCreateSpecificationMutation } from "@/api/resources/specifications/mutations";
import { useStoresQuery } from "@/api/resources/stores/queries";
import { Button, Card, CardContent, Text } from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import {
  ProductForm,
  type ProductRegistrationValues,
} from "@/pages/Products/form/ProductForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

export function ProductCreatePage() {
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const storesQuery = useStoresQuery({ userId: user.id });
  const store = storesQuery.data?.find(
    (candidate) => candidate.userId === user.id,
  );
  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const createVariantMutation = useCreateVariantMutation();
  const createVariantImageMutation = useCreateVariantImageMutation();
  const createSpecificationMutation = useCreateSpecificationMutation();
  const isPending =
    createProductMutation.isPending ||
    updateProductMutation.isPending ||
    createVariantMutation.isPending ||
    createVariantImageMutation.isPending ||
    createSpecificationMutation.isPending;

  async function handleSubmit(values: ProductRegistrationValues) {
    const pendingDefaultId = crypto.randomUUID();
    const product = await createProductMutation.mutateAsync({
      ...values.product,
      defaultVariantId: pendingDefaultId,
    });

    const createdVariants = [];
    const drafts = [
      { id: "product", values: values.defaultVariant },
      ...values.variants,
    ];

    for (const draft of drafts) {
      const variant = await createVariantMutation.mutateAsync({
        price: Number(draft.values.price),
        stock: Number(draft.values.stock),
        status: draft.values.status,
        sku: draft.values.sku.trim(),
        productId: product.id,
      });
      createdVariants.push({ draftId: draft.id, variant });

      for (const [sortOrder, url] of draft.values.images.entries()) {
        await createVariantImageMutation.mutateAsync({
          url,
          sortOrder,
          variantId: variant.id,
        });
      }
    }

    const defaultVariant =
      createdVariants.find((item) => item.draftId === values.defaultVariantId)
        ?.variant ?? createdVariants[0]?.variant;

    if (!defaultVariant) {
      throw new Error("O produto foi criado sem uma variante padrão.");
    }

    await updateProductMutation.mutateAsync({
      id: product.id,
      defaultVariantId: defaultVariant.id,
    });

    for (const specification of values.specifications) {
      await createSpecificationMutation.mutateAsync({
        name: specification.name,
        value: specification.value,
        productId: product.id,
      });
    }

    const hasVariantDetails = [
      values.defaultVariant,
      ...values.variants.map((variant) => variant.values),
    ].some((variant) => variant.details.length > 0);

    if (hasVariantDetails) {
      toast(
        "Produto cadastrado. Os detalhes de atributos das variantes não foram salvos porque esse recurso ainda não está disponível na API.",
        { variant: "warning" },
      );
    }
  }

  function handleSuccess() {
    toast("Produto cadastrado com sucesso.", { variant: "success" });
    navigate(`${urls.seller_dashboard}${urls.products}`);
  }

  if (storesQuery.isPending) {
    return (
      <Card className="p-6 border-none" size="md" rounded="lg">
        <CardContent>
          <Text>Carregando loja...</Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button onClick={() => navigate(-1)} className="bg-transparent p-0">
        <ArrowLeftIcon aria-hidden="true" size={20} />
        <Text>Voltar</Text>
      </Button>

      {storesQuery.isError && (
        <Text role="status" className="animate-pulse-once">
          Não foi possível carregar a loja. Verifique os dados antes de
          continuar.
        </Text>
      )}

      <ProductForm
        storeId={store?.id ?? ""}
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={() => {
          toast("Não foi possível salvar todas as informações do produto.", {
            variant: "danger",
          });
        }}
        onCancel={() => navigate(-1)}
        isPending={isPending}
      />
    </main>
  );
}
