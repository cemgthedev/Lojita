import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";

import { useAuth } from "@/hooks/useAuth";
import { MOCK_LOGIN_PASSWORD, mockUsers } from "@/mocks/users.mock";
import type { Role } from "@/types/Auth";

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
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      const user = mockUsers.find((mockUser) => mockUser.email === email);
      const from = (location.state as LocationState | null)?.from?.pathname;
      navigate(from ?? defaultRouteByRole[user?.role[0] ?? ""], {
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
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">Entrar</h1>
        <p className="text-muted-foreground">
          Ambiente de desenvolvimento com usuários mockados.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1">
          E-mail
          <input
            className="rounded border p-2"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          Senha
          <input
            className="rounded border p-2"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && <p className="text-danger-600">{error}</p>}

        <button
          className="rounded bg-primary p-2 text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <section className="text-sm">
        <p className="font-medium">
          Contas de teste (senha: {MOCK_LOGIN_PASSWORD})
        </p>
        <ul className="mt-2 space-y-1">
          {mockUsers.map((user) => (
            <li key={user.id}>
              <button
                className="text-primary-600 underline"
                type="button"
                onClick={() => {
                  setEmail(user.email);
                  setPassword(MOCK_LOGIN_PASSWORD);
                }}
              >
                {user.role[0]}: {user.email}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
