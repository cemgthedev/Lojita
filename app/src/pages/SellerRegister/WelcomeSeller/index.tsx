import {
  buttonVariants,
  Image,
  ImageContent,
  Label,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { Link, Navigate, useParams } from "react-router";

export function WelcomeSellerPage() {
  const { storeId } = useParams();

  if (!storeId) {
    return <Navigate to={urls.seller_register} replace />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 md:flex-row">
      <Image className="aspect-square w-full h-96 max-w-sm bg-transparent border-none">
        <ImageContent
          src="/welcome-seller.svg"
          alt="Ilustração de boas-vindas para vendedor"
          width={364}
          height={364}
        />
      </Image>

      <section className="flex flex-col gap-4">
        <Label>Tudo pronto</Label>
        <div className="flex flex-col gap-px">
          <Label size={"sm"}>Você agora é um vendedor</Label>
          <Text>Comece agora a anunciar e vender na Lojita.</Text>
        </div>
        <Link
          to={`${urls.store_dashboard}/details/${encodeURIComponent(storeId)}`}
          className={buttonVariants({ variant: "secondary" })}
        >
          Ir para minha loja
        </Link>
      </section>
    </main>
  );
}
