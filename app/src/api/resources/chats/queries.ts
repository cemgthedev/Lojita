import {
  chatParticipantsKeys,
  chatsKeys,
  messagesKeys,
} from "@/api/resources/chats/keys";
import {
  mockChatParticipants,
  mockChats,
  mockMessages,
} from "@/api/resources/chats/chats.mock";
import {
  chatParticipantsService,
  chatsService,
  messagesService,
} from "@/api/resources/chats/services";
import type { ChatParticipantQuery } from "@/api/resources/chats/validations/chat-participant-query.schema";
import type { ChatQuery } from "@/api/resources/chats/validations/chat-query.schema";
import type { MessageQuery } from "@/api/resources/chats/validations/message-query.schema";
import {
  filterMockData,
  withMockArrayFallback,
  withMockDetailFallback,
} from "@/api/resources/query-fallback";
import { useQuery } from "@tanstack/react-query";

export function useChatsQuery(query?: ChatQuery, enabled = true) {
  const result = useQuery({
    queryKey: chatsKeys.list(query),
    queryFn: () => chatsService.list(query),
    enabled,
  });
  return withMockArrayFallback(result, filterMockData(mockChats, query));
}

export function useChatQuery(id: string) {
  const result = useQuery({
    queryKey: chatsKeys.detail(id),
    queryFn: () => chatsService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockChats.find((chat) => chat.id === id),
  );
}

export function useChatParticipantsQuery(
  query?: ChatParticipantQuery,
  enabled = true,
) {
  const result = useQuery({
    queryKey: chatParticipantsKeys.list(query),
    queryFn: () => chatParticipantsService.list(query),
    enabled,
  });
  return withMockArrayFallback(
    result,
    filterMockData(mockChatParticipants, query),
  );
}

export function useChatParticipantQuery(id: string) {
  const result = useQuery({
    queryKey: chatParticipantsKeys.detail(id),
    queryFn: () => chatParticipantsService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockChatParticipants.find((participant) => participant.id === id),
  );
}

export function useMessagesQuery(query?: MessageQuery, enabled = true) {
  const result = useQuery({
    queryKey: messagesKeys.list(query),
    queryFn: () => messagesService.list(query),
    enabled,
  });
  return withMockArrayFallback(result, filterMockData(mockMessages, query));
}

export function useMessageQuery(id: string) {
  const result = useQuery({
    queryKey: messagesKeys.detail(id),
    queryFn: () => messagesService.findById(id),
    enabled: id.length > 0,
  });
  return withMockDetailFallback(
    result,
    mockMessages.find((message) => message.id === id),
  );
}
