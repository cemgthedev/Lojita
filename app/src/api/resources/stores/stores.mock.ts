import type { Store } from "@/api/resources/stores/validations/store.schema";

const createdAt = "2026-01-01T00:00:00.000Z";

/** Loja de demonstração vinculada ao usuário com perfil de vendedor. */
export const mockStores: Store[] = [
  {
    id: "mock-store-seller-1",
    name: "Lojita do Samuel",
    description:
      "Produtos selecionados com carinho para deixar o seu dia a dia melhor.",
    logoUrl: "",
    businessEmail: "loja.samu@lojita.local",
    phone: "(11) 90000-0003",
    url: "lojita-do-samuel",
    status: "active",
    userId: "mock-seller-1",
    createdAt,
    updatedAt: createdAt,
  },
];
