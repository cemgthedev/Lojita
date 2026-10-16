import {
  findMockUserByCredentials,
  findMockUserById,
  updateMockUserPasswordById,
} from "@/api/resources/users/users.mock";
import type {
  AuthUser,
  LoginCredentials,
  Role,
} from "@/api/resources/users/validations/auth.schema";
import {
  MOCK_LOGIN_PASSWORD,
  mockUsers,
  mockUsersByRole,
} from "@/api/resources/users/users.mock";

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
  getDemoUsers(): AuthUser[] {
    return mockUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      document: user.document,
      phone: user.phone,
      role: user.role,
      avatarUrl: user.avatarUrl,
    }));
  },

  getDemoLoginCredentials(role?: Role): LoginCredentials {
    const user = role ? mockUsersByRole[role] : mockUsers[0];
    return {
      email: user.email,
      password: MOCK_LOGIN_PASSWORD,
    };
  },

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

  async changePassword(password: string): Promise<void> {
    const userId = localStorage.getItem(MOCK_SESSION_KEY);

    if (!userId || !updateMockUserPasswordById(userId, password)) {
      throw new Error("Não foi possível encontrar a conta autenticada.");
    }

    // API futura:
    // await http.put("/auth/password", { password });
  },

  async logout(): Promise<void> {
    localStorage.removeItem(MOCK_SESSION_KEY);

    // API futura:
    // await http.post("/auth/logout");
  },
};
