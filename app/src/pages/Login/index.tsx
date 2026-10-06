import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import {
  Button,
  Field,
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
import { EyeIcon, EyeOffIcon, LockKeyholeIcon, MailIcon } from "lucide-react";

const defaultRouteByRole: Record<Role, string> = {
  admin: "/admin-dashboard",
  support: "/support-dashboard",
  seller: "/seller-dashboard",
  customer: "/customer-dashboard",
};

type LocationState = {
  from?: { pathname?: string };
};

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(mockUsers[0].email);
  const [password, setPassword] = useState(MOCK_LOGIN_PASSWORD);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleVisibilityToggle() {
    setIsVisible((prev) => !prev);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      const user = mockUsers.find((mockUser) => mockUser.email === email);
      const from = (location.state as LocationState | null)?.from?.pathname;
      navigate(from ?? defaultRouteByRole[user?.role[0] ?? "customer"], {
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
                  <Text>Acesse sua conta para continuar</Text>
                </div>
              </FieldLegend>

              <FieldGroup className="mt-4 flex flex-col gap-4">
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
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password-input">Senha</FieldLabel>

                    <Link
                      to={urls.forgot_password}
                      className="text-sm text-primary-600"
                    >
                      Esqueci minha senha
                    </Link>
                  </div>
                  <InputGroup>
                    <InputGroupInput
                      id="password-input"
                      placeholder="••••••••"
                      type={isVisible ? "text" : "password"}
                      required
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
              </FieldGroup>

              <Link
                to={urls.register}
                className="text-secondary-600 gap-1 flex"
              >
                <span className="text-foreground whitespace-nowrap">
                  Não possui uma conta?
                </span>
                Cadastre-se
              </Link>

              <Button
                variant={"secondary"}
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </FieldSet>
          </FieldGroup>
        </form>

        <section>
          <Text size="sm">Contas de teste (senha: {MOCK_LOGIN_PASSWORD})</Text>
          <ul>
            {mockUsers.map((user) => (
              <li key={user.id}>
                <Button
                  className="text-sm text-primary-600 underline p-0 bg-transparent"
                  onClick={() => {
                    setEmail(user.email);
                    setPassword(MOCK_LOGIN_PASSWORD);
                  }}
                >
                  {user.role[0]}: {user.email}
                </Button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
