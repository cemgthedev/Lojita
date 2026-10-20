import { useCategoriesQuery } from "@/api/resources/categories/queries";
import {
  createProductSchema,
  type CreateProduct,
} from "@/api/resources/products/products/validations/create.schema";
import { createVariantSchema } from "@/api/resources/products/variants/validations/create.schema";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { cn } from "@/utils/cn";
import {
  ArrowLeftIcon,
  CheckIcon,
  Layers3Icon,
  PackageIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  type LucideIcon,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { VariantForm } from "./VariantForm";
import {
  emptyVariantFormValues,
  type VariantFormValues,
} from "./VariantForm.types";

export type ProductSpecificationDraft = {
  id: string;
  name: string;
  value: string;
};

export type ProductRegistrationValues = {
  product: Omit<CreateProduct, "defaultVariantId">;
  defaultVariant: VariantFormValues;
  defaultVariantEntityId?: string;
  variants: Array<{
    id: string;
    values: VariantFormValues;
    isDefault: boolean;
  }>;
  defaultVariantId: string;
  specifications: ProductSpecificationDraft[];
};

export type ProductFormInitialValues = Omit<
  ProductRegistrationValues,
  "defaultVariantEntityId"
> & {
  defaultVariantEntityId: string;
};

type ProductFormProps = {
  storeId: string;
  initialValues?: ProductFormInitialValues;
  submitLabel?: string;
  onSubmit: (values: ProductRegistrationValues) => Promise<unknown>;
  onSuccess?: () => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  onCancel: () => void;
  isPending?: boolean;
};

const registrationSteps = [
  {
    value: "product",
    title: "Dados do produto",
    description: "Informações, imagens e variante padrão.",
    icon: PackageIcon,
  },
  {
    value: "variants",
    title: "Variantes",
    description: "Cadastre outras opções deste produto.",
    icon: Layers3Icon,
  },
] satisfies {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[];

type RegistrationStep = (typeof registrationSteps)[number]["value"];

function isRegistrationStep(value: string): value is RegistrationStep {
  return registrationSteps.some((step) => step.value === value);
}

function toVariantPayload(values: VariantFormValues) {
  return {
    price: Number(values.price),
    stock: Number(values.stock),
    status: values.status,
    sku: values.sku.trim(),
  };
}

function isValidVariant(values: VariantFormValues) {
  const price = Number(values.price);
  const stock = Number(values.stock);
  return (
    values.price.trim().length > 0 &&
    Number.isFinite(price) &&
    price >= 0 &&
    values.stock.trim().length > 0 &&
    Number.isInteger(stock) &&
    stock >= 0 &&
    values.status.trim().length > 0 &&
    values.sku.trim().length > 0 &&
    createVariantSchema.safeParse({
      ...toVariantPayload(values),
      productId: "pending-product",
    }).success
  );
}

export function ProductForm({
  storeId,
  initialValues,
  submitLabel = "Finalizar cadastro",
  onSubmit,
  onSuccess,
  onError,
  onCancel,
  isPending = false,
}: ProductFormProps) {
  const categoriesQuery = useCategoriesQuery();
  const categories = categoriesQuery.data ?? [];
  const [activeStep, setActiveStep] = useState<RegistrationStep>("product");
  const [furthestStep, setFurthestStep] = useState(0);
  const [title, setTitle] = useState(initialValues?.product.title ?? "");
  const [categoryId, setCategoryId] = useState(
    initialValues?.product.categoryId ?? "",
  );
  const [description, setDescription] = useState(
    initialValues?.product.description ?? "",
  );
  const [defaultVariant, setDefaultVariant] = useState(
    initialValues?.defaultVariant ?? emptyVariantFormValues(),
  );
  const [specifications, setSpecifications] = useState<
    ProductSpecificationDraft[]
  >(initialValues?.specifications ?? []);
  const [editingSpecificationId, setEditingSpecificationId] =
    useState<string>();
  const [newSpecificationName, setNewSpecificationName] = useState("");
  const [newSpecificationValue, setNewSpecificationValue] = useState("");
  const [hasVariants, setHasVariants] = useState(
    (initialValues?.variants.length ?? 0) > 0,
  );
  const [variants, setVariants] = useState<
    ProductRegistrationValues["variants"]
  >(initialValues?.variants ?? []);
  const [defaultVariantId, setDefaultVariantId] = useState(
    initialValues?.defaultVariantId ?? "product",
  );
  const [editingVariantId, setEditingVariantId] = useState<string>();
  const [isVariantEditorOpen, setIsVariantEditorOpen] = useState(false);
  const [variantEditorValues, setVariantEditorValues] = useState(
    emptyVariantFormValues,
  );
  const nextSpecificationId = useRef(0);
  const nextVariantId = useRef(0);

  function validateProductStep() {
    const productResult = createProductSchema.safeParse({
      title: title.trim(),
      description: description.trim() || null,
      categoryId,
      storeId,
      defaultVariantId: "pending-variant",
    });
    if (!productResult.success || !isValidVariant(defaultVariant)) {
      toast("Verifique os dados do produto e da variante padrão.", {
        variant: "danger",
      });
      return false;
    }

    if (
      editingSpecificationId !== undefined ||
      newSpecificationName.trim() ||
      newSpecificationValue.trim() ||
      specifications.some(
        (specification) =>
          !specification.name.trim() || !specification.value.trim(),
      )
    ) {
      toast("Preencha o nome e o valor de todas as especificações.", {
        variant: "danger",
      });
      return false;
    }

    return true;
  }

  function handleContinue() {
    if (!validateProductStep()) return;
    setActiveStep("variants");
    setFurthestStep(1);
  }

  function handleAddSpecification() {
    const name = newSpecificationName.trim();
    const value = newSpecificationValue.trim();
    if (!name || !value) {
      toast("Informe o nome e o valor da especificação.", {
        variant: "danger",
      });
      return;
    }

    if (editingSpecificationId !== undefined) {
      setSpecifications((current) =>
        current.map((specification) =>
          specification.id === editingSpecificationId
            ? { ...specification, name, value }
            : specification,
        ),
      );
      setEditingSpecificationId(undefined);
    } else {
      setSpecifications((current) => [
        ...current,
        {
          id: `specification-draft-${nextSpecificationId.current++}`,
          name,
          value,
        },
      ]);
    }
    setNewSpecificationName("");
    setNewSpecificationValue("");
  }

  function handleEditVariant(variantId: string) {
    const variant = variants.find((item) => item.id === variantId);
    if (!variant) return;
    setEditingVariantId(variant.id);
    setIsVariantEditorOpen(true);
    setVariantEditorValues(variant.values);
  }

  function handleSaveVariant() {
    if (!isValidVariant(variantEditorValues)) {
      toast("Verifique o preço, o estoque, o status e o SKU da variante.", {
        variant: "danger",
      });
      return;
    }

    if (editingVariantId) {
      setVariants((current) =>
        current.map((variant) =>
          variant.id === editingVariantId
            ? {
                ...variant,
                values: variantEditorValues,
                isDefault: defaultVariantId === variant.id,
              }
            : variant,
        ),
      );
    } else {
      const id = `variant-draft-${nextVariantId.current++}`;
      setVariants((current) => [
        ...current,
        {
          id,
          values: variantEditorValues,
          isDefault: defaultVariantId === "new-variant",
        },
      ]);
      if (defaultVariantId === "new-variant") setDefaultVariantId(id);
    }
    setEditingVariantId(undefined);
    setIsVariantEditorOpen(false);
    setVariantEditorValues(emptyVariantFormValues());
  }

  function handleDefaultChange(variantId: string, isDefault: boolean) {
    if (isDefault) {
      setDefaultVariantId(variantId);
      setVariants((current) =>
        current.map((variant) => ({
          ...variant,
          isDefault: variant.id === variantId,
        })),
      );
      return;
    }

    setVariants((current) =>
      current.map((variant) =>
        variant.id === variantId ? { ...variant, isDefault: false } : variant,
      ),
    );
    setDefaultVariantId("product");
  }

  function handleRemoveVariant(variantId: string) {
    setVariants((current) =>
      current.filter((variant) => variant.id !== variantId),
    );
    if (editingVariantId === variantId) {
      setEditingVariantId(undefined);
      setIsVariantEditorOpen(false);
      setVariantEditorValues(emptyVariantFormValues());
    }
    if (defaultVariantId === variantId) setDefaultVariantId("product");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateProductStep()) {
      setActiveStep("product");
      return;
    }

    if (hasVariants && variants.length === 0) {
      toast(
        "Adicione pelo menos uma variante ou desmarque a opção de variantes.",
        {
          variant: "danger",
        },
      );
      return;
    }

    if (
      (hasVariants &&
        variants.some((variant) => !isValidVariant(variant.values))) ||
      !isValidVariant(defaultVariant)
    ) {
      setActiveStep(hasVariants ? "variants" : "product");
      toast("Verifique os dados de todas as variantes antes de finalizar.", {
        variant: "danger",
      });
      return;
    }

    const variantSkus = [
      defaultVariant.sku,
      ...(hasVariants ? variants.map((variant) => variant.values.sku) : []),
    ].map((sku) => sku.trim().toLocaleLowerCase("pt-BR"));
    if (new Set(variantSkus).size !== variantSkus.length) {
      toast("Cada variante precisa ter um SKU diferente.", {
        variant: "danger",
      });
      setActiveStep(hasVariants ? "variants" : "product");
      return;
    }

    if (hasVariants && isVariantEditorOpen) {
      toast("Salve ou cancele a edição da variante antes de finalizar.", {
        variant: "danger",
      });
      return;
    }

    try {
      await onSubmit({
        product: {
          title: title.trim(),
          description: description.trim() || null,
          categoryId,
          storeId,
        },
        defaultVariant,
        defaultVariantEntityId: initialValues?.defaultVariantEntityId,
        variants: hasVariants
          ? variants.map((variant) => ({
              ...variant,
              isDefault: variant.id === defaultVariantId,
            }))
          : [],
        defaultVariantId: hasVariants ? defaultVariantId : "product",
        specifications,
      });
      await onSuccess?.();
    } catch (error) {
      if (onError) {
        await onError(error);
        return;
      }
      toast("Não foi possível cadastrar o produto.", { variant: "danger" });
    }
  }

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <Tabs
        value={activeStep}
        onValueChange={(value) => {
          if (
            isRegistrationStep(value) &&
            (value !== "variants" || hasVariants)
          ) {
            setActiveStep(value);
          }
        }}
        className="w-full gap-4"
      >
        <TabsList
          variant="line"
          className="grid h-auto w-full grid-cols-1 items-stretch gap-2 overflow-hidden rounded-lg border border-secondary-300 md:grid-cols-2"
        >
          {registrationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <TabsTrigger
                key={step.value}
                value={step.value}
                disabled={step.value === "variants" && !hasVariants}
                variant={
                  index === furthestStep ? "secondary-ghost" : "dark-bordered"
                }
                className={cn(
                  "h-fit justify-center gap-2 whitespace-normal p-3 text-left",
                  index === furthestStep && "animate-pulse",
                )}
              >
                <Icon aria-hidden="true" size={20} />
                <div className="space-y-px">
                  <Label size="xs">{step.title}</Label>
                  <Text size="sm">{step.description}</Text>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent
          value="product"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <section className="space-y-4">
            <div className="space-y-1">
              <Label>Dados do produto</Label>
              <Text>Informe os dados de produto.</Text>
            </div>

            <Separator variant={"secondary"} />

            <Card size="md" rounded="lg" className="border-secondary-600">
              <CardContent className="space-y-5">
                <FieldGroup className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="product-title">Título</FieldLabel>
                    <Input
                      id="product-title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      placeholder="Digite o nome do produto"
                      required
                      disabled={isPending}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="product-category">
                      Categoria
                    </FieldLabel>
                    <Select
                      value={categoryId || "none"}
                      onValueChange={(value) =>
                        setCategoryId(value === "none" ? "" : value)
                      }
                      disabled={isPending || categoriesQuery.isPending}
                    >
                      <SelectTrigger id="product-category" className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          Selecione uma categoria
                        </SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
                {categoriesQuery.isError && (
                  <Text role="alert" className="animate-pulse-once">
                    Não foi possível carregar as categorias. Dados de exemplo
                    podem estar sendo exibidos.
                  </Text>
                )}

                <VariantForm
                  idPrefix="default-variant"
                  values={defaultVariant}
                  onChange={setDefaultVariant}
                  disabled={isPending}
                />

                <Field>
                  <FieldLabel htmlFor="product-description">
                    Descrição
                  </FieldLabel>
                  <Textarea
                    id="product-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Descreva os detalhes do produto"
                    rows={5}
                    disabled={isPending}
                  />
                </Field>

                <section className="space-y-3">
                  <div className="space-y-1">
                    <Label size="sm">Especificações</Label>
                    <Text>Inclua informações adicionais sobre o produto.</Text>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
                    <Field>
                      <FieldLabel htmlFor="specification-name">Nome</FieldLabel>
                      <Input
                        id="specification-name"
                        value={newSpecificationName}
                        onChange={(event) =>
                          setNewSpecificationName(event.target.value)
                        }
                        placeholder="Ex.: Material"
                        disabled={isPending}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="specification-value">
                        Valor
                      </FieldLabel>
                      <Input
                        id="specification-value"
                        value={newSpecificationValue}
                        onChange={(event) =>
                          setNewSpecificationValue(event.target.value)
                        }
                        placeholder="Ex.: Algodão"
                        disabled={isPending}
                      />
                    </Field>
                    <Button
                      type="button"
                      variant="success"
                      onClick={handleAddSpecification}
                      disabled={
                        isPending ||
                        !newSpecificationName.trim() ||
                        !newSpecificationValue.trim()
                      }
                    >
                      <PlusIcon aria-hidden="true" size={18} />
                      {editingSpecificationId === undefined
                        ? "Adicionar"
                        : "Salvar"}
                    </Button>
                    {editingSpecificationId !== undefined && (
                      <Button
                        type="button"
                        variant="secondary-bordered"
                        onClick={() => {
                          setEditingSpecificationId(undefined);
                          setNewSpecificationName("");
                          setNewSpecificationValue("");
                        }}
                        disabled={isPending}
                      >
                        Cancelar edição
                      </Button>
                    )}
                  </div>
                  <div className="divide-y divide-secondary-600 rounded-md border border-gray-300 px-3">
                    {specifications.length > 0 ? (
                      specifications.map((specification) => (
                        <div
                          key={specification.id}
                          className="flex flex-wrap items-center justify-between gap-3 py-3"
                        >
                          <div>
                            <Text>{specification.name}</Text>
                            <Text size="sm" variant="secondary">
                              {specification.value}
                            </Text>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              type="button"
                              variant="secondary-ghost"
                              size="sm"
                              aria-label={`Editar especificação ${specification.name}`}
                              onClick={() => {
                                setEditingSpecificationId(specification.id);
                                setNewSpecificationName(specification.name);
                                setNewSpecificationValue(specification.value);
                              }}
                              disabled={isPending}
                            >
                              <PencilIcon aria-hidden="true" size={18} />
                            </Button>
                            <Button
                              type="button"
                              variant="danger-ghost"
                              size="sm"
                              aria-label={`Remover especificação ${specification.name}`}
                              onClick={() => {
                                setSpecifications((current) =>
                                  current.filter(
                                    (item) => item.id !== specification.id,
                                  ),
                                );
                                if (
                                  editingSpecificationId === specification.id
                                ) {
                                  setEditingSpecificationId(undefined);
                                  setNewSpecificationName("");
                                  setNewSpecificationValue("");
                                }
                              }}
                              disabled={isPending}
                            >
                              <Trash2Icon aria-hidden="true" size={18} />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Text className="py-3 text-gray-600">
                        Nenhuma especificação adicionada.
                      </Text>
                    )}
                  </div>
                </section>

                <label className="flex items-center gap-3 rounded-lg border border-gray-300 p-4">
                  <Checkbox
                    rounded={"full"}
                    variant={"secondary-bordered"}
                    checked={hasVariants}
                    onCheckedChange={(checked) => {
                      const shouldHaveVariants = checked === true;
                      setHasVariants(shouldHaveVariants);
                      if (!shouldHaveVariants) {
                        setActiveStep("product");
                        setFurthestStep(0);
                        setIsVariantEditorOpen(false);
                        setEditingVariantId(undefined);
                        setVariantEditorValues(emptyVariantFormValues());
                      }
                    }}
                    disabled={isPending}
                  />
                  <span className="space-y-1">
                    <Label size="xs">Este produto possui variantes</Label>
                    <Text className="text-gray-600">
                      Cadastre opções adicionais como tamanho, cor ou modelo.
                    </Text>
                  </span>
                </label>
              </CardContent>
            </Card>

            <div className="flex flex-wrap justify-end gap-3">
              <Button
                type="button"
                variant="danger-bordered"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancelar
              </Button>
              {hasVariants ? (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleContinue}
                  disabled={isPending}
                >
                  Prosseguir
                </Button>
              ) : (
                <Button type="submit" variant="secondary" disabled={isPending}>
                  {isPending ? "Salvando..." : submitLabel}
                </Button>
              )}
            </div>
          </section>
        </TabsContent>

        <TabsContent
          value="variants"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <section className="space-y-4">
            <div className="flex justify-between">
              <div className="space-y-1">
                <Label>Variantes do produto</Label>
                <Text>
                  Crie as opções adicionais e escolha qual será a variante
                  padrão.
                </Text>
              </div>

              {hasVariants && !isVariantEditorOpen && !editingVariantId && (
                <Button
                  type="button"
                  variant="success"
                  onClick={() => {
                    setVariantEditorValues(emptyVariantFormValues());
                    setIsVariantEditorOpen(true);
                  }}
                  disabled={isPending}
                >
                  <PlusIcon aria-hidden="true" size={18} />
                  Adicionar variante
                </Button>
              )}
            </div>
            <Separator variant="secondary" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {variants.map((variant, index) => (
                <Card
                  key={variant.id}
                  size="sm"
                  rounded="lg"
                  className="border-secondary-600"
                >
                  <CardContent className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <Text>
                        {index + 1} · {variant.values.sku || "Nova variante"}
                      </Text>
                      <Text size="sm" variant="secondary">
                        {variant.values.images.length} imagens · Estoque{" "}
                        {variant.values.stock || "—"}
                        {variant.id === defaultVariantId && " · Padrão"}
                      </Text>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="secondary-ghost"
                        size="sm"
                        aria-label={`Editar variante ${variant.values.sku}`}
                        onClick={() => handleEditVariant(variant.id)}
                        disabled={isPending || Boolean(editingVariantId)}
                      >
                        <PencilIcon aria-hidden="true" size={18} />
                      </Button>
                      <Button
                        type="button"
                        variant="danger-ghost"
                        size="sm"
                        aria-label={`Remover variante ${variant.values.sku}`}
                        onClick={() => handleRemoveVariant(variant.id)}
                        disabled={isPending}
                      >
                        <Trash2Icon aria-hidden="true" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {variants.length === 0 && (
                <Text className="py-3 text-gray-600">
                  Nenhuma variante adicional cadastrada.
                </Text>
              )}
            </div>

            {hasVariants && isVariantEditorOpen && (
              <Card size="md" rounded="lg" className="border-secondary-600">
                <CardContent className="space-y-4">
                  <Label size="sm">
                    {editingVariantId ? "Editar variante" : "Nova variante"}
                  </Label>
                  <VariantForm
                    idPrefix={`variant-editor-${editingVariantId ?? "new"}`}
                    values={variantEditorValues}
                    onChange={setVariantEditorValues}
                    isDefault={
                      editingVariantId
                        ? defaultVariantId === editingVariantId
                        : defaultVariantId === "new-variant"
                    }
                    onDefaultChange={(checked) => {
                      if (editingVariantId) {
                        handleDefaultChange(editingVariantId, checked);
                      } else if (checked) {
                        setDefaultVariantId("new-variant");
                      } else if (defaultVariantId === "new-variant") {
                        setDefaultVariantId("product");
                      }
                    }}
                    disabled={isPending}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="danger-bordered"
                      onClick={() => {
                        setEditingVariantId(undefined);
                        setIsVariantEditorOpen(false);
                        setVariantEditorValues(emptyVariantFormValues());
                        if (defaultVariantId === "new-variant") {
                          setDefaultVariantId("product");
                        }
                      }}
                      disabled={isPending}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleSaveVariant}
                      disabled={isPending}
                    >
                      <CheckIcon aria-hidden="true" size={18} />
                      Salvar alterações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {defaultVariantId !== "product" &&
              defaultVariantId !== "new-variant" &&
              !variants.some((variant) => variant.id === defaultVariantId) && (
                <Text role="alert">
                  A variante padrão selecionada não está disponível.
                </Text>
              )}

            <div className="flex flex-wrap justify-between gap-3">
              <Button
                type="button"
                variant="danger-bordered"
                onClick={() => setActiveStep("product")}
                disabled={isPending}
              >
                <ArrowLeftIcon aria-hidden="true" size={18} />
                Voltar
              </Button>
              <Button type="submit" variant="secondary" disabled={isPending}>
                {isPending ? "Salvando..." : submitLabel}
              </Button>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </form>
  );
}
