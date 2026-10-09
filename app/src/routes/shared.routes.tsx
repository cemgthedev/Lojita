import { urls } from "@/constants/urls";
import { ProfilePage } from "@/pages/Profile";
import { ProfileLayout } from "@/pages/Profile/ProfileLayout";
import { ProfileUpdatePage } from "@/pages/Profile/Update";
import { UpdatePasswordPage } from "@/pages/Profile/Update/UpdatePassword";
import type { RouteObject } from "react-router";

export const sharedRoutes: RouteObject[] = [
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
        element: <ProfileUpdatePage />,
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
        element: <UpdatePasswordPage />,
      },
    ],
  },
];
