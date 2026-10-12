import { usePaymentMethodQuery } from "@/api/resources/payment-methods/queries";
import { Label, Separator, Text } from "@/components/ui";
import { FormPaymentMethod } from "@/pages/Profile/Payments/form/FormPaymentMethod";
import { useParams } from "react-router";

export function UpdatePaymentMethodPage() {
  const { paymentMethodId } = useParams();
  const paymentMethodQuery = usePaymentMethodQuery(paymentMethodId ?? "");

  if (paymentMethodQuery.isPending) {
    return <Text aria-live="polite">Carregando método de pagamento...</Text>;
  }

  if (paymentMethodQuery.isError) {
    return (
      <Text role="alert">Não foi possível carregar o método de pagamento.</Text>
    );
  }

  return (
    <section className="w-full space-y-4">
      <header className="space-y-1">
        <Label>Atualizar cartão</Label>
        <Text>Atualize os dados do cartão.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />
      <FormPaymentMethod
        key={paymentMethodQuery.data.id}
        paymentMethod={paymentMethodQuery.data}
      />
    </section>
  );
}
