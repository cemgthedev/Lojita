import { publicNavConfig } from "@/components/structures/headers/PublicHeader/nav.config";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
  Separator,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { cn } from "@/utils/cn";
import { UserCircle2Icon } from "lucide-react";
import { Link, useLocation } from "react-router";

const notVisibleHeaderRoutes = [urls.login, urls.register];

export function PublicHeader() {
  const { pathname, hash } = useLocation();

  const currentPath = pathname + hash;

  const isNotVisibleHeader = notVisibleHeaderRoutes.includes(currentPath);

  if (isNotVisibleHeader) {
    return null;
  }

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-300 px-6 py-3">
      <div className="flex items-center gap-8">
        <Link to={urls.home} className="flex items-center gap-2">
          <Avatar size="lg">
            <AvatarImage src="/logo.svg" alt="logo" />
            <AvatarFallback variant="primary">AU</AvatarFallback>
          </Avatar>
          <Label size="xl" variant="secondary">
            Lojita
          </Label>
        </Link>

        <ul className="flex items-center gap-4">
          {publicNavConfig.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href ?? "#"}
                className={cn(
                  "flex items-center gap-2 hover:opacity-80 transition-opacity",
                  pathname === item.href ? "text-secondary" : "text-foreground",
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="border-none bg-transparent p-0 hover:opacity-80 hover:cursor-pointer transition-opacity">
          <UserCircle2Icon size={32} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-64 max-w-64 p-3">
          <DropdownMenuGroup>
            <div>
              <Label size="xs">Não autenticado</Label>
              <Text>Faça login ou cadastre-se para acessar sua conta.</Text>
            </div>
            <Separator
              variant={"secondary"}
              orientation="horizontal"
              className="my-2"
            />
            <DropdownMenuItem>
              <Link
                to={urls.login}
                className="hover:text-secondary flex gap-2 items-center transition-colors"
              >
                Faça login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                to={urls.register}
                className="hover:text-secondary flex gap-2 items-center transition-colors"
              >
                Cliente novo ? Cadastre-se
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
