import {
  findMockUserByCredentials,
  findMockUserById,
} from "@/mocks/users.mock";
import type { AuthUser, LoginCredentials } from "@/types/Auth";

const MOCK_SESSION_KEY = "lojita:mock-session-user-id";

/**
 * Adaptador de autenticação temporariamente conectado aos mocks.
 *
 * Migração para a API: mantenha esta interface e substitua apenas os corpos
 * abaixo por `http.post`/`http.get`. O provider poderá trocar a restauração de
 * sessão por `useQuery({ queryKey: ["auth", "me"], queryFn: authApi.me })`;
 * para login/logout, use `useMutation` chamando estes mesmos métodos.
 */

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    const user = findMockUserByCredentials(
      credentials.email,
      credentials.password,
    );

    if (!user) {
      throw new Error("E-mail ou senha inválidos.");
    }

    localStorage.setItem(MOCK_SESSION_KEY, user.id);

    return user;

    // API futura:
    // const response = await http.post<AuthUser>("/auth/login", credentials);
    // return response.data;
  },

  async me(): Promise<AuthUser> {
    const userId = localStorage.getItem(MOCK_SESSION_KEY);
    const user = userId ? findMockUserById(userId) : null;

    if (!user) {
      throw new Error("Sessão não encontrada.");
    }

    return user;

    // API futura:
    // const response = await http.get<AuthUser>("/auth/me");
    // return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem(MOCK_SESSION_KEY);

    // API futura:
    // await http.post("/auth/logout");
  },
};
