import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_LOGIN_PASSWORD, mockUsers } from "@/mocks/users.mock";
import type { Role } from "@/types/Auth";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeOffIcon,
  LockKeyholeIcon,
  MailIcon,
  User2Icon,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const defaultRouteByRole: Record<Role, string> = {
  admin: "/admin-dashboard",
  support: "/support-dashboard",
  seller: "/seller-dashboard",
  customer: "/customer-dashboard",
};

type LocationState = {
  from?: { pathname?: string };
};

export function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(mockUsers[0].email);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setPasswordConfirm(event.target.value);
  }

  const isPasswordMatch = passwordConfirm === password;

  function handleVisibilityToggle() {
    setIsVisible((prev) => !prev);
  }

  function handleVisibilityConfirmToggle() {
    setIsVisibleConfirm((prev) => !prev);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { email } = mockUsers.find((mockUser) =>
        mockUser.role.includes("customer"),
      ) ?? { email: "" };
      await login({ email, password: MOCK_LOGIN_PASSWORD });
      const from = (location.state as LocationState | null)?.from?.pathname;
      navigate(from ?? defaultRouteByRole.customer, {
        replace: true,
      });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível entrar.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="border border-secondary rounded-lg m-auto flex w-full sm:w-sm flex-col justify-center gap-6 p-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet className="gap-6">
              <FieldLegend className="text-center">
                <div className="flex flex-col gap-1">
                  <Label>Lojita</Label>
                  <Text>Cadastre-se para começar a utilizar a Lojita</Text>
                </div>
              </FieldLegend>

              <FieldGroup className="mt-4 flex flex-col gap-4">
                <Field>
                  <FieldLabel htmlFor="name-input">Nome</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="name-input"
                      placeholder="Seu nome completo"
                      required
                    />
                    <InputGroupAddon align="inline-start">
                      <User2Icon size={20} />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="email-input">Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="email-input"
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                    <InputGroupAddon align="inline-start">
                      <MailIcon size={20} />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="password-input">Senha</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="password-input"
                      placeholder="••••••••"
                      type={isVisible ? "text" : "password"}
                      required
                      onChange={handlePasswordChange}
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
                        {isVisible ? (
                          <EyeIcon size={20} />
                        ) : (
                          <EyeOffIcon size={20} />
                        )}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirm-password-input">
                    Confirmar senha
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="confirm-password-input"
                      placeholder="••••••••"
                      type={isVisibleConfirm ? "text" : "password"}
                      required
                      onChange={handleConfirmPasswordChange}
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
                  <FieldError>
                    {passwordConfirm && !isPasswordMatch && (
                      <p className="text-red-500 text-sm">
                        As senhas não coincidem
                      </p>
                    )}
                  </FieldError>
                </Field>
              </FieldGroup>

              <Button
                variant={"secondary"}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Criando..." : "Criar conta"}
              </Button>
            </FieldSet>
          </FieldGroup>
        </form>

        <Link
          to={urls.login}
          className="text-center flex gap-2 justify-center items-center hover:text-primary-600 transition-colors"
        >
          <ArrowLeftIcon size={20} />
          <Text>Voltar para o login</Text>
        </Link>
      </div>
    </main>
  );
}
