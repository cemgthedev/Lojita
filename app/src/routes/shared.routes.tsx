import { urls } from "@/constants/urls";
import { ProfilePage } from "@/pages/Profile";
import { ProfileLayout } from "@/pages/Profile/ProfileLayout";
import { ProfileUpdatePage } from "@/pages/Profile/Update";
import { SellerRegisterPage } from "@/pages/SellerRegister";
import { UpdatePasswordPage } from "@/pages/Profile/Update/UpdatePassword";
import { AddressesPage } from "@/pages/Profile/Addresses";
import { CreateAddressesPage } from "@/pages/Profile/Addresses/Create";
import { UpdateAddressesPage } from "@/pages/Profile/Addresses/Update";
import { PaymentMethodsPage } from "@/pages/Profile/Payments";
import { CreatePaymentMethodPage } from "@/pages/Profile/Payments/Create";
import { UpdatePaymentMethodPage } from "@/pages/Profile/Payments/Update";
import type { RouteObject } from "react-router";

export const sharedRoutes: RouteObject[] = [
  {
    path: urls.seller_register,
    element: <SellerRegisterPage />,
  },
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
        element: <AddressesPage />,
      },
      {
        path: `${urls.addresses.slice(1)}${urls.create}`,
        element: <CreateAddressesPage />,
      },
      {
        path: `${urls.addresses.slice(1)}${urls.update}/:addressId`,
        element: <UpdateAddressesPage />,
      },
      {
        path: urls.payments.slice(1),
        element: <PaymentMethodsPage />,
      },
      {
        path: `${urls.payments.slice(1)}${urls.create}`,
        element: <CreatePaymentMethodPage />,
      },
      {
        path: `${urls.payments.slice(1)}${urls.update}/:paymentMethodId`,
        element: <UpdatePaymentMethodPage />,
      },
      {
        path: urls.security.slice(1),
        element: <UpdatePasswordPage />,
      },
    ],
  },
];
