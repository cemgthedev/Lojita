import type { Category } from "@/api/resources/categories/validations/category.schema";

const createdAt = "2026-01-01T00:00:00.000Z";

export const mockCategories: Category[] = [
  {
    id: "mock-category-shirts",
    title: "Camisetas",
    description: "Camisetas casuais e polos para diferentes ocasiões.",
    imageUrl: null,
    createdAt,
    updatedAt: null,
  },
  {
    id: "mock-category-pants",
    title: "Calças",
    description: "Calças confortáveis para o dia a dia.",
    imageUrl: null,
    createdAt,
    updatedAt: null,
  },
  {
    id: "mock-category-accessories",
    title: "Acessórios",
    description: "Acessórios práticos para completar o visual.",
    imageUrl: null,
    createdAt,
    updatedAt: null,
  },
];
