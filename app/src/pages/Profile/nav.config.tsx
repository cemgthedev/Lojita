import { urls } from "@/constants/urls";
import { ROLE, type Role } from "@/types/Auth";
import type { NavItem } from "@/types/NavItem";
import { CreditCardIcon, LockIcon, PinIcon, User2Icon } from "lucide-react";

const adminTabConfig: NavItem[] = [
  {
    name: "Perfil",
    icon: <User2Icon size={24} />,
    href: urls.profile,
  },
  {
    name: "Segurança",
    icon: <LockIcon size={24} />,
    href: `${urls.profile}${urls.security}`,
  },
];

const supportTabConfig: NavItem[] = [
  {
    name: "Perfil",
    icon: <User2Icon size={24} />,
    href: urls.profile,
  },
  {
    name: "Segurança",
    icon: <LockIcon size={24} />,
    href: `${urls.profile}${urls.security}`,
  },
];

const sellerTabConfig: NavItem[] = [
  {
    name: "Perfil",
    icon: <User2Icon size={24} />,
    href: urls.profile,
  },
  {
    name: "Endereços",
    icon: <PinIcon size={24} />,
    href: `${urls.profile}${urls.addresses}`,
  },
  {
    name: "Pagamentos",
    icon: <CreditCardIcon size={24} />,
    href: `${urls.profile}${urls.payments}`,
  },
  {
    name: "Segurança",
    icon: <LockIcon size={24} />,
    href: `${urls.profile}${urls.security}`,
  },
];

const customerTabConfig: NavItem[] = [
  {
    name: "Perfil",
    icon: <User2Icon size={24} />,
    href: urls.profile,
  },
  {
    name: "Endereços",
    icon: <PinIcon size={24} />,
    href: `${urls.profile}${urls.addresses}`,
  },
  {
    name: "Pagamentos",
    icon: <CreditCardIcon size={24} />,
    href: `${urls.profile}${urls.payments}`,
  },
  {
    name: "Segurança",
    icon: <LockIcon size={24} />,
    href: `${urls.profile}${urls.security}`,
  },
];

export const profileTabConfig: Record<Role, NavItem[]> = {
  [ROLE.ADMIN]: adminTabConfig,
  [ROLE.SUPPORT]: supportTabConfig,
  [ROLE.SELLER]: sellerTabConfig,
  [ROLE.CUSTOMER]: customerTabConfig,
};
