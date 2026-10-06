import {
  mockUserExistsByEmail,
  updateMockUserPassword,
} from "@/mocks/users.mock";

const MOCK_RESET_CODE = "123456";
const RESET_CODE_TTL_IN_MS = 10 * 60 * 1000;
const MAX_VERIFICATION_ATTEMPTS = 5;

type PasswordResetRequest = {
  code: string;
  expiresAt: number;
  attempts: number;
};

const requests = new Map<string, PasswordResetRequest>();

function normalizeEmail(email: string) {
  return email.trim().toLocaleLowerCase();
}

export const passwordRecoveryApi = {
  async requestReset(email: string): Promise<void> {
    const normalizedEmail = normalizeEmail(email);

    // API: POST /auth/password-recovery with { email }.
    // A API deve sempre retornar sucesso para não revelar se o e-mail possui conta.
    if (mockUserExistsByEmail(normalizedEmail)) {
      requests.set(normalizedEmail, {
        code: MOCK_RESET_CODE,
        expiresAt: Date.now() + RESET_CODE_TTL_IN_MS,
        attempts: 0,
      });
    }
  },

  async confirmReset({
    email,
    code,
    password,
  }: {
    email: string;
    code: string;
    password: string;
  }): Promise<void> {
    const normalizedEmail = normalizeEmail(email);
    const request = requests.get(normalizedEmail);

    // API: POST /auth/password-recovery/confirm with o token recebido por e-mail
    // e a nova senha. O servidor valida expiração, tentativa e uso único do token.
    if (
      !request ||
      request.expiresAt < Date.now() ||
      request.attempts >= MAX_VERIFICATION_ATTEMPTS
    ) {
      requests.delete(normalizedEmail);
      throw new Error("O código expirou. Solicite um novo código.");
    }

    if (request.code !== code) {
      request.attempts += 1;
      throw new Error("Código inválido. Verifique e tente novamente.");
    }

    updateMockUserPassword(normalizedEmail, password);
    requests.delete(normalizedEmail);
  },
};
