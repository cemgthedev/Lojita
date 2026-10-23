import type { Chat } from "@/api/resources/chats/validations/chat.schema";
import type { ChatParticipant } from "@/api/resources/chats/validations/chat-participant.schema";
import type { ChatMessage } from "@/api/resources/chats/validations/message.schema";

const createdAt = "2026-01-01T00:00:00.000Z";

export const mockChats: Chat[] = [
  {
    id: "mock-chat-1",
    type: "support",
    createdAt,
    updatedAt: createdAt,
    closedAt: null,
  },
];

export const mockChatParticipants: ChatParticipant[] = [
  {
    id: "mock-chat-participant-customer-1",
    chatId: "mock-chat-1",
    userId: "mock-customer-1",
    role: "customer",
    createdAt,
  },
  {
    id: "mock-chat-participant-support-1",
    chatId: "mock-chat-1",
    userId: "mock-support-1",
    role: "support",
    createdAt,
  },
];

export const mockMessages: ChatMessage[] = [
  {
    id: "mock-message-1",
    chatId: "mock-chat-1",
    senderId: "mock-customer-1",
    content: "Olá, preciso de ajuda com meu pedido.",
    createdAt,
    updatedAt: null,
  },
  {
    id: "mock-message-2",
    chatId: "mock-chat-1",
    senderId: "mock-support-1",
    content: "Olá! Como posso ajudar?",
    createdAt,
    updatedAt: null,
  },
];
