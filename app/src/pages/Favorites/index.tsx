import { Heading, Text } from "@/components/ui";
import { ListFavorites } from "@/pages/Favorites/components/ListFavorites";

export function FavoritesPage() {
  return (
    <main className="space-y-6 p-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <Heading id="favorites-heading" size="sm">
            Meus favoritos
          </Heading>
          <Text>Encontre os produtos que você salvou.</Text>
        </div>
      </header>
      <ListFavorites />
    </main>
  );
}