import type { Category } from "@/api/resources/categories/validations/category.schema";

const createdAt = "2026-01-01T00:00:00.000Z";

export const mockCategories: Category[] = [
  {
    id: "mock-category-shirts",
    title: "Camisetas",
    description: "Camisetas casuais e polos para diferentes ocasiões.",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    createdAt,
    updatedAt: null,
  },
  {
    id: "mock-category-pants",
    title: "Calças",
    description: "Calças confortáveis para o dia a dia.",
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    createdAt,
    updatedAt: null,
  },
  {
    id: "mock-category-accessories",
    title: "Acessórios",
    description: "Acessórios práticos para completar o visual.",
    imageUrl:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80",
    createdAt,
    updatedAt: null,
  },
];
