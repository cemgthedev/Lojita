import { useDeletePaymentMethodMutation } from "@/api/resources/payment-methods/mutations";
import { usePaymentMethodsQuery } from "@/api/resources/payment-methods/queries";
import type { PaymentMethod } from "@/api/resources/payment-methods/validations/payment-method.schema";
import {
  PAYMENT_METHOD_TYPE,
  PAYMENT_METHOD_TYPE_LABEL,
} from "@/api/resources/payment-methods/validations/type.schema";
import {
  Badge,
  Button,
  buttonVariants,
  Card,
  CardContent,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Label,
  Separator,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { mockPaymentMethods } from "@/api/resources/payment-methods/payment-methods.mock";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { cn } from "@/utils/cn";
import { CreditCardIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function PaymentMethodsPage() {
  const { user } = useRequiredAuth();
  const paymentMethodsQuery = usePaymentMethodsQuery({ userId: user.id });
  const deleteMutation = useDeletePaymentMethodMutation();
  const shouldUseMocks =
    !paymentMethodsQuery.isPending &&
    (paymentMethodsQuery.isError || paymentMethodsQuery.data?.length === 0);
  const paymentMethods = shouldUseMocks
    ? mockPaymentMethods.filter(
        (paymentMethod) => paymentMethod.userId === user.id,
      )
    : (paymentMethodsQuery.data ?? []);
  const [paymentMethodToDelete, setPaymentMethodToDelete] =
    useState<PaymentMethod | null>(null);

  async function handleDelete() {
    if (!paymentMethodToDelete) return;

    try {
      await deleteMutation.mutateAsync(paymentMethodToDelete.id);
      toast("Cartão excluído.", { variant: "success" });
      setPaymentMethodToDelete(null);
    } catch {
      toast("Não foi possível excluir o cartão.", {
        variant: "danger",
      });
    }
  }

  return (
    <section className="w-full space-y-4">
      <header className="flex flex-wrap justify-between gap-3">
        <div className="space-y-1">
          <Label>Meus métodos de pagamento</Label>
          <Text>Gerencie os cartões vinculados à sua conta.</Text>
        </div>
        <Link
          to={`${urls.profile}${urls.payments}${urls.create}`}
          className={buttonVariants({ variant: "success" })}
        >
          Adicionar método
        </Link>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      <Dialog
        open={paymentMethodToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPaymentMethodToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <Label>Excluir cartão</Label>
            <Text>
              Deseja excluir o cartão{" "}
              <strong>
                {paymentMethodToDelete?.brand} ••••{" "}
                {paymentMethodToDelete?.last4}
              </strong>{" "}
              ? Esta ação não pode ser desfeita.
            </Text>
          </DialogHeader>
          <DialogFooter className="bg-transparent">
            <DialogClose asChild>
              <Button
                variant="danger-bordered"
                disabled={deleteMutation.isPending}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="danger"
              disabled={deleteMutation.isPending}
              onClick={() => void handleDelete()}
            >
              {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {paymentMethodsQuery.isPending && (
        <Text aria-live="polite">Carregando métodos de pagamento...</Text>
      )}

      {/**
       * Com userQueryAddress integrado com a api
      *  {paymentMethodsQuery.isError && (
        <Text role="alert">
          Não foi possível carregar os métodos de pagamento. Exibindo dados de
          demonstração.
        </Text>
      )}
      */}

      {!paymentMethodsQuery.isPending && paymentMethods.length === 0 && (
        <Card variant="secondary-bordered" size="md" rounded="lg">
          <CardContent className="items-center gap-3 text-center">
            <Text>Você ainda não cadastrou nenhum método de pagamento.</Text>
          </CardContent>
        </Card>
      )}

      {!paymentMethodsQuery.isPending && paymentMethods.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paymentMethods.map((paymentMethod) => (
            <li key={paymentMethod.id}>
              {/* Stripe: populate card brand and last4 from server-verified PaymentMethod metadata. */}
              <Card
                size="md"
                rounded="lg"
                className="h-full justify-between gap-4 border border-secondary-800"
              >
                <CardContent className="min-w-0 flex-row items-center gap-4 p-0">
                  <CreditCardIcon
                    aria-hidden="true"
                    className="shrink-0"
                    size={24}
                  />
                  <div className="w-full space-y-1">
                    <Text className="font-semibold">
                      {paymentMethod.brand} •••• {paymentMethod.last4}
                    </Text>
                    <Text>{paymentMethod.holderName}</Text>
                    <Text>
                      Validade:{" "}
                      {String(paymentMethod.expirationMonth).padStart(2, "0")}/
                      {paymentMethod.expirationYear}
                    </Text>
                    {paymentMethod.type && (
                      <Badge
                        size="sm"
                        rounded="full"
                        variant={
                          paymentMethod.type === PAYMENT_METHOD_TYPE.OTHER
                            ? "default"
                            : "success-ghost"
                        }
                        className={cn("min-w-28")}
                      >
                        {PAYMENT_METHOD_TYPE_LABEL[paymentMethod.type]}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    to={`${urls.profile}${urls.payments}${urls.update}/${encodeURIComponent(paymentMethod.id)}`}
                    className={buttonVariants({
                      variant: "secondary-bordered",
                      size: "sm",
                      className: "w-full max-w-50",
                    })}
                  >
                    <PencilIcon aria-hidden="true" size={18} />
                    Atualizar
                  </Link>
                  <Button
                    type="button"
                    variant="danger-bordered"
                    size="sm"
                    className="w-full max-w-50"
                    aria-label={`Excluir cartão ${paymentMethod.brand} terminado em ${paymentMethod.last4}`}
                    disabled={deleteMutation.isPending}
                    onClick={() => setPaymentMethodToDelete(paymentMethod)}
                  >
                    <Trash2Icon aria-hidden="true" size={18} />
                    Excluir
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
