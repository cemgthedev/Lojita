import type { Store } from "@/api/resources/stores/validations/store.schema";
import {
  buttonVariants,
  Card,
  CardContent,
  Image,
  ImageContent,
  ImageFallback,
  Label,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { Link } from "react-router";

export function CardStore({ store }: { store: Store }) {
  return (
    <Card
      className="h-full transition duration-200 hover:-translate-y-1 hover:shadow-lg"
      rounded="lg"
      size="none"
    >
      <Image
        className="h-48 w-full border-0"
        aspect="video"
        rounded="none"
        aria-label={`Logo da loja ${store.name}`}
      >
        <ImageContent src={store.logoUrl || undefined} alt={store.name} />
        <ImageFallback variant="muted">
          <Text size="sm">{store.name}</Text>
        </ImageFallback>
      </Image>
      <CardContent className="flex-1 gap-2 p-4">
        <div className="space-y-1">
          <Label className="line-clamp-2" size="xs">
            {store.name}
          </Label>
          <Text className="line-clamp-3">
            {store.description || "Conheça os produtos desta loja."}
          </Text>
        </div>
        <Link
          to={`${urls.stores}/${encodeURIComponent(store.id)}`}
          className={buttonVariants({
            variant: "secondary-ghost",
            size: "sm",
            rounded: "full",
            className: "w-full",
          })}
        >
          Visitar loja
        </Link>
      </CardContent>
    </Card>
  );
}
