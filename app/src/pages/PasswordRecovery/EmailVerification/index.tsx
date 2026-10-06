import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { passwordRecoveryApi } from "@/shared/lib/password-recovery.api";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
  LockKeyholeIcon,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";

type PasswordRecoveryLocationState = {
  email?: string;
};

export function EmailVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email =
    (location.state as PasswordRecoveryLocationState | null)?.email ?? "";
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!email) {
    return <Navigate to={urls.forgot_password} replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!/^\d{6}$/.test(code)) {
      setError("Informe o código de seis dígitos.");
      return;
    }

    if (password.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== passwordConfirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsSubmitting(true);

    try {
      await passwordRecoveryApi.confirmReset({ email, code, password });

      // API: após invalidar o token de uso único, redirecione para o login.
      // Não crie uma sessão automaticamente após redefinir a senha.
      navigate(urls.login, {
        replace: true,
        state: { passwordReset: true },
      });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível redefinir a senha.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="border border-secondary m-auto flex w-full sm:w-sm flex-col gap-6 rounded-lg p-4">
        <div className="flex flex-col gap-1 text-center">
          <Label>Verifique seu e-mail</Label>
          <Text>
            Informe o código enviado para{" "}
            <strong className="wrap-break-word">{email}</strong> e escolha uma
            nova senha.
          </Text>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="verification-code">Código</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="verification-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="000000"
                  value={code}
                  onChange={(event) =>
                    setCode(event.target.value.replace(/\D/g, ""))
                  }
                  required
                />
                <InputGroupAddon align="inline-start">
                  <KeyRoundIcon size={20} />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <PasswordField
                id="new-password"
                label="Nova senha"
                value={password}
                isVisible={isPasswordVisible}
                onChange={setPassword}
                onVisibilityToggle={() =>
                  setIsPasswordVisible((value) => !value)
                }
              />

              <PasswordField
                id="confirm-new-password"
                label="Confirmar nova senha"
                value={passwordConfirmation}
                isVisible={isConfirmationVisible}
                onChange={setPasswordConfirmation}
                onVisibilityToggle={() =>
                  setIsConfirmationVisible((value) => !value)
                }
              />

              <FieldError>{error}</FieldError>
            </Field>

            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
            </Button>
          </FieldGroup>
        </form>

        <Link
          to={urls.forgot_password}
          className="text-center flex gap-2 justify-center items-center hover:text-primary-600 transition-colors"
        >
          <ArrowLeftIcon size={20} />
          <Text>Usar outro e-mail</Text>
        </Link>
      </div>
    </main>
  );
}

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  isVisible: boolean;
  onChange: (value: string) => void;
  onVisibilityToggle: () => void;
};

function PasswordField({
  id,
  label,
  value,
  isVisible,
  onChange,
  onVisibilityToggle,
}: PasswordFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={id}
          type={isVisible ? "text" : "password"}
          autoComplete="new-password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
        />
        <InputGroupAddon align="inline-start">
          <LockKeyholeIcon size={20} />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Button
            type="button"
            variant="ghost"
            className="p-1"
            onClick={onVisibilityToggle}
            aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
          >
            {isVisible ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
