import { favoritesKeys } from "@/api/resources/favorites/keys";
import { favoritesService } from "@/api/resources/favorites/services";
import type { CreateFavorite } from "@/api/resources/favorites/validations/create.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (favorite: CreateFavorite) => favoritesService.create(favorite),
    onSuccess: (favorite) => {
      queryClient.setQueryData(
        favoritesKeys.detail(favorite.variantId, favorite.userId),
        favorite,
      );
      return queryClient.invalidateQueries({
        queryKey: favoritesKeys.lists(),
      });
    },
  });
}

export function useDeleteFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      variantId,
      userId,
    }: {
      variantId: number;
      userId: string;
    }) => favoritesService.remove(variantId, userId),
    onSuccess: (_data, { variantId, userId }) => {
      queryClient.removeQueries({
        queryKey: favoritesKeys.detail(variantId, userId),
        exact: true,
      });
      return queryClient.invalidateQueries({
        queryKey: favoritesKeys.lists(),
      });
    },
  });
}
