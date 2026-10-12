import { Label, Separator, Text } from "@/components/ui";
import { FormPaymentMethod } from "@/pages/Profile/Payments/form/FormPaymentMethod";

export function CreatePaymentMethodPage() {
  return (
    <section className="w-full space-y-4">
      <header className="space-y-1">
        <Label>Novo cartão</Label>
        <Text>Cadastre um cartão para usar nos pagamentos.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />
      <FormPaymentMethod />
    </section>
  );
}
