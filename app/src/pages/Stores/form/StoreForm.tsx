import {
  createStoreSchema,
  type CreateStore,
} from "@/api/resources/stores/validations/create.schema";
import type { Store } from "@/api/resources/stores/validations/store.schema";
import { UploadImage } from "@/components/forms/UploadImage";
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Textarea,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { useState, type FormEvent } from "react";

type StoreFormValues = Omit<CreateStore, "userId">;

type StoreFormProps = {
  userId: string;
  initialValues?: Partial<StoreFormValues>;
  submitLabel?: string;
  onSubmit: (values: CreateStore) => Promise<Store>;
  onSuccess?: (store: Store) => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  onBack: () => void;
  isPending: boolean;
};

const emptyValues: StoreFormValues = {
  name: "",
  description: "",
  logoUrl: "",
  businessEmail: "",
  phone: "",
  url: "",
};

export function StoreForm({
  userId,
  initialValues,
  submitLabel = "Prosseguir",
  onSubmit,
  onSuccess,
  onError,
  onBack,
  isPending,
}: StoreFormProps) {
  const [values, setValues] = useState<StoreFormValues>(() => ({
    ...emptyValues,
    ...initialValues,
  }));

  function handleChange(field: keyof StoreFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = createStoreSchema.safeParse({ ...values, userId });

    if (!result.success) {
      toast("Verifique os dados da loja.", { variant: "danger" });
      return;
    }

    try {
      const store = await onSubmit(result.data);
      await onSuccess?.(store);
    } catch (error) {
      if (onError) {
        await onError(error);
        return;
      }

      toast("Não foi possível salvar os dados da loja.", {
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
          value={values.logoUrl}
          onChange={(logoUrl) => handleChange("logoUrl", logoUrl)}
          disabled={isPending}
        />

        <Field>
          <FieldLabel htmlFor="store-name">Nome da loja</FieldLabel>
          <Input
            id="store-name"
            name="name"
            autoComplete="organization"
            placeholder="Digite o nome da loja"
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            required
            disabled={isPending}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="store-description">Descrição</FieldLabel>
          <Textarea
            id="store-description"
            name="description"
            placeholder="Digite a descrição da loja"
            value={values.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            disabled={isPending}
          />
        </Field>

        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="store-business-email">
              E-mail comercial
            </FieldLabel>
            <Input
              id="store-business-email"
              name="businessEmail"
              type="email"
              autoComplete="email"
              placeholder="Digite o email comercial"
              value={values.businessEmail}
              onChange={(event) =>
                handleChange("businessEmail", event.target.value)
              }
              disabled={isPending}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="store-phone">Telefone (opcional)</FieldLabel>
            <Input
              id="store-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Digite o telefone"
              value={values.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              disabled={isPending}
            />
          </Field>
        </FieldGroup>

        <Field>
          <FieldLabel htmlFor="store-url">Site da loja</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="store-url"
              name="url"
              type="text"
              placeholder="Digite o nickname da loja"
              value={values.url}
              onChange={(event) => handleChange("url", event.target.value)}
              disabled={isPending}
            />
            <InputGroupAddon align="inline-start">
              <InputGroupText>https://lojita.com/</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
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
