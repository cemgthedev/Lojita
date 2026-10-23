import { http } from "@/api/http";
import { endpoints } from "@/api/resources/endpoints";
import { assertNoMockIds } from "@/api/resources/query-fallback";
import type { CreateChat } from "@/api/resources/chats/validations/create-chat.schema";
import type { CreateChatParticipant } from "@/api/resources/chats/validations/create-chat-participant.schema";
import type { CreateMessage } from "@/api/resources/chats/validations/create-message.schema";
import {
  chatSchema,
  type Chat,
} from "@/api/resources/chats/validations/chat.schema";
import {
  chatParticipantSchema,
  type ChatParticipant,
} from "@/api/resources/chats/validations/chat-participant.schema";
import {
  chatParticipantQuerySchema,
  type ChatParticipantQuery,
} from "@/api/resources/chats/validations/chat-participant-query.schema";
import {
  chatQuerySchema,
  type ChatQuery,
} from "@/api/resources/chats/validations/chat-query.schema";
import {
  messageSchema,
  type ChatMessage,
} from "@/api/resources/chats/validations/message.schema";
import {
  messageQuerySchema,
  type MessageQuery,
} from "@/api/resources/chats/validations/message-query.schema";
import type { UpdateChat } from "@/api/resources/chats/validations/update-chat.schema";
import type { UpdateChatParticipant } from "@/api/resources/chats/validations/update-chat-participant.schema";
import type { UpdateMessage } from "@/api/resources/chats/validations/update-message.schema";

function queryString(query: object) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.set(key, String(value));
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

function endpoint(base: string, id: string) {
  return `${base}/${encodeURIComponent(id)}`;
}

export const chatsService = {
  async list(query?: ChatQuery): Promise<Chat[]> {
    const parsedQuery = chatQuerySchema.parse(query ?? {});
    const response = await http.get<unknown>(
      `${endpoints.chats}${queryString(parsedQuery)}`,
    );
    return chatSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<Chat> {
    const response = await http.get<unknown>(endpoint(endpoints.chats, id));
    return chatSchema.parse(response.data);
  },

  async create(chat: CreateChat): Promise<Chat> {
    const response = await http.post<unknown>(endpoints.chats, chat);
    return chatSchema.parse(response.data);
  },

  async update({ id, ...chat }: UpdateChat): Promise<Chat> {
    assertNoMockIds("chat", id);
    const response = await http.put<unknown>(
      endpoint(endpoints.chats, id),
      chat,
    );
    return chatSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    assertNoMockIds("chat", id);
    await http.delete<void>(endpoint(endpoints.chats, id));
  },
};

export const chatParticipantsService = {
  async list(query?: ChatParticipantQuery): Promise<ChatParticipant[]> {
    const parsedQuery = chatParticipantQuerySchema.parse(query ?? {});
    const response = await http.get<unknown>(
      `${endpoints.chatParticipants}${queryString(parsedQuery)}`,
    );
    return chatParticipantSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<ChatParticipant> {
    const response = await http.get<unknown>(
      endpoint(endpoints.chatParticipants, id),
    );
    return chatParticipantSchema.parse(response.data);
  },

  async create(participant: CreateChatParticipant): Promise<ChatParticipant> {
    assertNoMockIds(
      "participante do chat",
      participant.chatId,
      participant.userId,
    );
    const response = await http.post<unknown>(
      endpoints.chatParticipants,
      participant,
    );
    return chatParticipantSchema.parse(response.data);
  },

  async update({
    id,
    ...participant
  }: UpdateChatParticipant): Promise<ChatParticipant> {
    assertNoMockIds(
      "participante do chat",
      id,
      participant.chatId,
      participant.userId,
    );
    const response = await http.put<unknown>(
      endpoint(endpoints.chatParticipants, id),
      participant,
    );
    return chatParticipantSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    assertNoMockIds("participante do chat", id);
    await http.delete<void>(endpoint(endpoints.chatParticipants, id));
  },
};

export const messagesService = {
  async list(query?: MessageQuery): Promise<ChatMessage[]> {
    const parsedQuery = messageQuerySchema.parse(query ?? {});
    const response = await http.get<unknown>(
      `${endpoints.messages}${queryString(parsedQuery)}`,
    );
    return messageSchema.array().parse(response.data);
  },

  async findById(id: string): Promise<ChatMessage> {
    const response = await http.get<unknown>(endpoint(endpoints.messages, id));
    return messageSchema.parse(response.data);
  },

  async create(message: CreateMessage): Promise<ChatMessage> {
    assertNoMockIds("mensagem", message.chatId);
    const response = await http.post<unknown>(endpoints.messages, message);
    return messageSchema.parse(response.data);
  },

  async update({ id, ...message }: UpdateMessage): Promise<ChatMessage> {
    assertNoMockIds("mensagem", id, message.chatId);
    const response = await http.put<unknown>(
      endpoint(endpoints.messages, id),
      message,
    );
    return messageSchema.parse(response.data);
  },

  async remove(id: string): Promise<void> {
    assertNoMockIds("mensagem", id);
    await http.delete<void>(endpoint(endpoints.messages, id));
  },
};
