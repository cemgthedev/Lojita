import type { Category } from "@/api/resources/categories/validations/category.schema";
import {
  Card,
  CardContent,
  Image,
  ImageContent,
  ImageFallback,
  Label,
  Text,
  buttonVariants,
} from "@/components/ui";
import { Link } from "react-router";

export type CardCategoryProps = {
  baseUrl: string;
  category: Category;
};

export function CardCategory({ baseUrl, category }: CardCategoryProps) {
  const categoryId = encodeURIComponent(category.id);
  const normalizedBaseUrl = baseUrl.trim();
  const categoryUrl =
    normalizedBaseUrl.endsWith("=") || normalizedBaseUrl.endsWith("&")
      ? `${normalizedBaseUrl}${categoryId}`
      : `${normalizedBaseUrl.replace(/\/+$/, "")}/${categoryId}`;

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
        aria-label={`Imagem da categoria ${category.title}`}
      >
        <ImageContent
          src={category.imageUrl ?? undefined}
          alt={category.title}
        />
        <ImageFallback variant="muted">
          <Text size="sm">Sem imagem</Text>
        </ImageFallback>
      </Image>

      <CardContent className="flex-1 gap-2 p-4">
        <div className="space-y-1">
          <Label className="line-clamp-2" size="xs">
            {category.title}
          </Label>
          <Text className="line-clamp-3">
            {category.description || "Sem descrição disponível."}
          </Text>
        </div>
        <Link
          to={categoryUrl}
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
