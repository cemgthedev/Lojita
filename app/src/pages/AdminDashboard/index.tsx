import { useOrdersQuery } from "@/api/resources/orders/queries";
import { useProductsQuery } from "@/api/resources/products/products/queries";
import { useStoresQuery } from "@/api/resources/stores/queries";
import { useTicketsQuery } from "@/api/resources/tickets/queries";
import { TICKET_STATUS } from "@/api/resources/tickets/validations/status.schema";
import { useUsersQuery } from "@/api/resources/users/queries";
import { ROLE } from "@/api/resources/users/validations/auth.schema";
import {
  Card,
  CardContent,
  Heading,
  Input,
  Label,
  Text,
  badgeVariants,
  buttonVariants,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { useHighestRole } from "@/hooks/useHighestRole";
import { useAuth } from "@/providers/AuthProvider";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowRightIcon,
  Clock3Icon,
  HandCoinsIcon,
  ListChecksIcon,
  MessageCircleCheckIcon,
  MessagesSquareIcon,
  MousePointerClickIcon,
  PackageIcon,
  SearchIcon,
  ShoppingBasketIcon,
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

function timeAgo(date: string) {
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "Data indisponível"
    : formatDistanceToNow(parsedDate, { addSuffix: true, locale: ptBR });
}

export function AdminDashboard() {
  const { user } = useAuth();
  const role = useHighestRole(user?.role ?? []);
  const baseUrl =
    role === ROLE.SUPPORT ? urls.support_dashboard : urls.admin_dashboard;
  const [actionSearch, setActionSearch] = useState("");

  const usersQuery = useUsersQuery();
  const storesQuery = useStoresQuery();
  const ticketsQuery = useTicketsQuery();
  const productsQuery = useProductsQuery();
  const ordersQuery = useOrdersQuery();

  const actions: DashboardAction[] = [
    {
      title: "Usuários",
      description: "Gerencie contas",
      href: `${baseUrl}${urls.users}`,
      icon: <UsersIcon size={22} />,
    },
    {
      title: "Lojas",
      description: "Gerencie lojas",
      href: `${baseUrl}${urls.stores}`,
      icon: <StoreIcon size={22} />,
    },
    {
      title: "Categorias",
      description: "Organize produtos",
      href: `${baseUrl}${urls.categories}`,
      icon: <ListChecksIcon size={22} />,
    },
    {
      title: "Atributos",
      description: "Configure atributos",
      href: `${baseUrl}${urls.attributes}`,
      icon: <TagsIcon size={22} />,
    },
    {
      title: "Produtos",
      description: "Gerencie catálogo",
      href: `${baseUrl}${urls.products}`,
      icon: <ShoppingBasketIcon size={22} />,
    },
    {
      title: "Pedidos",
      description: "Acompanhe pedidos",
      href: `${baseUrl}${urls.orders}`,
      icon: <HandCoinsIcon size={22} />,
    },
    {
      title: "Avaliações",
      description: "Modere avaliações",
      href: `${baseUrl}${urls.reviews}`,
      icon: <MessageCircleCheckIcon size={22} />,
    },
    {
      title: "Atendimentos",
      description: "Resolva solicitações",
      href: `${baseUrl}${urls.attendances}`,
      icon: <MessagesSquareIcon size={22} />,
    },
  ];

  const normalizedSearch = actionSearch.trim().toLocaleLowerCase("pt-BR");
  const filteredActions = actions.filter((action) =>
    `${action.title} ${action.description}`
      .toLocaleLowerCase("pt-BR")
      .includes(normalizedSearch),
  );

  const users = usersQuery.data ?? [];
  const stores = storesQuery.data ?? [];
  const tickets = ticketsQuery.data ?? [];
  const products = productsQuery.data ?? [];
  const orders = ordersQuery.data ?? [];
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
      (order.status ?? "").toLocaleLowerCase("pt-BR"),
    ),
  ).length;
  const completedOrders = orders.filter((order) =>
    ["completed", "complete", "delivered"].includes(
      (order.status ?? "").toLocaleLowerCase("pt-BR"),
    ),
  ).length;

  const recentActivities = [
    ...products.map((product) => ({
      id: `product-${product.id}`,
      title: "Novo produto adicionado",
      subject: product.title,
      date: product.createdAt,
      href: `${baseUrl}${urls.products}/${encodeURIComponent(product.id)}`,
      icon: <PackageIcon size={18} />,
    })),
    ...orders.map((order) => ({
      id: `order-${order.id}`,
      title: "Novo pedido recebido",
      subject: `Pedido #${order.id}`,
      date: order.createdAt,
      href: `${baseUrl}${urls.orders}`,
      icon: <HandCoinsIcon size={18} />,
    })),
    ...tickets.map((ticket) => ({
      id: `ticket-${ticket.id}`,
      title: "Atendimento atualizado",
      subject: ticket.subject,
      date: ticket.updatedAt ?? ticket.createdAt,
      href: `${baseUrl}${urls.attendances}/${encodeURIComponent(ticket.id)}/update`,
      icon: <MessagesSquareIcon size={18} />,
    })),
  ]
    .toSorted(
      (activityA, activityB) =>
        Date.parse(activityB.date) - Date.parse(activityA.date),
    )
    .slice(0, 5);

  const hasQueryError = [
    usersQuery.isError,
    storesQuery.isError,
    ticketsQuery.isError,
    productsQuery.isError,
    ordersQuery.isError,
  ].some(Boolean);

  return (
    <main className="space-y-8 p-6">
      <header className="space-y-1">
        <Heading size="sm">
          Bem-vindo, {user?.name.split(" ")[0] ?? "Admin"}
        </Heading>
        <Text>Gerencie a Lojita e acompanhe as atividades da plataforma.</Text>
      </header>

      <section
        aria-labelledby="admin-quick-actions-heading"
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
            <div>
              <Heading id="admin-quick-actions-heading" size="xs">
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

      <section aria-label="Status da plataforma" className="space-y-4">
        {hasQueryError && (
          <Text role="alert" className="animate-pulse-once">
            Não foi possível atualizar alguns indicadores. Os dados disponíveis
            estão sendo exibidos.
          </Text>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<UsersIcon size={22} />}
            title="Usuários cadastrados"
            value={users.length}
            variant="primary-ghost"
            isLoading={usersQuery.isPending}
          />
          <StatCard
            icon={<StoreIcon size={22} />}
            title="Lojas ativas"
            value={stores.filter((store) => store.status === "active").length}
            variant="secondary-ghost"
            isLoading={storesQuery.isPending}
          />
          <StatCard
            icon={<MessagesSquareIcon size={22} />}
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
            title="Total de produtos"
            value={products.length}
            variant="secondary-ghost"
            isLoading={productsQuery.isPending}
          />
          <StatCard
            icon={<HandCoinsIcon size={22} />}
            title="Total de pedidos"
            value={orders.length}
            variant="primary-ghost"
            isLoading={ordersQuery.isPending}
          />
          <StatCard
            icon={<Clock3Icon size={22} />}
            title="Pedidos em processamento"
            value={processingOrders}
            variant="warning-ghost"
            isLoading={ordersQuery.isPending}
          />
          <StatCard
            icon={<PackageIcon size={22} />}
            title="Pedidos completos"
            value={completedOrders}
            variant="success-ghost"
            isLoading={ordersQuery.isPending}
          />
        </div>
      </section>

      <section
        aria-labelledby="admin-recent-activity-heading"
        className="space-y-4"
      >
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={badgeVariants({
                variant: "dark",
                rounded: "full",
                size: "xl",
              })}
            >
              <Clock3Icon size={22} />
            </div>
            <div>
              <Heading id="admin-recent-activity-heading" size="xs">
                Ações recentes
              </Heading>
              <Text>Veja um histórico das atividades mais recentes.</Text>
            </div>
          </div>
        </header>

        {hasQueryError && (
          <Text role="alert" className="animate-pulse-once">
            O histórico pode estar incompleto porque alguns dados não puderam
            ser carregados.
          </Text>
        )}
        {recentActivities.length === 0 ? (
          <Card rounded="lg" size="md">
            <Text>Nenhuma atividade recente encontrada.</Text>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {recentActivities.map((activity) => (
              <Card key={activity.id} rounded="lg" size="sm">
                <CardContent className="space-y-2">
                  <div className="flex gap-2 justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={badgeVariants({
                          variant: "secondary-ghost",
                          rounded: "full",
                        })}
                      >
                        {activity.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{activity.title}</p>
                        <Text className="truncate">{activity.subject}</Text>
                      </div>
                    </div>
                    <Text
                      size={"sm"}
                      className="whitespace-nowrap text-gray-600"
                    >
                      {timeAgo(activity.date)}
                    </Text>
                  </div>
                  <Link
                    to={activity.href}
                    className="flex gap-2 text-sm items-center ml-auto hover:opacity-80 transition-opacity"
                  >
                    <ArrowRightIcon size={16} />
                    Ver detalhes
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
