import { Label, Separator, Text } from "@/components/ui";
import { FormAddress } from "@/pages/Profile/Addresses/form/FormAddress";

export function CreateAddressesPage() {
  return (
    <section className="w-full space-y-4">
      <header className="space-y-1">
        <Label>Novo endereço</Label>
        <Text>Preencha os dados para cadastrar um endereço.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />
      <FormAddress />
    </section>
  );
}
