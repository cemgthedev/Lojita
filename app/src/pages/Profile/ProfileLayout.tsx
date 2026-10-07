import { Button, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { useAuth } from "@/hooks/useAuth";
import { useHighestRole } from "@/hooks/useHighestRole";
import { profileTabConfig } from "@/pages/Profile/nav.config";
import { ArrowLeftIcon } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router";

export function ProfileLayout() {
  const { pathname, hash } = useLocation();
  const currentPath = pathname + hash;
  const navigate = useNavigate();
  const { user } = useAuth();
  const highestRole = useHighestRole(user?.role ?? []);
  const tabConfig = profileTabConfig[highestRole];

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button onClick={() => navigate(-1)} className="bg-transparent p-0">
        <ArrowLeftIcon size={20} />
        <Text>Voltar</Text>
      </Button>

      <nav className="p-2 border border-gray-300 rounded-lg">
        <ul className="flex items-center gap-4">
          {tabConfig.map((item) => (
            <li key={item.name}>
              <Button
                onClick={() =>
                  navigate(item.href ?? urls.profile, {
                    replace: true,
                  })
                }
                variant={
                  item.href === currentPath
                    ? "secondary-ghost"
                    : "dark-bordered"
                }
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                {item.icon}
                <span>{item.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </main>
  );
}
