import type { ChatParticipantQuery } from "@/api/resources/chats/validations/chat-participant-query.schema";
import type { ChatQuery } from "@/api/resources/chats/validations/chat-query.schema";
import type { MessageQuery } from "@/api/resources/chats/validations/message-query.schema";

export const chatsKeys = {
  all: ["chats"] as const,
  lists: () => [...chatsKeys.all, "list"] as const,
  list: (query?: ChatQuery) => [...chatsKeys.lists(), query] as const,
  details: () => [...chatsKeys.all, "detail"] as const,
  detail: (id: string) => [...chatsKeys.details(), id] as const,
};

export const chatParticipantsKeys = {
  all: ["chat-participants"] as const,
  lists: () => [...chatParticipantsKeys.all, "list"] as const,
  list: (query?: ChatParticipantQuery) =>
    [...chatParticipantsKeys.lists(), query] as const,
  details: () => [...chatParticipantsKeys.all, "detail"] as const,
  detail: (id: string) => [...chatParticipantsKeys.details(), id] as const,
};

export const messagesKeys = {
  all: ["messages"] as const,
  lists: () => [...messagesKeys.all, "list"] as const,
  list: (query?: MessageQuery) => [...messagesKeys.lists(), query] as const,
  details: () => [...messagesKeys.all, "detail"] as const,
  detail: (id: string) => [...messagesKeys.details(), id] as const,
};
