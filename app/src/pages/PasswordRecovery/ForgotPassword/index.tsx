import { passwordRecoveryApi } from "@/api/password-recovery.api";
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Label,
  Text,
} from "@/components/ui";
import { urls } from "@/constants/urls";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await passwordRecoveryApi.requestReset(email);

      // API: a resposta deve ser igual para e-mails existentes e inexistentes.
      // Isso evita revelar quais endereços possuem uma conta.
      navigate(urls.email_verification, {
        replace: true,
        state: { email: email.trim().toLocaleLowerCase() },
      });
    } catch {
      setError("Não foi possível iniciar a recuperação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="border border-secondary m-auto flex w-full sm:w-sm flex-col gap-6 rounded-lg p-4">
        <div className="flex flex-col gap-1 text-center">
          <Label>Lojita</Label>
          <Text>Recupere o acesso à sua conta</Text>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="recovery-email">E-mail</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="recovery-email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu.email@exemplo.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <InputGroupAddon align="inline-start">
                  <MailIcon size={20} />
                </InputGroupAddon>
              </InputGroup>
              <Text size="sm">
                Enviaremos um código de verificação, caso exista uma conta para
                este endereço.
              </Text>
              <FieldError>{error}</FieldError>
            </Field>

            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Enviando..." : "Enviar código"}
            </Button>
          </FieldGroup>
        </form>

        <Link
          to={urls.login}
          className="text-center flex gap-2 justify-center items-center hover:text-primary-600 transition-colors"
        >
          <ArrowLeftIcon size={20} />
          <Text>Voltar para o login</Text>
        </Link>
      </div>
    </main>
  );
}
