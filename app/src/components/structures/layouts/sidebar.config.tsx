import { urls } from "@/constants/urls";
import type { NavItem } from "@/types/NavItem";
import {
  BoxIcon,
  HandCoinsIcon,
  HomeIcon,
  ListSortAscendingIcon,
  MessageCircleCheckIcon,
  MessagesCircleIcon,
  ShoppingBasketIcon,
  StoreIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";

const iconSize = 20;

export const adminSidebarItems: NavItem[] = [
  {
    name: "Dashboard",
    href: urls.admin_dashboard,
    icon: <HomeIcon size={iconSize} />,
  },
  {
    name: "Usuários",
    href: `${urls.admin_dashboard}/users`,
    icon: <UsersIcon size={iconSize} />,
  },
  {
    name: "Lojas",
    href: `${urls.admin_dashboard}/stores`,
    icon: <StoreIcon size={iconSize} />,
  },
  {
    name: "Categorias",
    href: `${urls.admin_dashboard}/categories`,
    icon: <ListSortAscendingIcon size={iconSize} />,
  },
  {
    name: "Variantes",
    href: `${urls.admin_dashboard}/variants`,
    icon: <BoxIcon size={iconSize} />,
  },
  {
    name: "Produtos",
    href: `${urls.admin_dashboard}/products`,
    icon: <ShoppingBasketIcon size={iconSize} />,
  },
  {
    name: "Cupons",
    href: `${urls.admin_dashboard}/coupons`,
    icon: <TagIcon size={iconSize} />,
  },
  {
    name: "Pedidos",
    href: `${urls.admin_dashboard}/orders`,
    icon: <HandCoinsIcon size={iconSize} />,
  },
  {
    name: "Avaliações",
    href: `${urls.admin_dashboard}/reviews`,
    icon: <MessageCircleCheckIcon size={iconSize} />,
  },
  {
    name: "Atendimentos",
    href: `${urls.admin_dashboard}/support`,
    icon: <MessagesCircleIcon size={iconSize} />,
  },
];

export const supportSidebarItems: NavItem[] = [
  {
    name: "Dashboard",
    href: urls.support_dashboard,
    icon: <HomeIcon size={iconSize} />,
  },
  {
    name: "Lojas",
    href: `${urls.support_dashboard}/stores`,
    icon: <StoreIcon size={iconSize} />,
  },
  {
    name: "Categorias",
    href: `${urls.support_dashboard}/categories`,
    icon: <ListSortAscendingIcon size={iconSize} />,
  },
  {
    name: "Variantes",
    href: `${urls.support_dashboard}/variants`,
    icon: <BoxIcon size={iconSize} />,
  },
  {
    name: "Produtos",
    href: `${urls.support_dashboard}/products`,
    icon: <ShoppingBasketIcon size={iconSize} />,
  },
  {
    name: "Cupons",
    href: `${urls.support_dashboard}/coupons`,
    icon: <TagIcon size={iconSize} />,
  },
  {
    name: "Pedidos",
    href: `${urls.support_dashboard}/orders`,
    icon: <HandCoinsIcon size={iconSize} />,
  },
  {
    name: "Avaliações",
    href: `${urls.support_dashboard}/reviews`,
    icon: <MessageCircleCheckIcon size={iconSize} />,
  },
  {
    name: "Atendimentos",
    href: `${urls.support_dashboard}/support`,
    icon: <MessagesCircleIcon size={iconSize} />,
  },
];

export const sellerSidebarItems: NavItem[] = [
  {
    name: "Dashboard",
    href: urls.seller_dashboard,
    icon: <HomeIcon size={iconSize} />,
  },
  {
    name: "Loja",
    href: `${urls.seller_dashboard}/store`,
    icon: <StoreIcon size={iconSize} />,
  },
  {
    name: "Produtos",
    href: `${urls.seller_dashboard}/products`,
    icon: <ShoppingBasketIcon size={iconSize} />,
  },
  {
    name: "Cupons",
    href: `${urls.seller_dashboard}/coupons`,
    icon: <TagIcon size={iconSize} />,
  },
  {
    name: "Pedidos",
    href: `${urls.seller_dashboard}/orders`,
    icon: <HandCoinsIcon size={iconSize} />,
  },
  {
    name: "Avaliações",
    href: `${urls.seller_dashboard}/reviews`,
    icon: <MessageCircleCheckIcon size={iconSize} />,
  },
  {
    name: "Chats",
    href: `${urls.seller_dashboard}/chats`,
    icon: <MessagesCircleIcon size={iconSize} />,
  },
];
