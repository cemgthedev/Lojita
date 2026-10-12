import type { AuthUser } from "@/api/resources/users/validations/auth.schema";
import {
  updateUserSchema,
  type UpdateUser,
} from "@/api/resources/users/validations/update.schema";
import { UploadImage } from "@/components/forms/UploadImage";
import { Button, Field, FieldGroup, FieldLabel, Input } from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { useState, type FormEvent } from "react";

type ProfileFormValues = {
  name: string;
  email: string;
  document: string;
  phone: string;
  avatarUrl: string;
};

type ProfileFormProps = {
  onSubmit: (values: UpdateUser) => Promise<void>;
  onCancel: () => void;
  cancelLabel?: string;
  submitLabel?: string;
  isPending?: boolean;
};

function profileValues(user: AuthUser): ProfileFormValues {
  return {
    name: user.name,
    email: user.email,
    document: user.document,
    phone: user.phone,
    avatarUrl: user.avatarUrl ?? "",
  };
}

export function ProfileForm({
  onSubmit,
  onCancel,
  cancelLabel = "Cancelar",
  submitLabel = "Salvar alterações",
  isPending = false,
}: ProfileFormProps) {
  const { user } = useRequiredAuth();
  const [values, setValues] = useState(() => profileValues(user));

  function handleChange(field: keyof ProfileFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = updateUserSchema.safeParse(values);
    if (!result.success) {
      toast("Verifique os dados informados.", { variant: "danger" });
      return;
    }

    await onSubmit(result.data);
  }

  return (
    <form
      className="w-full max-w-2xl space-y-4 rounded-lg border border-secondary-600 p-4"
      onSubmit={handleSubmit}
    >
      <UploadImage
        value={values.avatarUrl}
        onChange={(avatarUrl) => handleChange("avatarUrl", avatarUrl)}
        disabled={isPending}
      />

      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="profile-name">Nome completo</FieldLabel>
          <Input
            id="profile-name"
            name="name"
            autoComplete="name"
            placeholder="Digite seu nome"
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            required
            disabled={isPending}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="profile-document">Documento</FieldLabel>
          <Input
            id="profile-document"
            name="document"
            autoComplete="off"
            placeholder="Digite seu cpf/cnpj"
            value={values.document}
            onChange={(event) => handleChange("document", event.target.value)}
            required
            disabled={isPending}
          />
        </Field>

        <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="profile-email">E-mail</FieldLabel>
            <Input
              id="profile-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Digite seu email"
              value={values.email}
              onChange={(event) => handleChange("email", event.target.value)}
              required
              disabled={isPending}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="profile-phone">Telefone</FieldLabel>
            <Input
              id="profile-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Digite seu telefone"
              value={values.phone}
              onChange={(event) => handleChange("phone", event.target.value)}
              disabled={isPending}
            />
          </Field>
        </FieldGroup>
      </FieldGroup>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="danger-bordered"
          onClick={onCancel}
          disabled={isPending}
          className="w-full max-w-50"
        >
          {cancelLabel}
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
