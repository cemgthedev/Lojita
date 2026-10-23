import { useCreateMessageMutation } from "@/api/resources/chats/mutations";
import { useChatQuery, useMessagesQuery } from "@/api/resources/chats/queries";
import { useUsersQuery } from "@/api/resources/users/queries";
import {
  Button,
  Heading,
  Label,
  Separator,
  Text,
  Textarea,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { ArrowLeftIcon, SendIcon } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export function ChatDetailsPage() {
  const { chatId = "" } = useParams();
  const navigate = useNavigate();
  const { user } = useRequiredAuth();
  const [content, setContent] = useState("");
  const chatQuery = useChatQuery(chatId);
  const messagesQuery = useMessagesQuery(
    { chatId },
    chatId.length > 0,
  );
  const usersQuery = useUsersQuery();
  const createMessageMutation = useCreateMessageMutation();
  const chatMessages = useMemo(
    () =>
      (messagesQuery.data ?? [])
        .filter((message) => message.chatId === chatId)
        .toSorted(
          (messageA, messageB) =>
            Date.parse(messageA.createdAt) - Date.parse(messageB.createdAt),
        ),
    [chatId, messagesQuery.data],
  );
  const userById = useMemo(
    () => new Map((usersQuery.data ?? []).map((chatUser) => [chatUser.id, chatUser])),
    [usersQuery.data],
  );
  const chat = chatQuery.data;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const messageContent = content.trim();
    if (!messageContent || !chatId || chat?.closedAt) return;

    try {
      await createMessageMutation.mutateAsync({
        chatId,
        content: messageContent,
      });
      setContent("");
    } catch {
      toast("Não foi possível enviar a mensagem.", { variant: "danger" });
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-4xl flex-col gap-5 p-6">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="dark-bordered"
          size="sm"
          aria-label="Voltar para os chamados"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon aria-hidden="true" size={18} />
        </Button>
        <div className="min-w-0">
          <Heading size="sm">Chat de atendimento</Heading>
          <Text size="sm" variant="secondary">
            Conversa {chatId}
          </Text>
        </div>
      </div>
      <Separator orientation="horizontal" variant="secondary" />

      {(chatQuery.isPending || messagesQuery.isPending) && (
        <Text role="status">Carregando conversa...</Text>
      )}
      {(chatQuery.isError || messagesQuery.isError || usersQuery.isError) && (
        <Text role="alert" variant="danger">
          Não foi possível carregar todos os dados da conversa.
        </Text>
      )}

      <section
        aria-label="Mensagens do chat"
        className="flex flex-1 flex-col gap-3 overflow-y-auto rounded-lg border border-secondary-600 p-4"
      >
        {chatMessages.length === 0 ? (
          <Text className="m-auto py-8" variant="secondary">
            Ainda não há mensagens nesta conversa.
          </Text>
        ) : (
          chatMessages.map((message) => {
            const sender = userById.get(message.senderId);
            const isOwnMessage = message.senderId === user.id;
            const date = new Date(message.createdAt);

            return (
              <article
                key={message.id}
                className={`max-w-[85%] space-y-1 rounded-lg p-3 ${
                  isOwnMessage
                    ? "ml-auto bg-primary-100"
                    : "mr-auto bg-secondary-100"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <Label size="xs">
                    {isOwnMessage ? "Você" : sender?.name ?? "Participante"}
                  </Label>
                  <Text size="xs" variant="secondary">
                    {Number.isNaN(date.getTime())
                      ? "Horário indisponível"
                      : dateFormatter.format(date)}
                  </Text>
                </div>
                <Text className="whitespace-pre-wrap">
                  {message.content || "Mensagem sem conteúdo"}
                </Text>
              </article>
            );
          })
        )}
      </section>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <Label htmlFor="chat-message">Nova mensagem</Label>
        <Textarea
          id="chat-message"
          rows={3}
          maxLength={4000}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={!chat || Boolean(chat.closedAt) || createMessageMutation.isPending}
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={
              !chat ||
              Boolean(chat.closedAt) ||
              !content.trim() ||
              createMessageMutation.isPending
            }
            startContent={<SendIcon aria-hidden="true" size={16} />}
          >
            {createMessageMutation.isPending ? "Enviando..." : "Enviar mensagem"}
          </Button>
        </div>
        {chat?.closedAt && (
          <Text role="status" variant="secondary">
            Este chat está encerrado e não aceita novas mensagens.
          </Text>
        )}
      </form>
    </main>
  );
}
