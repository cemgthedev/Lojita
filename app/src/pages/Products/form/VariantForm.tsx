import {
  useAttributesQuery,
  useAttributeValuesQuery,
} from "@/api/resources/products/attributes/queries";
import type { AttributeValue } from "@/api/resources/products/attributes/validations/attribute-value.schema";
import {
  ATTRIBUTE_LABEL,
  type Attribute,
} from "@/api/resources/products/attributes/validations/attribute.schema";
import { UploadImages } from "@/components/forms/UploadImages";
import {
  Button,
  Checkbox,
  Field,
  FieldGroup,
  FieldLabel,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useId, useState } from "react";
import type { VariantDetail, VariantFormValues } from "./VariantForm.types";

type VariantFormProps = {
  values: VariantFormValues;
  onChange: (values: VariantFormValues) => void;
  isDefault?: boolean;
  onDefaultChange?: (isDefault: boolean) => void;
  disabled?: boolean;
  idPrefix?: string;
};

function isAttribute(attributes: Attribute[], attributeId: string): boolean {
  return attributes.some((attribute) => attribute.id === attributeId);
}

function getAttributeValueLabel(attributeValue: AttributeValue) {
  return `${attributeValue.title} (${attributeValue.value})`;
}

export function VariantForm({
  values,
  onChange,
  isDefault = false,
  onDefaultChange,
  disabled = false,
  idPrefix,
}: VariantFormProps) {
  const reactId = useId().replaceAll(":", "");
  const prefix = idPrefix ?? `variant-${reactId}`;
  const attributesQuery = useAttributesQuery();
  const attributeValuesQuery = useAttributeValuesQuery();
  const attributes = attributesQuery.data ?? [];
  const attributeValues = attributeValuesQuery.data ?? [];
  const [selectedAttributeId, setSelectedAttributeId] = useState("");
  const [selectedAttributeValueId, setSelectedAttributeValueId] = useState("");
  const availableValues = attributeValues.filter(
    (attributeValue) => attributeValue.attributeId === selectedAttributeId,
  );
  const selectedAttribute = attributes.find(
    (attribute) => attribute.id === selectedAttributeId,
  );

  function updateValue<Key extends keyof VariantFormValues>(
    key: Key,
    value: VariantFormValues[Key],
  ) {
    onChange({ ...values, [key]: value });
  }

  function addDetail() {
    if (
      !selectedAttributeId ||
      !selectedAttributeValueId ||
      !isAttribute(attributes, selectedAttributeId)
    ) {
      toast("Selecione um tipo e um valor para adicionar o detalhe.", {
        variant: "danger",
      });
      return;
    }

    if (
      values.details.some(
        (detail) => detail.attributeId === selectedAttributeId,
      )
    ) {
      toast("Esse atributo já foi adicionado à variante.", {
        variant: "danger",
      });
      return;
    }

    onChange({
      ...values,
      details: [
        ...values.details,
        {
          attributeId: selectedAttributeId,
          attributeValueId: selectedAttributeValueId,
        },
      ],
    });
    setSelectedAttributeId("");
    setSelectedAttributeValueId("");
  }

  function getDetailLabel(detail: VariantDetail) {
    const attribute = attributes.find((item) => item.id === detail.attributeId);
    const attributeValue = attributeValues.find(
      (item) => item.id === detail.attributeValueId,
    );
    return {
      name: attribute?.name ?? "Atributo",
      type: attribute ? ATTRIBUTE_LABEL[attribute.type] : "",
      value: attributeValue
        ? getAttributeValueLabel(attributeValue)
        : "Valor não encontrado",
    };
  }

  return (
    <div className="space-y-5">
      <UploadImages
        inputId={`${prefix}-images`}
        value={values.images}
        onChange={(images) => updateValue("images", images)}
        disabled={disabled}
      />

      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor={`${prefix}-price`}>Preço</FieldLabel>
          <Input
            id={`${prefix}-price`}
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
            value={values.price}
            onChange={(event) => updateValue("price", event.target.value)}
            required
            disabled={disabled}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${prefix}-stock`}>Estoque</FieldLabel>
          <Input
            id={`${prefix}-stock`}
            type="number"
            min="0"
            step="1"
            placeholder="0"
            value={values.stock}
            onChange={(event) => updateValue("stock", event.target.value)}
            required
            disabled={disabled}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor={`${prefix}-status`}>Status</FieldLabel>
          <Select
            value={values.status}
            onValueChange={(status) => updateValue("status", status)}
            disabled={disabled}
          >
            <SelectTrigger id={`${prefix}-status`} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativa</SelectItem>
              <SelectItem value="inactive">Inativa</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor={`${prefix}-sku`}>SKU</FieldLabel>
          <Input
            id={`${prefix}-sku`}
            value={values.sku}
            onChange={(event) => updateValue("sku", event.target.value)}
            placeholder="Ex.: MOUSE-PRE"
            required
            disabled={disabled}
          />
        </Field>
      </FieldGroup>

      <section className="space-y-3">
        <div className="space-y-1">
          <Label size="sm">Detalhes da variante</Label>
          <Text>Associe atributos e valores cadastrados.</Text>
        </div>
        {(attributesQuery.isError || attributeValuesQuery.isError) && (
          <Text role="alert" className="animate-pulse-once">
            Não foi possível carregar os atributos. Tente novamente antes de
            adicionar detalhes.
          </Text>
        )}
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <Field>
            <FieldLabel htmlFor={`${prefix}-attribute`}>Tipo</FieldLabel>
            <Select
              value={selectedAttributeId || "none"}
              onValueChange={(attributeId) => {
                setSelectedAttributeId(
                  attributeId === "none" ? "" : attributeId,
                );
                setSelectedAttributeValueId("");
              }}
              disabled={disabled || attributesQuery.isPending}
            >
              <SelectTrigger id={`${prefix}-attribute`} className="w-full">
                <SelectValue placeholder="Selecione um atributo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Selecione um atributo</SelectItem>
                {attributes.map((attribute) => (
                  <SelectItem key={attribute.id} value={attribute.id}>
                    {attribute.name} · {ATTRIBUTE_LABEL[attribute.type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor={`${prefix}-attribute-value`}>Valor</FieldLabel>
            <Select
              value={selectedAttributeValueId || "none"}
              onValueChange={(attributeValueId) =>
                setSelectedAttributeValueId(
                  attributeValueId === "none" ? "" : attributeValueId,
                )
              }
              disabled={
                disabled ||
                !selectedAttributeId ||
                attributeValuesQuery.isPending
              }
            >
              <SelectTrigger
                id={`${prefix}-attribute-value`}
                className="w-full"
              >
                <SelectValue placeholder="Selecione um valor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Selecione um valor</SelectItem>
                {availableValues.map((attributeValue) => (
                  <SelectItem key={attributeValue.id} value={attributeValue.id}>
                    {getAttributeValueLabel(attributeValue)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Button
            type="button"
            variant="success"
            onClick={addDetail}
            disabled={
              disabled ||
              attributesQuery.isError ||
              attributeValuesQuery.isError ||
              !selectedAttributeId ||
              !selectedAttributeValueId
            }
          >
            <PlusIcon aria-hidden="true" size={18} />
            Adicionar
          </Button>
        </div>

        {selectedAttribute && availableValues.length === 0 && (
          <Text className="py-3 text-gray-600">
            Nenhum valor cadastrado para {selectedAttribute.name}.
          </Text>
        )}

        <div className="divide-y divide-secondary-600 rounded-md border border-gray-300 px-3">
          {values.details.length > 0 ? (
            values.details.map((detail) => {
              const label = getDetailLabel(detail);
              return (
                <div
                  key={`${detail.attributeId}-${detail.attributeValueId}`}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div>
                    <Text>{label.name}</Text>
                    <Text size="sm" variant="secondary">
                      {[label.type, label.value].filter(Boolean).join(" · ")}
                    </Text>
                  </div>
                  <Button
                    type="button"
                    variant="danger-ghost"
                    size="sm"
                    aria-label={`Remover detalhe ${label.name}`}
                    onClick={() =>
                      updateValue(
                        "details",
                        values.details.filter(
                          (item) => item.attributeId !== detail.attributeId,
                        ),
                      )
                    }
                    disabled={disabled}
                  >
                    <Trash2Icon aria-hidden="true" size={18} />
                  </Button>
                </div>
              );
            })
          ) : (
            <Text className="py-3 text-gray-600">
              Nenhum detalhe adicionado.
            </Text>
          )}
        </div>
      </section>

      {onDefaultChange && (
        <label className="flex items-center gap-3 rounded-lg border border-gray-300 p-4">
          <Checkbox
            variant={"secondary-bordered"}
            rounded={"full"}
            checked={isDefault}
            onCheckedChange={(checked) => onDefaultChange(checked === true)}
            disabled={disabled}
          />
          <span className="space-y-1">
            <Label size="xs">Variante padrão</Label>
            <Text className="text-gray-600">
              Esta será a variante exibida inicialmente para o produto.
            </Text>
          </span>
        </label>
      )}
    </div>
  );
}
