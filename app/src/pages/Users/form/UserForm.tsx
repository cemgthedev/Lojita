import {
  createUserSchema,
  type CreateUser,
} from "@/api/resources/users/validations/create.schema";
import {
  ROLE,
  ROLE_LABEL,
  type Role,
} from "@/api/resources/users/validations/auth.schema";
import type { User } from "@/api/resources/users/validations/user.schema";
import { UploadImage } from "@/components/forms/UploadImage";
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { useState, type FormEvent } from "react";

type UserFormValues = Omit<CreateUser, "role"> & {
  role: Role | "";
};

type UserFormProps = {
  initialValues?: Partial<CreateUser>;
  onSubmit: (values: CreateUser) => Promise<User>;
  onSuccess?: (user: User) => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  onBack: () => void;
  submitLabel?: string;
  isPending: boolean;
};

const roles = Object.values(ROLE);

function userFormValues(initialValues?: Partial<CreateUser>): UserFormValues {
  return {
    name: initialValues?.name ?? "",
    email: initialValues?.email ?? "",
    document: initialValues?.document ?? "",
    phone: initialValues?.phone ?? "",
    avatarUrl: initialValues?.avatarUrl ?? "",
    role: initialValues?.role?.[0] ?? "",
  };
}

export function UserForm({
  initialValues,
  onSubmit,
  onSuccess,
  onError,
  onBack,
  submitLabel = "Salvar usuário",
  isPending,
}: UserFormProps) {
  const [values, setValues] = useState(() => userFormValues(initialValues));

  function handleChange(field: keyof UserFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = createUserSchema.safeParse({
      ...values,
      role: values.role ? [values.role] : [],
    });
    if (!result.success) {
      toast("Verifique os dados informados.", { variant: "danger" });
      return;
    }

    try {
      const user = await onSubmit(result.data);
      await onSuccess?.(user);
    } catch (error) {
      if (onError) {
        await onError(error);
        return;
      }

      toast("Não foi possível salvar os dados do usuário.", {
        variant: "danger",
      });
    }
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
          <FieldLabel htmlFor="user-name">Nome completo</FieldLabel>
          <Input
            id="user-name"
            name="name"
            autoComplete="name"
            placeholder="Digite o nome do usuário"
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            required
            disabled={isPending}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="user-document">Documento</FieldLabel>
          <Input
            id="user-document"
            name="document"
            autoComplete="off"
            placeholder="Digite o CPF/CNPJ"
            value={values.document}
            onChange={(event) => handleChange("document", event.target.value)}
            required
            disabled={isPending}
          />
        </Field>

        <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="user-email">E-mail</FieldLabel>
            <Input
              id="user-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Digite o e-mail"
              value={values.email}
              onChange={(event) => handleChange("email", event.target.value)}
              required
              disabled={isPending}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="user-phone">Telefone</FieldLabel>
            <Input
              id="user-phone"
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
          <FieldLabel htmlFor="user-role">Perfil</FieldLabel>
          <Select
            value={values.role}
            onValueChange={(value) => handleChange("role", value)}
            disabled={isPending}
          >
            <SelectTrigger id="user-role" aria-label="Perfil do usuário">
              <SelectValue placeholder="Selecione um perfil" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {ROLE_LABEL[role]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
