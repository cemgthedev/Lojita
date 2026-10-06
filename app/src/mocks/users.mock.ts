import { ROLE, type AuthUser, type Role } from "@/types/Auth";
import type { User } from "@/types/User";

/**
 * Fonte de dados temporária para desenvolvimento local.
 *
 * Para criar mocks de outro domínio (por exemplo, produtos), mantenha o mesmo
 * padrão: dados em `src/mocks/products.mock.ts` e um adaptador em
 * `src/shared/lib/products.api.ts`. Assim, componentes e hooks não precisam
 * saber se os dados vieram daqui ou da API.
 */
export const MOCK_LOGIN_PASSWORD = "123456";

type MockUser = User & {
  /** Apenas para simular a validação de login; nunca enviar para a interface. */
  password: string;
};

const createdAt = "2026-01-01T00:00:00.000Z";

/** Um usuário de demonstração para cada perfil protegido da aplicação. */
export const mockUsersByRole: Record<Role, MockUser> = {
  [ROLE.ADMIN]: {
    id: "mock-admin-1",
    name: "Ana Administradora",
    email: "admin@lojita.local",
    password: MOCK_LOGIN_PASSWORD,
    avatarUrl: "",
    document: "000.000.000-01",
    role: [ROLE.ADMIN],
    createdAt,
    updatedAt: createdAt,
  },
  [ROLE.SUPPORT]: {
    id: "mock-support-1",
    name: "Sofia Suporte",
    email: "support@lojita.local",
    password: MOCK_LOGIN_PASSWORD,
    avatarUrl: "",
    document: "000.000.000-02",
    role: [ROLE.SUPPORT],
    createdAt,
    updatedAt: createdAt,
  },
  [ROLE.SELLER]: {
    id: "mock-seller-1",
    name: "Samuel Vendedor",
    email: "seller@lojita.local",
    password: MOCK_LOGIN_PASSWORD,
    avatarUrl: "",
    document: "000.000.000-03",
    role: [ROLE.SELLER],
    createdAt,
    updatedAt: createdAt,
  },
  [ROLE.CUSTOMER]: {
    id: "mock-customer-1",
    name: "Carla Cliente",
    email: "customer@lojita.local",
    password: MOCK_LOGIN_PASSWORD,
    avatarUrl: "",
    document: "000.000.000-04",
    role: [ROLE.CUSTOMER],
    createdAt,
    updatedAt: createdAt,
  },
};

export const mockUsers = Object.values(mockUsersByRole);

function toAuthUser(user: MockUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function findMockUserByCredentials(
  email: string,
  password: string,
): AuthUser | null {
  const user = mockUsers.find(
    (mockUser) =>
      mockUser.email.toLocaleLowerCase() === email.trim().toLocaleLowerCase() &&
      mockUser.password === password,
  );

  return user ? toAuthUser(user) : null;
}

export function findMockUserById(id: string): AuthUser | null {
  const user = mockUsers.find((mockUser) => mockUser.id === id);

  return user ? toAuthUser(user) : null;
}

export function mockUserExistsByEmail(email: string) {
  return mockUsers.some(
    (mockUser) =>
      mockUser.email.toLocaleLowerCase() === email.trim().toLocaleLowerCase(),
  );
}

export function updateMockUserPassword(email: string, password: string) {
  const user = mockUsers.find(
    (mockUser) =>
      mockUser.email.toLocaleLowerCase() === email.trim().toLocaleLowerCase(),
  );

  if (user) {
    user.password = password;
  }
}
