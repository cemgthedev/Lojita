import {
  Badge,
  buttonVariants,
  Image,
  ImageContent,
  ImageFallback,
  Label,
  Separator,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { useAuth } from "@/hooks/useAuth";
import { useHighestRole } from "@/hooks/useHighestRole";
import { ROLE, ROLE_LABEL } from "@/types/Auth";
import { Link } from "react-router";

export function ProfilePage() {
  const { user } = useAuth();
  const highestRole = useHighestRole(user?.role ?? []);

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-4">
      <section className="w-full flex justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <Image className="min-h-40 min-w-40">
            <ImageContent src={user.avatarUrl ?? undefined} alt="logo" />
            <ImageFallback variant="primary">AU</ImageFallback>
          </Image>
          <div className="space-y-2">
            <div>
              <Label>{user.name || "Usuário"}</Label>
              {user.document && <Text>{user.document}</Text>}
              <Text>{user.email}</Text>
              {user.phone && <Text>{user.phone}</Text>}
            </div>
            <Badge variant={"primary-ghost"}>{ROLE_LABEL[user.role[0]]}</Badge>
          </div>
        </div>

        <Link
          to={`${urls.profile}${urls.update}`}
          className={buttonVariants({ variant: "secondary-bordered" })}
        >
          Atualizar
        </Link>
      </section>
      <Separator variant={"secondary"} />
      {/**
       * SELLER session contents
       */}
      {highestRole === ROLE.SELLER && (
        <div className="space-y-2">
          <div>
            <Label>Minha Lojita</Label>
            <Text>
              Mantenha os dados da sua loja atualizados e gerencie seus
              produtos.
            </Text>
          </div>
          <Link
            to={urls.store_dashboard}
            className={buttonVariants({ variant: "secondary" })}
          >
            Ir para minha loja
          </Link>
        </div>
      )}

      {/**
       * CUSTOMER session contents
       */}
      {highestRole === ROLE.CUSTOMER && (
        <div className="space-y-2">
          <div>
            <Label>Vender na Lojita</Label>
            <Text>
              Torne-se vendedor e comece a anunciar seus produtos gratuitamente.
            </Text>
          </div>
          <Link
            to={urls.seller_register}
            className={buttonVariants({ variant: "secondary" })}
          >
            Tornar-se vendedor
          </Link>
        </div>
      )}
    </div>
  );
}
