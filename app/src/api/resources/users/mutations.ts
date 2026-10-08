import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "@/api/resources/users/keys";
import {
  usersService,
} from "@/api/resources/users/services";
import type { CreateUser } from "@/api/resources/users/validations/create.schema";
import type { UpdateUser } from "@/api/resources/users/validations/update.schema";

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUser) => usersService.create(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: usersKeys.lists() }),
  });
}

export type UpdateUserVariables = {
  id: string;
  input: UpdateUser;
};

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: UpdateUserVariables) =>
      usersService.update(id, input),
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