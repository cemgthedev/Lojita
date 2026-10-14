import type { Product } from "@/api/resources/products/products/validations/product.schema";
import {
  Button,
  buttonVariants,
  Card,
  CardContent,
  Image,
  ImageContent,
  ImageFallback,
  Label,
  Text,
} from "@/components/ui";
import { HeartIcon } from "lucide-react";
import { Link } from "react-router";

export type CardProductProps = {
  baseUrl: string;
  product: Product;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function CardProduct({ baseUrl, product }: CardProductProps) {
  const productUrl = `${baseUrl.replace(/\/$/, "")}/${encodeURIComponent(product.id)}`;
  const imageUrl = product.defaultVariant?.urlImage;
  const price = product.defaultVariant?.price;

  return (
    <Card
      className="h-full transition duration-200 hover:-translate-y-1 hover:shadow-lg"
      rounded="lg"
      size="none"
    >
      <div className="relative">
        <Image
          className="w-full border-0 h-64"
          aspect="portrait"
          rounded="none"
          aria-label={product.title}
        >
          <ImageContent src={imageUrl ?? undefined} alt={product.title} />
          <ImageFallback variant="muted">
            <Text>{product.title}</Text>
          </ImageFallback>
        </Image>

        <Button className="absolute top-2 right-2 p-1">
          <HeartIcon size={24} />
        </Button>
      </div>

      <CardContent className="flex-1 justify-between gap-3 p-4">
        <div className="space-y-1">
          <Label className="line-clamp-2" size={"xs"}>
            {product.title}
          </Label>
          <Label className="font-semibold" variant={"secondary"} size={"xs"}>
            {price == null
              ? "Preço indisponível"
              : currencyFormatter.format(price)}
          </Label>
        </div>

        <Link
          to={productUrl}
          className={buttonVariants({
            variant: "secondary-ghost",
            size: "sm",
            rounded: "full",
            className: "w-full",
          })}
        >
          Ver detalhes
        </Link>
      </CardContent>
    </Card>
  );
}
