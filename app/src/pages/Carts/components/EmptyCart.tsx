import { buttonVariants, Label, Text } from "@/components/ui";
import { urls } from "@/constants/urls";
import { ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router";

export function EmptyCart() {
  return (
    <section className="flex flex-col items-center gap-4 py-12 text-center">
      <div className="bg-gray-100 rounded-full border border-zinc-950 p-8">
        <ShoppingCartIcon aria-hidden="true" size={112} strokeWidth={0.5} />
      </div>
      <div className="space-y-1">
        <Label>Seu carrinho está vazio</Label>
        <Text>Busque produtos de sua preferência e adicione no carrinho.</Text>
      </div>
      <Link
        to={`${urls.customer_dashboard}${urls.products}`}
        className={buttonVariants({ variant: "secondary", rounded: "full" })}
      >
        Buscar produtos
      </Link>
    </section>
  );
}
