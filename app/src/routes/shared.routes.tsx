import { urls } from "@/constants/urls";
import { ProfileLayout } from "@/pages/Profile/ProfileLayout";
import { ProfilePage } from "@/pages/Profile";
import { RequireAuth } from "@/routes/guards/RequireAuth";
import type { RouteObject } from "react-router";

export const sharedRoutes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        path: urls.profile,
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: urls.update.slice(1),
            element: <div>Atualizar perfil</div>,
          },
          {
            path: urls.addresses.slice(1),
            element: <div>Endereços</div>,
          },
          {
            path: urls.payments.slice(1),
            element: <div>Pagamentos</div>,
          },
          {
            path: urls.security.slice(1),
            element: <div>Segurança</div>,
          },
        ],
      },
    ],
  },
];
