import {
  useCreatePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
} from "@/api/resources/payment-methods/mutations";
import { createPaymentMethodSchema } from "@/api/resources/payment-methods/validations/create.schema";
import type { PaymentMethod } from "@/api/resources/payment-methods/validations/payment-method.schema";
import {
  PAYMENT_METHOD_TYPE,
  PAYMENT_METHOD_TYPE_LABEL,
  paymentMethodTypeSchema,
} from "@/api/resources/payment-methods/validations/type.schema";
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
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

type PaymentMethodFormValues = Omit<
  PaymentMethod,
  "id" | "createdAt" | "updatedAt"
>;

const emptyValues = (userId: string): PaymentMethodFormValues => ({
  userId,
  token: "",
  type: PAYMENT_METHOD_TYPE.OTHER,
  brand: "",
  last4: "",
  holderName: "",
  expirationMonth: 1,
  expirationYear: new Date().getFullYear(),
});

function valuesFromPaymentMethod(
  paymentMethod: PaymentMethod | undefined,
  userId: string,
): PaymentMethodFormValues {
  if (!paymentMethod) return emptyValues(userId);

  return {
    userId: paymentMethod.userId,
    token: paymentMethod.token,
    type: paymentMethod.type,
    brand: paymentMethod.brand,
    last4: paymentMethod.last4,
    holderName: paymentMethod.holderName,
    expirationMonth: paymentMethod.expirationMonth,
    expirationYear: paymentMethod.expirationYear,
  };
}

export function FormPaymentMethod({
  paymentMethod,
}: {
  paymentMethod?: PaymentMethod;
}) {
  const { user } = useRequiredAuth();
  const navigate = useNavigate();
  const createMutation = useCreatePaymentMethodMutation();
  const updateMutation = useUpdatePaymentMethodMutation();
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const [values, setValues] = useState<PaymentMethodFormValues>(() =>
    valuesFromPaymentMethod(paymentMethod, user.id),
  );

  function handleChange(
    field: "token" | "brand" | "last4" | "holderName",
    value: string,
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleExpirationChange(
    field: "expirationMonth" | "expirationYear",
    value: string,
  ) {
    setValues((current) => ({ ...current, [field]: Number(value) }));
  }

  function handleTypeChange(value: string) {
    const result = paymentMethodTypeSchema.safeParse(value);
    if (!result.success) {
      toast("Tipo de método de pagamento inválido.", { variant: "danger" });
      return;
    }

    setValues((current) => ({ ...current, type: result.data }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = createPaymentMethodSchema.safeParse({
      ...values,
      userId: user.id,
    });

    if (!result.success) {
      toast("Verifique os dados informados.", { variant: "danger" });
      return;
    }

    try {
      if (paymentMethod) {
        await updateMutation.mutateAsync({
          ...result.data,
          id: paymentMethod.id,
        });
        toast("Método de pagamento atualizado.", { variant: "success" });
      } else {
        await createMutation.mutateAsync(result.data);
        toast("Método de pagamento cadastrado.", { variant: "success" });
      }
      navigate(`${urls.profile}${urls.payments}`);
    } catch {
      toast("Não foi possível salvar o método de pagamento.", {
        variant: "danger",
      });
    }
  }

  return (
    <form
      className="w-full max-w-2xl space-y-4 rounded-lg border border-secondary-600 p-4"
      onSubmit={handleSubmit}
    >
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="payment-holder-name">Nome do titular</FieldLabel>
          <Input
            id="payment-holder-name"
            name="holderName"
            autoComplete="cc-name"
            placeholder="Digite o nome do titular"
            value={values.holderName}
            onChange={(event) => handleChange("holderName", event.target.value)}
            required
            disabled={isSaving}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="payment-type">Tipo</FieldLabel>
          <Select
            value={values.type}
            onValueChange={handleTypeChange}
            disabled={isSaving}
          >
            <SelectTrigger id="payment-type" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PAYMENT_METHOD_TYPE).map((type) => (
                <SelectItem key={type} value={type}>
                  {PAYMENT_METHOD_TYPE_LABEL[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="payment-last4">Número do cartão</FieldLabel>
          <Input
            id="payment-last4"
            name="last4"
            inputMode="numeric"
            autoComplete="off"
            maxLength={15}
            placeholder="0000 0000 0000 0000"
            value={values.last4}
            onChange={(event) => handleChange("last4", event.target.value)}
            required
            disabled={isSaving}
          />
          <Text size="sm">
            Apenas os 4 últimos dígitos serão salvos, enquanto os dados do
            cartão são processados com segurança pelo Stripe por meio de um
            token.
          </Text>
        </Field>

        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="payment-expiration-month">
              Mês de validade
            </FieldLabel>
            <Input
              id="payment-expiration-month"
              name="expirationMonth"
              type="number"
              min={1}
              max={12}
              value={values.expirationMonth}
              onChange={(event) =>
                handleExpirationChange("expirationMonth", event.target.value)
              }
              required
              disabled={isSaving}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="payment-expiration-year">
              Ano de validade
            </FieldLabel>
            <Input
              id="payment-expiration-year"
              name="expirationYear"
              type="number"
              min={new Date().getFullYear()}
              value={values.expirationYear}
              onChange={(event) =>
                handleExpirationChange("expirationYear", event.target.value)
              }
              required
              disabled={isSaving}
            />
          </Field>
        </FieldGroup>
      </FieldGroup>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="danger-bordered"
          onClick={() => navigate(`${urls.profile}${urls.payments}`)}
          disabled={isSaving}
          className="w-full max-w-50"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant={paymentMethod ? "secondary" : "success"}
          disabled={isSaving}
          className="w-full max-w-50"
        >
          {isSaving
            ? "Salvando..."
            : paymentMethod
              ? "Salvar alterações"
              : "Cadastrar cartão"}
        </Button>
      </div>
    </form>
  );
}
