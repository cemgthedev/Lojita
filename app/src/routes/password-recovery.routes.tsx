import { PublicLayout } from "@/components/structures/layouts/PublicLayout";
import { urls } from "@/constants/urls";
import { EmailVerificationPage } from "@/pages/PasswordRecovery/EmailVerification";
import { ForgotPasswordPage } from "@/pages/PasswordRecovery/ForgotPassword";
import type { RouteObject } from "react-router";

/**
 * Recuperação de senha é isolada do restante das rotas públicas.
 * O código de uso único enviado por e-mail é a credencial temporária do fluxo;
 * por isso ele não exige uma sessão autenticada previamente.
 */
export const passwordRecoveryRoutes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      {
        path: urls.forgot_password,
        element: <ForgotPasswordPage />,
      },
      {
        path: urls.email_verification,
        element: <EmailVerificationPage />,
      },
    ],
  },
];
