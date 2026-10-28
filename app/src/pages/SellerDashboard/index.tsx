import {
  useChatParticipantsQuery,
  useChatsQuery,
} from "@/api/resources/chats/queries";
import { useOrderSellersQuery } from "@/api/resources/orders/queries";
import { useProductsQuery } from "@/api/resources/products/products/queries";
import { useStoresQuery } from "@/api/resources/stores/queries";
import { useTicketsQuery } from "@/api/resources/tickets/queries";
import { TICKET_STATUS } from "@/api/resources/tickets/validations/status.schema";
import { useUsersQuery } from "@/api/resources/users/queries";
import {
  badgeVariants,
  buttonVariants,
  Card,
  CardContent,
  Heading,
  Input,
  Label,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { useAuth } from "@/providers/AuthProvider";
import {
  ArrowRightIcon,
  Clock3Icon,
  HandCoinsIcon,
  MessageCircleCheckIcon,
  MessagesSquareIcon,
  MousePointerClickIcon,
  PackageIcon,
  SearchIcon,
  ShoppingBasketIcon,
  SlidersHorizontalIcon,
  StoreIcon,
  TagsIcon,
  UsersIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link } from "react-router";

type DashboardAction = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

function StatCard({
  icon,
  title,
  value,
  variant,
  isLoading = false,
}: {
  icon: ReactNode;
  title: string;
  value: number;
  variant:
    | "ghost"
    | "dark-ghost"
    | "primary-ghost"
    | "secondary-ghost"
    | "success-ghost"
    | "warning-ghost"
    | "danger-ghost";
  isLoading?: boolean;
}) {
  return (
    <Card rounded="lg" size="sm">
      <CardContent className="flex-row items-center gap-4">
        <div
          className={buttonVariants({
            variant,
            rounded: "full",
            className: "p-3",
          })}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <Text className="truncate">{title}</Text>
          <Label size="xs">
            {isLoading ? "..." : value.toLocaleString("pt-BR")}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
}

export function SellerDashboard() {
  const { user } = useAuth();
  const [actionSearch, setActionSearch] = useState("");

  const storesQuery = useStoresQuery({ userId: user?.id }, Boolean(user?.id));
  const store = storesQuery.data?.find((item) => item.userId === user?.id);
  const hasStore = Boolean(store?.id);
  const isStorePending = storesQuery.isPending;
  const productsQuery = useProductsQuery(
    { storeId: store?.id },
    hasStore && !isStorePending,
  );
  const orderSellersQuery = useOrderSellersQuery(
    { storeId: store?.id },
    hasStore && !isStorePending,
  );
  const ticketsQuery = useTicketsQuery(
    { requesterId: user?.id },
    Boolean(user?.id),
  );
  const customersQuery = useUsersQuery({ role: "customer" });
  const participantsQuery = useChatParticipantsQuery(
    { userId: user?.id },
    Boolean(user?.id),
  );
  const chatsQuery = useChatsQuery();

  const baseUrl = urls.seller_dashboard;
  const actions: DashboardAction[] = [
    {
      title: "Loja",
      description: "Edite sua loja",
      href: `${baseUrl}${urls.store}`,
      icon: <StoreIcon size={22} />,
    },
    {
      title: "Produtos",
      description: "Gerencie catálogo",
      href: `${baseUrl}${urls.products}`,
      icon: <ShoppingBasketIcon size={22} />,
    },
    {
      title: "Atributos",
      description: "Configure atributos",
      href: `${baseUrl}${urls.attributes}`,
      icon: <SlidersHorizontalIcon size={22} />,
    },
    {
      title: "Cupons",
      description: "Crie promoções",
      href: `${baseUrl}${urls.coupons}`,
      icon: <TagsIcon size={22} />,
    },
    {
      title: "Pedidos",
      description: "Acompanhe pedidos",
      href: `${baseUrl}${urls.orders}`,
      icon: <HandCoinsIcon size={22} />,
    },
    {
      title: "Avaliações",
      description: "Leia avaliações",
      href: `${baseUrl}${urls.reviews}`,
      icon: <MessageCircleCheckIcon size={22} />,
    },
    {
      title: "Chats",
      description: "Fale com clientes",
      href: `${baseUrl}${urls.chats}`,
      icon: <MessagesSquareIcon size={22} />,
    },
    {
      title: "Atendimentos",
      description: "Peça suporte",
      href: `${baseUrl}${urls.attendances}`,
      icon: <Clock3Icon size={22} />,
    },
  ];
  const normalizedSearch = actionSearch.trim().toLocaleLowerCase("pt-BR");
  const filteredActions = actions.filter((action) =>
    `${action.title} ${action.description}`
      .toLocaleLowerCase("pt-BR")
      .includes(normalizedSearch),
  );

  const products = productsQuery.data ?? [];
  const orders = orderSellersQuery.data ?? [];
  const tickets = ticketsQuery.data ?? [];
  const chats = chatsQuery.data ?? [];
  const participantChatIds = new Set(
    (participantsQuery.data ?? []).map((participant) => participant.chatId),
  );
  const sellerChats = chats.filter((chat) => participantChatIds.has(chat.id));
  const openChats = sellerChats.filter((chat) => chat.closedAt == null).length;
  const openTicketStatuses: string[] = [
    TICKET_STATUS.NEW,
    TICKET_STATUS.OPEN,
    TICKET_STATUS.IN_PROGRESS,
    TICKET_STATUS.WAITING_CUSTOMER,
  ];
  const openTickets = tickets.filter((ticket) =>
    openTicketStatuses.includes(ticket.status),
  ).length;
  const completedTickets = tickets.filter(
    (ticket) =>
      ticket.status === TICKET_STATUS.RESOLVED ||
      ticket.status === TICKET_STATUS.CLOSED,
  ).length;
  const processingOrders = orders.filter((order) =>
    ["pending", "processing", "in_progress"].includes(
      order.status.toLocaleLowerCase("pt-BR"),
    ),
  ).length;
  const completedOrders = orders.filter((order) =>
    ["completed", "complete", "delivered"].includes(
      order.status.toLocaleLowerCase("pt-BR"),
    ),
  ).length;
  const hasQueryError = [
    storesQuery.isError,
    productsQuery.isError,
    orderSellersQuery.isError,
    ticketsQuery.isError,
    customersQuery.isError,
    participantsQuery.isError,
    chatsQuery.isError,
  ].some(Boolean);

  return (
    <main className="space-y-8 p-6">
      <header className="space-y-1">
        <Heading size="sm">
          Bem-vindo, {user?.name.split(" ")[0] ?? "Vendedor"}
        </Heading>
        <Text>
          {store?.name
            ? `Acompanhe o desempenho da loja ${store.name}.`
            : "Gerencie sua loja e acompanhe suas atividades."}
        </Text>
      </header>

      <section
        aria-labelledby="seller-quick-actions-heading"
        className="space-y-4"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className={badgeVariants({
                variant: "dark",
                rounded: "full",
                size: "xl",
              })}
            >
              <MousePointerClickIcon size={24} />
            </div>
            <div className="space-y-1">
              <Heading id="seller-quick-actions-heading" size="xs">
                Ações rápidas
              </Heading>
              <Text>Encontre rapidamente uma funcionalidade.</Text>
            </div>
          </div>
          <div className="relative w-full sm:max-w-sm">
            <SearchIcon
              aria-hidden="true"
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <Input
              type="search"
              value={actionSearch}
              onChange={(event) => setActionSearch(event.target.value)}
              placeholder="Pesquisar funcionalidade..."
              aria-label="Pesquisar funcionalidade"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filteredActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Card
                className="h-full transition hover:-translate-y-0.5 hover:shadow-md"
                rounded="lg"
                size="sm"
              >
                <CardContent className="flex-row items-center gap-3">
                  <div
                    className={badgeVariants({
                      variant: "dark-ghost",
                      rounded: "full",
                    })}
                  >
                    {action.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{action.title}</p>
                    <Text>{action.description}</Text>
                  </div>
                  <ArrowRightIcon className="ml-auto shrink-0" size={16} />
                </CardContent>
              </Card>
            </Link>
          ))}
          {filteredActions.length === 0 && (
            <Text className="col-span-full rounded-lg border border-secondary-600 p-6 text-center">
              Nenhuma funcionalidade encontrada.
            </Text>
          )}
        </div>
      </section>

      <section aria-label="Status da loja" className="space-y-4">
        {hasQueryError && (
          <Text role="alert" className="animate-pulse-once">
            Não foi possível atualizar alguns indicadores. Os dados disponíveis
            estão sendo exibidos.
          </Text>
        )}
        {storesQuery.isError && !store && (
          <Text role="alert" className="animate-pulse-once">
            Não foi possível carregar a loja vinculada a este usuário.
          </Text>
        )}
        {!isStorePending && !store && !storesQuery.isError && (
          <Text role="status">
            Nenhuma loja está vinculada a este usuário. Cadastre ou vincule uma
            loja para consultar produtos e pedidos.
          </Text>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<UsersIcon size={22} />}
            title="Clientes cadastrados"
            value={customersQuery.data?.length ?? 0}
            variant="primary-ghost"
            isLoading={customersQuery.isPending}
          />
          <StatCard
            icon={<MessagesSquareIcon size={22} />}
            title="Chats abertos"
            value={openChats}
            variant="secondary-ghost"
            isLoading={chatsQuery.isPending || participantsQuery.isPending}
          />
          <StatCard
            icon={<Clock3Icon size={22} />}
            title="Atendimentos abertos"
            value={openTickets}
            variant="warning-ghost"
            isLoading={ticketsQuery.isPending}
          />
          <StatCard
            icon={<MessageCircleCheckIcon size={22} />}
            title="Atendimentos completos"
            value={completedTickets}
            variant="success-ghost"
            isLoading={ticketsQuery.isPending}
          />
          <StatCard
            icon={<ShoppingBasketIcon size={22} />}
            title="Produtos da loja"
            value={products.length}
            variant="secondary-ghost"
            isLoading={isStorePending || productsQuery.isPending}
          />
          <StatCard
            icon={<HandCoinsIcon size={22} />}
            title="Total de pedidos"
            value={orders.length}
            variant="primary-ghost"
            isLoading={isStorePending || orderSellersQuery.isPending}
          />
          <StatCard
            icon={<Clock3Icon size={22} />}
            title="Pedidos em processamento"
            value={processingOrders}
            variant="warning-ghost"
            isLoading={isStorePending || orderSellersQuery.isPending}
          />
          <StatCard
            icon={<PackageIcon size={22} />}
            title="Pedidos completos"
            value={completedOrders}
            variant="success-ghost"
            isLoading={isStorePending || orderSellersQuery.isPending}
          />
        </div>
      </section>
    </main>
  );
}
