import { urls } from "@/constants/urls";
import type { NavItem } from "@/types/NavItem";
import {
  HandCoinsIcon,
  HomeIcon,
  ListSortAscendingIcon,
  MessageCircleCheckIcon,
  MessagesCircleIcon,
  ShoppingBasketIcon,
  SlidersHorizontalIcon,
  StoreIcon,
  TagIcon,
  TicketCheckIcon,
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
    href: `${urls.admin_dashboard}${urls.users}`,
    icon: <UsersIcon size={iconSize} />,
  },
  {
    name: "Lojas",
    href: `${urls.admin_dashboard}${urls.stores}`,
    icon: <StoreIcon size={iconSize} />,
  },
  {
    name: "Categorias",
    href: `${urls.admin_dashboard}${urls.categories}`,
    icon: <ListSortAscendingIcon size={iconSize} />,
  },
  {
    name: "Atributos",
    href: `${urls.admin_dashboard}${urls.attributes}`,
    icon: <SlidersHorizontalIcon size={iconSize} />,
  },
  {
    name: "Produtos",
    href: `${urls.admin_dashboard}${urls.products}`,
    icon: <ShoppingBasketIcon size={iconSize} />,
  },
  {
    name: "Cupons",
    href: `${urls.admin_dashboard}${urls.coupons}`,
    icon: <TagIcon size={iconSize} />,
  },
  {
    name: "Pedidos",
    href: `${urls.admin_dashboard}${urls.orders}`,
    icon: <HandCoinsIcon size={iconSize} />,
  },
  {
    name: "Avaliações",
    href: `${urls.admin_dashboard}${urls.reviews}`,
    icon: <MessageCircleCheckIcon size={iconSize} />,
  },
  {
    name: "Atendimentos",
    href: `${urls.admin_dashboard}${urls.attendances}`,
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
    name: "Usuários",
    href: `${urls.support_dashboard}${urls.users}`,
    icon: <UsersIcon size={iconSize} />,
  },
  {
    name: "Lojas",
    href: `${urls.support_dashboard}${urls.stores}`,
    icon: <StoreIcon size={iconSize} />,
  },
  {
    name: "Categorias",
    href: `${urls.support_dashboard}${urls.categories}`,
    icon: <ListSortAscendingIcon size={iconSize} />,
  },
  {
    name: "Atributos",
    href: `${urls.support_dashboard}${urls.attributes}`,
    icon: <SlidersHorizontalIcon size={iconSize} />,
  },
  {
    name: "Produtos",
    href: `${urls.support_dashboard}${urls.products}`,
    icon: <ShoppingBasketIcon size={iconSize} />,
  },
  {
    name: "Cupons",
    href: `${urls.support_dashboard}${urls.coupons}`,
    icon: <TagIcon size={iconSize} />,
  },
  {
    name: "Pedidos",
    href: `${urls.support_dashboard}${urls.orders}`,
    icon: <HandCoinsIcon size={iconSize} />,
  },
  {
    name: "Avaliações",
    href: `${urls.support_dashboard}${urls.reviews}`,
    icon: <MessageCircleCheckIcon size={iconSize} />,
  },
  {
    name: "Atendimentos",
    href: `${urls.support_dashboard}${urls.attendances}`,
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
    href: `${urls.seller_dashboard}${urls.store}`,
    icon: <StoreIcon size={iconSize} />,
  },
  {
    name: "Produtos",
    href: `${urls.seller_dashboard}${urls.products}`,
    icon: <ShoppingBasketIcon size={iconSize} />,
  },
  {
    name: "Atributos",
    href: `${urls.seller_dashboard}${urls.attributes}`,
    icon: <SlidersHorizontalIcon size={iconSize} />,
  },
  {
    name: "Cupons",
    href: `${urls.seller_dashboard}${urls.coupons}`,
    icon: <TagIcon size={iconSize} />,
  },
  {
    name: "Pedidos",
    href: `${urls.seller_dashboard}${urls.orders}`,
    icon: <HandCoinsIcon size={iconSize} />,
  },
  {
    name: "Avaliações",
    href: `${urls.seller_dashboard}${urls.reviews}`,
    icon: <MessageCircleCheckIcon size={iconSize} />,
  },
  {
    name: "Chats",
    href: `${urls.seller_dashboard}${urls.chats}`,
    icon: <MessagesCircleIcon size={iconSize} />,
  },
  {
    name: "Atendimentos",
    href: `${urls.seller_dashboard}${urls.attendances}`,
    icon: <TicketCheckIcon size={iconSize} />,
  },
];
