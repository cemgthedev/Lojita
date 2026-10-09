import { authApi } from "@/api/auth.api";
import { changePasswordSchema } from "@/api/resources/users/validations/password.schema";
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  Separator,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { EyeIcon, EyeOffIcon, LockKeyholeIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

export function UpdatePasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  function handleVisibilityToggle() {
    setIsVisible((prev) => !prev);
  }

  function handleVisibilityConfirmToggle() {
    setIsVisibleConfirm((prev) => !prev);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = changePasswordSchema.safeParse({
      password,
      passwordConfirmation,
    });
    if (!result.success) {
      toast(
        result.error.issues[0]?.message ?? "Verifique os dados informados.",
        {
          variant: "danger",
        },
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await authApi.changePassword(result.data.password);
      toast("Senha atualizada com sucesso.", { variant: "success" });
      navigate("/profile");
    } catch (error) {
      toast(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar a senha.",
        { variant: "danger" },
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full space-y-4">
      <div className="space-y-1">
        <Label>Alterar senha</Label>
        <Text>Defina uma nova senha para sua conta.</Text>
      </div>

      <Separator variant="secondary" orientation="horizontal" />

      <form
        className="max-w-2xl space-y-4 rounded-lg border border-secondary-600 p-4"
        onSubmit={handleSubmit}
      >
        <FieldGroup className="gap-4">
          <Field>
            <FieldLabel htmlFor="new-password">Nova senha</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="new-password"
                name="password"
                type={isVisible ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Digite sua nova senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={8}
                required
                disabled={isSubmitting}
              />
              <InputGroupAddon align="inline-start">
                <LockKeyholeIcon size={20} />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  className="text-gray-600 bg-transparent p-1"
                  onClick={handleVisibilityToggle}
                >
                  {isVisible ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="password-confirmation">
              Confirmar nova senha
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="password-confirmation"
                name="passwordConfirmation"
                type={isVisibleConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Confirme a senha"
                value={passwordConfirmation}
                onChange={(event) =>
                  setPasswordConfirmation(event.target.value)
                }
                minLength={8}
                required
                disabled={isSubmitting}
              />
              <InputGroupAddon align="inline-start">
                <LockKeyholeIcon size={20} />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button
                  type="button"
                  className="text-gray-600 bg-transparent p-1"
                  onClick={handleVisibilityConfirmToggle}
                >
                  {isVisibleConfirm ? (
                    <EyeIcon size={20} />
                  ) : (
                    <EyeOffIcon size={20} />
                  )}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>

        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="danger-bordered"
            onClick={() => navigate("/profile")}
            disabled={isSubmitting}
            className="w-full max-w-50"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="w-full max-w-50"
          >
            {isSubmitting ? "Salvando..." : "Alterar senha"}
          </Button>
        </div>
      </form>
    </section>
  );
}
