import {
  useCreateAttributeValueMutation,
  useDeleteAttributeValueMutation,
  useUpdateAttributeValueMutation,
} from "@/api/resources/products/attributes/mutations";
import { useAttributeValuesQuery } from "@/api/resources/products/attributes/queries";
import type { AttributeValue } from "@/api/resources/products/attributes/validations/attribute-value.schema";
import {
  ATTRIBUTE_LABEL,
  ATTRIBUTE_TYPE,
  type Attribute,
  type AttributeType,
} from "@/api/resources/products/attributes/validations/attribute.schema";
import {
  createAttributeSchema,
  type CreateAttribute,
} from "@/api/resources/products/attributes/validations/create-attribute.schema";
import {
  Button,
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
import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useRef, useState, type FormEvent } from "react";

type DraftAttributeValue = {
  id: number;
  title: string;
  value: string;
};

type AttributeFormProps = {
  initialValues?: Partial<CreateAttribute>;
  attributeId?: string;
  canEditValues?: boolean;
  submitLabel?: string;
  onSubmit: (
    values: CreateAttribute,
    existingAttributeId?: string,
  ) => Promise<Attribute>;
  onSuccess?: (attribute: Attribute) => void | Promise<void>;
  onError?: (error: unknown) => void | Promise<void>;
  onBack: () => void;
  isPending: boolean;
};

const emptyValues: CreateAttribute = {
  name: "",
  type: ATTRIBUTE_TYPE.WORD,
};

const attributeTypes = Object.values(ATTRIBUTE_TYPE);

function isAttributeType(value: string): value is AttributeType {
  return attributeTypes.some((type) => type === value);
}

function getValueLabel(attributeValue: AttributeValue) {
  return `${attributeValue.title} (${attributeValue.value})`;
}

export function AttributeForm({
  initialValues,
  attributeId,
  canEditValues = false,
  submitLabel = "Salvar atributo",
  onSubmit,
  onSuccess,
  onError,
  onBack,
  isPending,
}: AttributeFormProps) {
  const [values, setValues] = useState<CreateAttribute>(() => ({
    ...emptyValues,
    ...initialValues,
  }));
  const [savedAttributeId, setSavedAttributeId] = useState(attributeId);
  const [draftValues, setDraftValues] = useState<DraftAttributeValue[]>([]);
  const [newValueTitle, setNewValueTitle] = useState("");
  const [newValue, setNewValue] = useState("");
  const [editingValue, setEditingValue] = useState<AttributeValue>();
  const [editingTitle, setEditingTitle] = useState("");
  const [editingValueText, setEditingValueText] = useState("");
  const nextDraftId = useRef(0);
  const activeAttributeId = savedAttributeId;
  const valuesQuery = useAttributeValuesQuery(
    activeAttributeId ? { attributeId: activeAttributeId } : undefined,
    Boolean(activeAttributeId),
  );
  const createValueMutation = useCreateAttributeValueMutation();
  const updateValueMutation = useUpdateAttributeValueMutation();
  const deleteValueMutation = useDeleteAttributeValueMutation();
  const isValueMutationPending =
    createValueMutation.isPending ||
    updateValueMutation.isPending ||
    deleteValueMutation.isPending;
  const formIsPending = isPending || isValueMutationPending;
  const canEditSavedValues =
    Boolean(activeAttributeId) && canEditValues && !valuesQuery.isError;
  const savedValues = valuesQuery.data ?? [];

  function handleNameChange(name: string) {
    setValues((current) => ({ ...current, name }));
  }

  function handleAddValue() {
    const title = newValueTitle.trim();
    const value = newValue.trim();
    if (!title || !value) {
      toast("Informe o título e o valor.", { variant: "danger" });
      return;
    }

    if (!activeAttributeId) {
      setDraftValues((current) => [
        ...current,
        { id: nextDraftId.current++, title, value },
      ]);
      setNewValueTitle("");
      setNewValue("");
      return;
    }

    if (!canEditSavedValues) return;

    void createValueMutation
      .mutateAsync({ title, value, attributeId: activeAttributeId })
      .then(() => {
        setNewValueTitle("");
        setNewValue("");
      })
      .catch(() => {
        toast("Não foi possível adicionar o valor.", { variant: "danger" });
      });
  }

  async function handleUpdateValue(attributeValue: AttributeValue) {
    try {
      await updateValueMutation.mutateAsync({
        id: attributeValue.id,
        title: editingTitle.trim(),
        value: editingValueText.trim(),
      });
      setEditingValue(undefined);
    } catch {
      toast("Não foi possível atualizar o valor.", { variant: "danger" });
    }
  }

  async function handleDeleteValue(attributeValue: AttributeValue) {
    if (
      !window.confirm(
        `Deseja apagar o valor "${getValueLabel(attributeValue)}"?`,
      )
    ) {
      return;
    }

    try {
      await deleteValueMutation.mutateAsync(attributeValue.id);
    } catch {
      toast("Não foi possível apagar o valor.", { variant: "danger" });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = createAttributeSchema.safeParse(values);

    if (!result.success) {
      toast("Verifique os dados do atributo.", { variant: "danger" });
      return;
    }

    try {
      const attribute = await onSubmit(result.data, savedAttributeId);
      setSavedAttributeId(attribute.id);

      for (const draftValue of draftValues) {
        await createValueMutation.mutateAsync({
          title: draftValue.title,
          value: draftValue.value,
          attributeId: attribute.id,
        });
        setDraftValues((current) =>
          current.filter((value) => value.id !== draftValue.id),
        );
      }

      await onSuccess?.(attribute);
    } catch (error) {
      if (onError) {
        await onError(error);
        return;
      }

      toast("Não foi possível salvar os dados do atributo.", {
        variant: "danger",
      });
    }
  }

  return (
    <form
      className="w-full max-w-3xl space-y-6 rounded-lg border border-secondary-600 p-4"
      onSubmit={handleSubmit}
    >
      <FieldGroup className="gap-4">
        <Field>
          <FieldLabel htmlFor="attribute-name">Nome</FieldLabel>
          <Input
            id="attribute-name"
            name="name"
            placeholder="Digite o nome do atributo"
            value={values.name}
            onChange={(event) => handleNameChange(event.target.value)}
            required
            disabled={formIsPending}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="attribute-type">Tipo</FieldLabel>
          <Select
            value={values.type}
            onValueChange={(type) => {
              if (isAttributeType(type)) {
                setValues((current) => ({ ...current, type }));
              }
            }}
            disabled={formIsPending}
          >
            <SelectTrigger id="attribute-type" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {attributeTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {ATTRIBUTE_LABEL[type]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>

      <section aria-labelledby="attribute-values-heading" className="space-y-3">
        <div className="space-y-1">
          <Label id="attribute-values-heading" size="sm">
            Valores
          </Label>
          {activeAttributeId && valuesQuery.isError && (
            <Text role="alert" className="animate-pulse-once">
              Não foi possível carregar os valores. Dados de exemplo podem estar
              sendo exibidos e não podem ser alterados.
            </Text>
          )}
          {activeAttributeId && !canEditValues && (
            <Text role="status">Dados de exemplo não podem ser alterados.</Text>
          )}
        </div>

        {(!activeAttributeId || canEditSavedValues) && (
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <Field>
              <FieldLabel htmlFor="attribute-value-title">
                Título do valor
              </FieldLabel>
              <Input
                id="attribute-value-title"
                value={newValueTitle}
                onChange={(event) => setNewValueTitle(event.target.value)}
                placeholder="Ex.: Preto"
                disabled={formIsPending}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="attribute-value">Valor</FieldLabel>
              <Input
                id="attribute-value"
                value={newValue}
                onChange={(event) => setNewValue(event.target.value)}
                placeholder={
                  values.type === ATTRIBUTE_TYPE.HEX
                    ? "Ex.: #000000"
                    : "Digite o valor"
                }
                disabled={formIsPending}
              />
            </Field>
            <Button
              type="button"
              variant="success"
              onClick={handleAddValue}
              disabled={
                formIsPending || !newValueTitle.trim() || !newValue.trim()
              }
              aria-label="Adicionar valor"
            >
              <PlusIcon size={18} />
              Adicionar
            </Button>
          </div>
        )}

        {activeAttributeId && valuesQuery.isPending ? (
          <Text>Carregando valores...</Text>
        ) : (
          <div className="divide-y divide-secondary-600 rounded-md border border-gray-300 px-3">
            {savedValues.map((attributeValue) => (
              <div
                key={attributeValue.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                {editingValue?.id === attributeValue.id ? (
                  <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
                    <Input
                      aria-label="Título do valor"
                      value={editingTitle}
                      onChange={(event) => setEditingTitle(event.target.value)}
                      disabled={formIsPending}
                    />
                    <Input
                      aria-label="Valor"
                      value={editingValueText}
                      onChange={(event) =>
                        setEditingValueText(event.target.value)
                      }
                      disabled={formIsPending}
                    />
                  </div>
                ) : (
                  <div className="min-w-0 flex-1">
                    <Text>{attributeValue.title}</Text>
                    <Text size="sm" variant="secondary">
                      {attributeValue.value}
                    </Text>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  {editingValue?.id === attributeValue.id ? (
                    <>
                      <Button
                        type="button"
                        variant="secondary-ghost"
                        size="sm"
                        aria-label="Salvar valor"
                        disabled={
                          formIsPending ||
                          !editingTitle.trim() ||
                          !editingValueText.trim()
                        }
                        onClick={() => void handleUpdateValue(attributeValue)}
                      >
                        <CheckIcon size={18} />
                      </Button>
                      <Button
                        type="button"
                        variant="secondary-ghost"
                        size="sm"
                        aria-label="Cancelar edição do valor"
                        disabled={formIsPending}
                        onClick={() => setEditingValue(undefined)}
                      >
                        <XIcon size={18} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="secondary-ghost"
                        size="sm"
                        aria-label={`Editar valor ${attributeValue.title}`}
                        disabled={!canEditSavedValues || formIsPending}
                        onClick={() => {
                          setEditingValue(attributeValue);
                          setEditingTitle(attributeValue.title);
                          setEditingValueText(attributeValue.value);
                        }}
                      >
                        <PencilIcon size={18} />
                      </Button>
                      <Button
                        type="button"
                        variant="danger-ghost"
                        size="sm"
                        aria-label={`Apagar valor ${attributeValue.title}`}
                        disabled={!canEditSavedValues || formIsPending}
                        onClick={() => void handleDeleteValue(attributeValue)}
                      >
                        <Trash2Icon size={18} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {draftValues.map((draftValue) => (
              <div
                key={draftValue.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0 flex-1">
                  <Text>{draftValue.title}</Text>
                  <Text size="sm" variant="secondary">
                    {draftValue.value}
                  </Text>
                </div>
                <Button
                  type="button"
                  variant="danger-ghost"
                  size="sm"
                  aria-label={`Remover valor ${draftValue.title}`}
                  disabled={formIsPending}
                  onClick={() =>
                    setDraftValues((current) =>
                      current.filter((value) => value.id !== draftValue.id),
                    )
                  }
                >
                  <Trash2Icon size={18} />
                </Button>
              </div>
            ))}
            {savedValues.length === 0 && draftValues.length === 0 && (
              <Text className="py-4" variant="secondary">
                Nenhum valor cadastrado.
              </Text>
            )}
          </div>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="danger-bordered"
          onClick={onBack}
          disabled={formIsPending}
          className="w-full max-w-50"
        >
          Voltar
        </Button>
        <Button
          type="submit"
          variant="secondary"
          disabled={formIsPending}
          className="w-full max-w-50"
        >
          {formIsPending ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
