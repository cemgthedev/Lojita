import {
  chatParticipantsKeys,
  chatsKeys,
  messagesKeys,
} from "@/api/resources/chats/keys";
import {
  chatParticipantsService,
  chatsService,
  messagesService,
} from "@/api/resources/chats/services";
import type { CreateChat } from "@/api/resources/chats/validations/create-chat.schema";
import type { CreateChatParticipant } from "@/api/resources/chats/validations/create-chat-participant.schema";
import type { CreateMessage } from "@/api/resources/chats/validations/create-message.schema";
import type { UpdateChat } from "@/api/resources/chats/validations/update-chat.schema";
import type { UpdateChatParticipant } from "@/api/resources/chats/validations/update-chat-participant.schema";
import type { UpdateMessage } from "@/api/resources/chats/validations/update-message.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateChatMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chat: CreateChat) => chatsService.create(chat),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: chatsKeys.lists() }),
  });
}

export function useUpdateChatMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chat: UpdateChat) => chatsService.update(chat),
    onSuccess: (chat) => {
      queryClient.setQueryData(chatsKeys.detail(chat.id), chat);
      return queryClient.invalidateQueries({ queryKey: chatsKeys.lists() });
    },
  });
}

export function useDeleteChatMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => chatsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: chatsKeys.detail(id), exact: true });
      queryClient.invalidateQueries({ queryKey: chatParticipantsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: messagesKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: chatsKeys.lists() });
    },
  });
}

export function useCreateChatParticipantMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (participant: CreateChatParticipant) =>
      chatParticipantsService.create(participant),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: chatParticipantsKeys.lists(),
      }),
  });
}

export function useUpdateChatParticipantMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (participant: UpdateChatParticipant) =>
      chatParticipantsService.update(participant),
    onSuccess: (participant) => {
      queryClient.setQueryData(
        chatParticipantsKeys.detail(participant.id),
        participant,
      );
      return queryClient.invalidateQueries({
        queryKey: chatParticipantsKeys.lists(),
      });
    },
  });
}

export function useDeleteChatParticipantMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => chatParticipantsService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: chatParticipantsKeys.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({
        queryKey: chatParticipantsKeys.lists(),
      });
    },
  });
}

export function useCreateMessageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message: CreateMessage) => messagesService.create(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatsKeys.lists() });
      return queryClient.invalidateQueries({ queryKey: messagesKeys.lists() });
    },
  });
}

export function useUpdateMessageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message: UpdateMessage) => messagesService.update(message),
    onSuccess: (message) => {
      queryClient.setQueryData(messagesKeys.detail(message.id), message);
      return queryClient.invalidateQueries({ queryKey: messagesKeys.lists() });
    },
  });
}

export function useDeleteMessageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => messagesService.remove(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: messagesKeys.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({ queryKey: messagesKeys.lists() });
    },
  });
}
