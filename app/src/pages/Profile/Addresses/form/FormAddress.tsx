import {
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from "@/api/resources/addresses/mutations";
import type { Address } from "@/api/resources/addresses/validations/address.schema";
import type { CreateAddress } from "@/api/resources/addresses/validations/create.schema";
import { createAddressSchema } from "@/api/resources/addresses/validations/create.schema";
import {
  TYPE,
  TYPE_LABEL,
  type Type,
} from "@/api/resources/addresses/validations/type.schema";
import {
  Button,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

type AddressFormValues = Omit<CreateAddress, "userId">;

const emptyValues: AddressFormValues = {
  name: "",
  cep: "",
  street: "",
  number: "",
  city: "",
  state: "",
  complement: "",
  neighborhood: "",
  type: TYPE.DEFAULT,
};

function getAddressValues(
  address?: Address,
  defaultType: Type = TYPE.DEFAULT,
): AddressFormValues {
  if (!address) {
    return { ...emptyValues, type: defaultType };
  }

  return {
    name: address.name,
    cep: address.cep,
    street: address.street,
    number: address.number,
    city: address.city,
    state: address.state,
    complement: address.complement,
    neighborhood: address.neighborhood,
    type: address.type,
  };
}

type FormAddressProps = {
  address?: Address;
  addressType?: Type;
  onBack?: () => void;
  onSuccess?: () => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  cancelLabel?: string;
  submitLabel?: string;
};

export function FormAddress({
  address,
  addressType = TYPE.DEFAULT,
  onBack,
  onSuccess,
  onError,
  cancelLabel = "Cancelar",
  submitLabel,
}: FormAddressProps) {
  const { user } = useRequiredAuth();
  const navigate = useNavigate();
  const createMutation = useCreateAddressMutation();
  const updateMutation = useUpdateAddressMutation();
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const [values, setValues] = useState<AddressFormValues>(() =>
    getAddressValues(address, addressType),
  );

  function handleChange(field: keyof AddressFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = createAddressSchema.safeParse({
      ...values,
      userId: user.id,
    });

    if (!result.success) {
      toast("Verifique os dados informados.", { variant: "danger" });
      return;
    }

    try {
      if (address) {
        await updateMutation.mutateAsync({
          ...result.data,
          id: address.id,
        });
        toast("Endereço atualizado com sucesso.", { variant: "success" });
      } else {
        await createMutation.mutateAsync(result.data);
        toast("Endereço cadastrado com sucesso.", { variant: "success" });
      }
      if (onSuccess) {
        await onSuccess();
      } else {
        navigate(`${urls.profile}${urls.addresses}`);
      }
    } catch (error) {
      if (onError) {
        await onError(error);
      } else {
        toast(
          address
            ? "Não foi possível atualizar o endereço."
            : "Não foi possível cadastrar o endereço.",
          { variant: "danger" },
        );
      }
    }
  }

  return (
    <form
      className="w-full max-w-2xl space-y-4 rounded-lg border border-secondary-600 p-4"
      onSubmit={handleSubmit}
    >
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="address-name">Nome do endereço</FieldLabel>
          <Input
            id="address-name"
            name="name"
            autoComplete="organization"
            placeholder="Digite o nome do endereço"
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            required
            disabled={isSaving}
          />
        </Field>

        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="address-cep">CEP</FieldLabel>
            <Input
              id="address-cep"
              name="cep"
              autoComplete="postal-code"
              placeholder="00000-000"
              value={values.cep}
              onChange={(event) => handleChange("cep", event.target.value)}
              required
              disabled={isSaving}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="address-type">Tipo</FieldLabel>
            <Select
              value={values.type}
              onValueChange={(value) => handleChange("type", value)}
              disabled={isSaving}
            >
              <SelectTrigger id="address-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(TYPE).map((type) => (
                  <SelectItem key={type} value={type}>
                    {TYPE_LABEL[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>

        <Field>
          <FieldLabel htmlFor="address-street">Rua</FieldLabel>
          <Input
            id="address-street"
            name="street"
            autoComplete="street-address"
            placeholder="Digite a rua"
            value={values.street}
            onChange={(event) => handleChange("street", event.target.value)}
            required
            disabled={isSaving}
          />
        </Field>

        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="address-number">Número</FieldLabel>
            <Input
              id="address-number"
              name="number"
              value={values.number}
              placeholder="123"
              onChange={(event) => handleChange("number", event.target.value)}
              required
              disabled={isSaving}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="address-neighborhood">Bairro</FieldLabel>
            <Input
              id="address-neighborhood"
              name="neighborhood"
              autoComplete="address-level3"
              placeholder="Digite o bairro"
              value={values.neighborhood}
              onChange={(event) =>
                handleChange("neighborhood", event.target.value)
              }
              required
              disabled={isSaving}
            />
          </Field>
        </FieldGroup>

        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="address-city">Cidade</FieldLabel>
            <Input
              id="address-city"
              name="city"
              autoComplete="address-level2"
              placeholder="Digite a cidade"
              value={values.city}
              onChange={(event) => handleChange("city", event.target.value)}
              required
              disabled={isSaving}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="address-state">Estado</FieldLabel>
            <Input
              id="address-state"
              name="state"
              autoComplete="address-level1"
              placeholder="Digite o estado"
              value={values.state}
              onChange={(event) => handleChange("state", event.target.value)}
              required
              disabled={isSaving}
            />
          </Field>
        </FieldGroup>

        <Field>
          <FieldLabel htmlFor="address-complement">
            Complemento (opcional)
          </FieldLabel>
          <Textarea
            id="address-complement"
            name="complement"
            autoComplete="off"
            placeholder="Próximo à praça..."
            value={values.complement}
            onChange={(event) => handleChange("complement", event.target.value)}
            disabled={isSaving}
          />
        </Field>
      </FieldGroup>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="danger-bordered"
          onClick={
            onBack ?? (() => navigate(`${urls.profile}${urls.addresses}`))
          }
          disabled={isSaving}
          className="w-full max-w-50"
        >
          {cancelLabel}
        </Button>
        <Button
          type="submit"
          variant={address ? "secondary" : "success"}
          disabled={isSaving}
          className="w-full max-w-50"
        >
          {isSaving
            ? "Salvando..."
            : (submitLabel ??
              (address ? "Salvar alterações" : "Cadastrar endereço"))}
        </Button>
      </div>
    </form>
  );
}
