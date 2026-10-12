import { useAddressQuery } from "@/api/resources/addresses/queries";
import { Label, Separator, Text } from "@/components/ui";
import { FormAddress } from "@/pages/Profile/Addresses/form/FormAddress";
import { useParams } from "react-router";

export function UpdateAddressesPage() {
  const { addressId } = useParams();
  const addressQuery = useAddressQuery(addressId ?? "");

  if (addressQuery.isPending) {
    return <Text aria-live="polite">Carregando endereço...</Text>;
  }

  if (addressQuery.isError) {
    return <Text role="alert">Não foi possível carregar o endereço.</Text>;
  }

  return (
    <section className="w-full space-y-4">
      <header className="space-y-1">
        <Label>Editar endereço</Label>
        <Text>Atualize os dados do endereço.</Text>
      </header>

      <Separator variant="secondary" orientation="horizontal" />
      <FormAddress key={addressQuery.data.id} address={addressQuery.data} />
    </section>
  );
}
