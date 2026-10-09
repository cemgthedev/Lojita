import { usersKeys } from "@/api/resources/users/keys";
import { usersService } from "@/api/resources/users/services";
import type { CreateUser } from "@/api/resources/users/validations/create.schema";
import type { UpdateUser } from "@/api/resources/users/validations/update.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createdUser: CreateUser) => usersService.create(createdUser),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() }),
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedUser: UpdateUser) => usersService.update(updatedUser),
    onSuccess: (user) => {
      queryClient.setQueryData(usersKeys.detail(user.id), user);
      return queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: usersKeys.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({ queryKey: usersKeys.lists() });
    },
  });
}
