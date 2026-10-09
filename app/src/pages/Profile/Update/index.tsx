import { useUpdateUserMutation } from "@/api/resources/users/mutations";
import type { AuthUser } from "@/api/resources/users/validations/auth.schema";
import { updateUserSchema } from "@/api/resources/users/validations/update.schema";
import { UploadImage } from "@/components/forms/UploadImage";
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Label,
  Separator,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

type ProfileFormValues = {
  name: string;
  email: string;
  document: string;
  phone: string;
  avatarUrl: string;
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

export function ProfileUpdatePage() {
  const { user, updateUser } = useRequiredAuth();
  const mutation = useUpdateUserMutation();
  const navigate = useNavigate();
  const [values, setValues] = useState(() => profileValues(user));

  function handleChange(field: keyof ProfileFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = updateUserSchema.safeParse(values);
    if (!result.success) {
      toast("Verifique os dados informados.", {
        variant: "danger",
      });
      return;
    } else {
      toast("A edição de perfil estará disponível em breve.", {
        variant: "primary",
      });
    }

    try {
      const updatedUser = await mutation.mutateAsync(result.data);

      updateUser({
        id: updatedUser.id,
        name: updatedUser.name,
        document: updatedUser.document,
        phone: updatedUser.phone,
        email: updatedUser.email,
        role: updatedUser.role,
        avatarUrl: updatedUser.avatarUrl,
      });
      toast("Perfil atualizado com sucesso.", { variant: "success" });
      navigate("/profile");
    } catch (error) {
      toast("Não foi possível atualizar o perfil.", {
        variant: "danger",
        duration: 1500,
      });
    }
  }

  return (
    <section className="w-full space-y-4">
      <div className="space-y-1">
        <Label>Dados Pessoais</Label>
        <Text>Mantenha seus dados pessoais atualizados.</Text>
      </div>

      <Separator variant={"secondary"} orientation="horizontal" />

      <form
        className="border border-secondary-600 rounded-lg space-y-4 max-w-2xl p-4"
        onSubmit={handleSubmit}
      >
        <UploadImage
          value={values.avatarUrl}
          onChange={(avatarUrl) => handleChange("avatarUrl", avatarUrl)}
          disabled={mutation.isPending}
        />

        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="profile-name">Nome completo</FieldLabel>
            <Input
              id="profile-name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(event) => handleChange("name", event.target.value)}
              required
              disabled={mutation.isPending}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="profile-document">Documento</FieldLabel>
            <Input
              id="profile-document"
              name="document"
              autoComplete="off"
              value={values.document}
              onChange={(event) => handleChange("document", event.target.value)}
              required
              disabled={mutation.isPending}
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
                value={values.email}
                onChange={(event) => handleChange("email", event.target.value)}
                required
                disabled={mutation.isPending}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="profile-phone">Telefone</FieldLabel>
              <Input
                id="profile-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                disabled={mutation.isPending}
              />
            </Field>
          </FieldGroup>
        </FieldGroup>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="danger-bordered"
            onClick={() => navigate("/profile")}
            disabled={mutation.isPending}
            className="w-full max-w-50"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="secondary"
            disabled={mutation.isPending}
            className="w-full max-w-50"
          >
            {mutation.isPending ? "Salvando..." : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </section>
  );
}
