import {
  createCategorySchema,
  type CreateCategory,
} from "@/api/resources/categories/validations/create.schema";
import type { Category } from "@/api/resources/categories/validations/category.schema";
import { UploadImage } from "@/components/forms/UploadImage";
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { useState, type FormEvent } from "react";

type CategoryFormValues = CreateCategory;

type CategoryFormProps = {
  initialValues?: Partial<CategoryFormValues>;
  submitLabel?: string;
  onSubmit: (values: CreateCategory) => Promise<Category>;
  onSuccess?: (category: Category) => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  onBack: () => void;
  isPending: boolean;
};

const emptyValues: CategoryFormValues = {
  title: "",
  description: "",
  imageUrl: "",
};

export function CategoryForm({
  initialValues,
  submitLabel = "Prosseguir",
  onSubmit,
  onSuccess,
  onError,
  onBack,
  isPending,
}: CategoryFormProps) {
  const [values, setValues] = useState<CategoryFormValues>(() => ({
    ...emptyValues,
    ...initialValues,
  }));

  function handleChange(field: keyof CategoryFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = createCategorySchema.safeParse(values);

    if (!result.success) {
      toast("Verifique os dados da categoria.", { variant: "danger" });
      return;
    }

    try {
      const category = await onSubmit(result.data);
      await onSuccess?.(category);
    } catch (error) {
      if (onError) {
        await onError(error);
        return;
      }

      toast("Não foi possível salvar os dados da categoria.", {
        variant: "danger",
      });
    }
  }

  return (
    <form
      className="w-full max-w-2xl space-y-4 rounded-lg border border-secondary-600 p-4"
      onSubmit={handleSubmit}
    >
      <FieldGroup className="gap-4">
        <UploadImage
          label="Imagem da categoria"
          inputId="category-image"
          imageAlt="Pré-visualização da imagem da categoria"
          value={values.imageUrl ?? ""}
          onChange={(imageUrl) => handleChange("imageUrl", imageUrl)}
          disabled={isPending}
        />

        <Field>
          <FieldLabel htmlFor="category-title">Título</FieldLabel>
          <Input
            id="category-title"
            name="title"
            placeholder="Digite o título da categoria"
            value={values.title}
            onChange={(event) => handleChange("title", event.target.value)}
            required
            disabled={isPending}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="category-description">Descrição</FieldLabel>
          <Textarea
            id="category-description"
            name="description"
            placeholder="Digite a descrição da categoria"
            value={values.description ?? ""}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            disabled={isPending}
          />
        </Field>
      </FieldGroup>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="danger-bordered"
          onClick={onBack}
          disabled={isPending}
          className="w-full max-w-50"
        >
          Voltar
        </Button>
        <Button
          type="submit"
          variant="secondary"
          disabled={isPending}
          className="w-full max-w-50"
        >
          {isPending ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
