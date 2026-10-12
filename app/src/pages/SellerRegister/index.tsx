import { TYPE } from "@/api/resources/addresses/validations/type.schema";
import {
  useCreateStoreMutation,
  useUpdateStoreMutation,
} from "@/api/resources/stores/mutations";
import type { CreateStore } from "@/api/resources/stores/validations/create.schema";
import type { Store } from "@/api/resources/stores/validations/store.schema";
import { useUpdateUserMutation } from "@/api/resources/users/mutations";
import type { UpdateUser } from "@/api/resources/users/validations/update.schema";
import {
  Button,
  Label,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { urls } from "@/constants/urls";
import { FormAddress } from "@/pages/Profile/Addresses/form/FormAddress";
import { ProfileForm } from "@/pages/Profile/form/ProfileForm";
import { StoreForm } from "@/pages/SellerRegister/StoreForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { cn } from "@/utils/cn";
import {
  ArrowLeftIcon,
  MapPinIcon,
  StoreIcon,
  UserRoundIcon,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const registrationSteps = [
  {
    value: "personal",
    title: "Dados pessoais",
    description: "Confirme seus dados para o cadastro como vendedor.",
    icon: UserRoundIcon,
  },
  {
    value: "store",
    title: "Dados da loja",
    description: "Conte sobre sua loja e como os clientes podem encontrá-la.",
    icon: StoreIcon,
  },
  {
    value: "address",
    title: "Endereço da loja",
    description: "Informe o endereço usado para identificar sua loja.",
    icon: MapPinIcon,
  },
] satisfies {
  value: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[];

type RegistrationStep = (typeof registrationSteps)[number]["value"];

function isRegistrationStep(value: string): value is RegistrationStep {
  return registrationSteps.some((step) => step.value === value);
}

export function SellerRegisterPage() {
  const { user, updateUser } = useRequiredAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<RegistrationStep>("personal");
  const [furthestStep, setFurthestStep] = useState(0);
  const [registeredStore, setRegisteredStore] = useState<Store | null>(null);
  const updateUserMutation = useUpdateUserMutation();
  const createStoreMutation = useCreateStoreMutation();
  const updateStoreMutation = useUpdateStoreMutation();
  const isSavingStore =
    createStoreMutation.isPending || updateStoreMutation.isPending;

  async function handlePersonalSubmit(values: UpdateUser) {
    try {
      const updatedUser = await updateUserMutation.mutateAsync(values);
      updateUser({
        id: updatedUser.id,
        name: updatedUser.name,
        document: updatedUser.document,
        phone: updatedUser.phone,
        email: updatedUser.email,
        role: updatedUser.role,
        avatarUrl: updatedUser.avatarUrl,
      });
      setActiveStep("store");
      setFurthestStep((current) => Math.max(current, 1));
    } catch {
      toast("Não foi possível salvar os dados pessoais.", {
        variant: "danger",
      });
    }
  }

  async function handleStoreSubmit(values: CreateStore) {
    try {
      const store = registeredStore
        ? await updateStoreMutation.mutateAsync({
            ...values,
            id: registeredStore.id,
          })
        : await createStoreMutation.mutateAsync(values);

      setRegisteredStore(store);
      setActiveStep("address");
      setFurthestStep((current) => Math.max(current, 2));
    } catch {
      toast("Não foi possível salvar os dados da loja.", {
        variant: "danger",
      });
    }
  }

  return (
    <main className="flex min-h-screen flex-col gap-4 p-6">
      <Button onClick={() => navigate(-1)} className="bg-transparent p-0">
        <ArrowLeftIcon size={20} />
        <Text>Voltar</Text>
      </Button>

      <Tabs
        value={activeStep}
        onValueChange={(value) => {
          if (isRegistrationStep(value)) {
            setActiveStep(value);
          }
        }}
        className="w-full gap-4"
      >
        <TabsList
          variant={"line"}
          className="border border-gray-300 rounded-lg overflow-hidden grid h-auto w-full grid-cols-1 items-stretch gap-2 md:grid-cols-3"
        >
          {registrationSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <TabsTrigger
                key={step.value}
                value={step.value}
                // disabled={index > furthestStep} torna os passos mais restritos
                variant={
                  index === furthestStep ? "secondary-ghost" : "dark-bordered"
                }
                className={cn(
                  "h-fit justify-center whitespace-normal p-3 gap-2 text-left",
                  index === furthestStep && "animate-pulse",
                )}
              >
                <Icon aria-hidden="true" size={20} />
                <div className="space-y-px">
                  <Label size="xs">{step.title}</Label>
                  <Text size="sm">{step.description}</Text>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent
          value="personal"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <section className="space-y-4">
            <div className="space-y-1">
              <Label>Dados pessoais</Label>
              <Text>Revise os dados da sua conta antes de continuar.</Text>
            </div>
            <Separator variant="secondary" />
            <ProfileForm
              onSubmit={handlePersonalSubmit}
              onCancel={() => navigate(urls.profile)}
              submitLabel="Prosseguir"
              isPending={updateUserMutation.isPending}
            />
          </section>
        </TabsContent>

        <TabsContent
          value="store"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <section className="space-y-4">
            <div className="space-y-1">
              <Label>Dados da loja</Label>
              <Text>Informe os dados que serão apresentados aos clientes.</Text>
            </div>
            <Separator variant="secondary" />
            <StoreForm
              userId={user.id}
              onSubmit={handleStoreSubmit}
              onBack={() => setActiveStep("personal")}
              isPending={isSavingStore}
            />
          </section>
        </TabsContent>

        <TabsContent
          value="address"
          forceMount
          className="data-[state=inactive]:hidden"
        >
          <section className="space-y-4">
            <div className="space-y-1">
              <Label>Endereço da loja</Label>
              <Text>Informe onde sua loja está localizada.</Text>
            </div>
            <Separator variant="secondary" />
            <FormAddress
              addressType={TYPE.STORE}
              onBack={() => setActiveStep("store")}
              onSuccess={() => {
                toast("Cadastro de vendedor finalizado com sucesso.", {
                  variant: "success",
                });
                navigate(urls.profile);
              }}
              cancelLabel="Voltar"
              submitLabel="Finalizar cadastro"
            />
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
