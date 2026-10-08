import { adminNavConfig } from "@/components/structures/headers/AdminHeader/nav.config";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
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
import { useAuth } from "@/providers/AuthProvider";
import { authApi } from "@/shared/lib/auth.api";
import { cn } from "@/utils/cn";
import { LogOutIcon, UserCircle2Icon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

const notVisibleHeaderRoutes = [urls.login, urls.register, urls.profile];

export function AdminHeader() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const currentPath = pathname + hash;

  const isNotVisibleHeader = notVisibleHeaderRoutes.includes(currentPath);

  if (isNotVisibleHeader) {
    return null;
  }

  function handleLogout() {
    authApi.logout();
    navigate(urls.home);
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
          {adminNavConfig.map((item) => (
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
            <div className="flex items-center gap-2">
              <Avatar size="lg">
                <AvatarImage src={user?.avatarUrl} alt="logo" />
                <AvatarFallback variant="primary">AU</AvatarFallback>
              </Avatar>
              <div>
                <Label size="xs">{user?.name || "Usuário"}</Label>
                <Text>{user?.email}</Text>
              </div>
            </div>
            <Separator
              variant={"secondary"}
              orientation="horizontal"
              className="my-2"
            />
            <Label size="xs">Minha conta</Label>
            <DropdownMenuItem>
              <Link
                to={urls.profile}
                className="hover:text-secondary flex gap-2 items-center transition-colors"
              >
                Ver perfil
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuItem>
            <Button
              onClick={handleLogout}
              className="bg-transparent p-0 text-danger flex gap-2 items-center"
            >
              <LogOutIcon size={16} />
              Sair
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
