import { z } from "zod";

export const changePasswordSchema = z
  .object({
    password: z.string().min(8, {
      error: "A senha deve ter pelo menos 8 caracteres.",
    }),
    passwordConfirmation: z.string().min(8, {
      error: "A confirmação deve ter pelo menos 8 caracteres.",
    }),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirmation"],
  });

export type ChangePassword = z.infer<typeof changePasswordSchema>;
