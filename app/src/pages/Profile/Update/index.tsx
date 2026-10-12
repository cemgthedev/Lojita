import { useUpdateUserMutation } from "@/api/resources/users/mutations";
import type { UpdateUser } from "@/api/resources/users/validations/update.schema";
import { Text, Label, Separator } from "@/components/ui";
import { toast } from "@/components/ui/toast";
import { ProfileForm } from "@/pages/Profile/form/ProfileForm";
import { useRequiredAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router";

export function ProfileUpdatePage() {
  const { updateUser } = useRequiredAuth();
  const mutation = useUpdateUserMutation();
  const navigate = useNavigate();

  async function handleSubmit(values: UpdateUser) {
    const updatedUser = await mutation.mutateAsync(values);

    updateUser({
      id: updatedUser.id,
      name: updatedUser.name,
      document: updatedUser.document,
      phone: updatedUser.phone,
      email: updatedUser.email,
      role: updatedUser.role,
      avatarUrl: updatedUser.avatarUrl,
    });
  }

  return (
    <section className="w-full space-y-4">
      <div className="space-y-1">
        <Label>Dados Pessoais</Label>
        <Text>Mantenha seus dados pessoais atualizados.</Text>
      </div>

      <Separator variant="secondary" orientation="horizontal" />

      <ProfileForm
        onSubmit={handleSubmit}
        onSuccess={() => {
          toast("Perfil atualizado com sucesso.", { variant: "success" });
          navigate("/profile");
        }}
        onError={() => {
          toast("Não foi possível atualizar o perfil.", {
            variant: "danger",
            duration: 1500,
          });
        }}
        onCancel={() => navigate("/profile")}
        isPending={mutation.isPending}
      />
    </section>
  );
}
