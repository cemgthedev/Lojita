import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { authApi } from "@/api/auth.api";
import type { AuthUser, LoginCredentials } from "@/types/Auth";

export type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;

  login: (credentials: LoginCredentials) => Promise<void>;

  logout: () => Promise<void>;

  isAuthenticated: boolean;
};

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [status, setStatus] = useState<AuthStatus>("loading");

  // Ao integrar React Query, esta restauração pode virar `useQuery` com a
  // chave ["auth", "me"]. O restante do contexto continua inalterado.
  useEffect(() => {
    async function restoreSession() {
      try {
        const user = await authApi.me();

        setUser(user);
        setStatus("authenticated");
      } catch {
        setUser(null);
        setStatus("unauthenticated");
      }
    }

    restoreSession();
  }, []);

  async function login(credentials: LoginCredentials) {
    const user = await authApi.login(credentials);

    setUser(user);
    setStatus("authenticated");
  }

  async function logout() {
    await authApi.logout();

    setUser(null);
    setStatus("unauthenticated");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        login,
        logout,
        isAuthenticated: status === "authenticated",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext) as AuthContextValue;
