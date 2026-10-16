import { useDeleteAddressMutation } from "@/api/resources/addresses/mutations";
import { useAddressesQuery } from "@/api/resources/addresses/queries";
import type { Address } from "@/api/resources/addresses/validations/address.schema";
import {
  TYPE,
  TYPE_LABEL,
} from "@/api/resources/addresses/validations/type.schema";
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
import { useRequiredAuth } from "@/providers/AuthProvider";
import { cn } from "@/utils/cn";
import { HomeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function AddressesPage() {
  const { user } = useRequiredAuth();
  const addressesQuery = useAddressesQuery({ userId: user.id });
  const deleteAddressMutation = useDeleteAddressMutation();
  const addresses = addressesQuery.data ?? [];
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  async function handleDelete() {
    if (!addressToDelete) return;
    try {
      await deleteAddressMutation.mutateAsync(addressToDelete.id);
      toast("Endereço excluído com sucesso.", { variant: "success" });
      setAddressToDelete(null);
    } catch {
      toast("Não foi possível excluir o endereço.", { variant: "danger" });
    }
  }

  return (
    <section className="w-full space-y-4">
      <header className="flex flex-wrap justify-between gap-3">
        <div className="space-y-1">
          <Label>Meus endereços</Label>
          <Text>Gerencie os endereços vinculados à sua conta.</Text>
        </div>
        <Link
          to={`${urls.profile}${urls.addresses}${urls.create}`}
          className={buttonVariants({ variant: "success" })}
        >
          Adicionar endereço
        </Link>
      </header>

      <Separator variant="secondary" orientation="horizontal" />

      <Dialog
        open={addressToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setAddressToDelete(null);
        }}
      >
        <DialogContent aria-labelledby="delete-address-title">
          <DialogHeader>
            <Label id="delete-address-title">Excluir endereço</Label>
            <Text>
              Tem certeza que deseja excluir o endereço{" "}
              <strong>{addressToDelete?.name}</strong> ? Esta ação não pode ser
              desfeita.
            </Text>
          </DialogHeader>
          <DialogFooter className="bg-transparent">
            <DialogClose asChild>
              <Button
                variant="danger-bordered"
                disabled={deleteAddressMutation.isPending}
                className="w-full max-w-30"
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="danger"
              disabled={deleteAddressMutation.isPending}
              onClick={() => void handleDelete()}
              className="w-full max-w-30"
            >
              {deleteAddressMutation.isPending ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {addressesQuery.isPending && (
        <Text aria-live="polite">Carregando endereços...</Text>
      )}

      {addressesQuery.isError && (
        <Text role="status" className="animate-pulse-once">
          Não foi possível carregar os endereços. Exibindo dados de exemplo.
        </Text>
      )}

      {!addressesQuery.isPending && addresses.length === 0 && (
        <Card variant="secondary-bordered" size="md" rounded="lg">
          <CardContent className="items-center gap-3 text-center">
            <Text>Você ainda não cadastrou nenhum método de pagamento.</Text>
          </CardContent>
        </Card>
      )}

      {!addressesQuery.isPending && addresses.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {addresses.map((address) => (
            <li key={address.id}>
              <Card
                size="md"
                rounded="lg"
                className="border border-secondary-800 justify-between gap-4 h-full"
              >
                <CardContent className="min-w-0 flex-row items-center gap-4 p-0">
                  <HomeIcon aria-hidden="true" className="shrink-0" size={24} />
                  <div className="w-full space-y-1">
                    <Text className="font-semibold">{address.name}</Text>
                    <Text>
                      {address.street}, {address.number} - {address.city}/
                      {address.state}
                    </Text>

                    {address.type && (
                      <Badge
                        size="sm"
                        rounded="full"
                        variant={
                          address.type === TYPE.OTHER
                            ? "default"
                            : "success-ghost"
                        }
                        className={cn("min-w-28")}
                      >
                        {TYPE_LABEL[address.type]}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    to={`${urls.profile}${urls.addresses}/${encodeURIComponent(address.id)}${urls.update}`}
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
                    aria-label={`Excluir endereço ${address.name}`}
                    disabled={deleteAddressMutation.isPending}
                    onClick={() => setAddressToDelete(address)}
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
