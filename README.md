# Lojita

Marketplace multi-vendedor para descobrir produtos, comprar online e administrar lojas em uma única plataforma.

[Repositório no GitHub](https://github.com/cemgthedev/Lojita) · Demo online: ainda não publicada · [Guia técnico de rotas e permissões](app/src/routes/guide.md)

## Showcase

As telas abaixo foram capturadas do projeto e mostram as experiências de cliente, vendedor e administrador.

![Página inicial do marketplace, com categorias e ofertas](docs/screenshots/public-dashboard.png)

![Catálogo com busca, categorias, filtros e ordenação](docs/screenshots/products.png)

![Detalhes do produto, variantes, estoque e avaliações](docs/screenshots/product-details.png)

![Dashboard administrativo com ações e indicadores](docs/screenshots/admin-dashboard.png)

![Etapa de dados pessoais do cadastro de vendedor](docs/screenshots/seller-register-personal-data.png)

## Problema e objetivo

Pequenos vendedores precisam de uma vitrine digital e ferramentas para gerenciar seus negócios, enquanto compradores precisam descobrir produtos de diferentes lojas em um só lugar. A Lojita reúne essas experiências e organiza a interface por perfil de usuário.

## Funcionalidades em destaque

- Vitrine pública com categorias, ofertas e navegação pelo catálogo.
- Busca, filtros e ordenação de produtos.
- Detalhes de produto com imagens, variantes, estoque, avaliações e ações de compra.
- Áreas de cliente, vendedor e administrador com navegação e rotas específicas para cada perfil.
- Fluxo de cadastro de vendedor e telas de gerenciamento de produtos, lojas e atendimento.
- Estrutura de autenticação e integração HTTP com uma API configurada por ambiente.

> A aplicação é o frontend do projeto. Operações de negócio, pagamentos e autorização dos dados dependem da API; uma tela ou rota no cliente não substitui validações no servidor.

## Tecnologias

- **Interface:** React 19, TypeScript 6 e Vite 8.
- **Estilos e componentes:** Tailwind CSS 4, Radix UI e componentes próprios.
- **Navegação e dados:** React Router 7 e TanStack Query.
- **Formulários e validação:** Zod.
- **Utilitários:** date-fns, Lucide React, Embla Carousel e Sonner.

## Arquitetura

O código da aplicação está em `app/`; o projeto separa páginas, componentes reutilizáveis, acesso à API, estado compartilhado e configuração de rotas.

```text
app/src/
├── api/          chamadas HTTP e recursos da API
├── components/   componentes de interface e layouts por perfil
├── pages/        páginas de cliente, vendedor, admin e suporte
├── providers/    autenticação, cache de consultas e notificações
├── routes/       rotas públicas e autenticadas, guards por perfil
└── styles/       estilos globais
```

Fluxo resumido: `main.tsx` monta os providers e o roteador; as rotas públicas e autenticadas direcionam para as páginas, enquanto layouts e guards organizam as áreas por perfil. As páginas usam os módulos de `api/` para conversar com o serviço externo.

## Decisões e trade-offs

- **Rotas agrupadas por perfil:** permitem layouts e permissões mais claros, mas exigem manter as entradas de rota e os links de navegação alinhados.
- **Frontend separado da API:** facilita evoluir a interface de forma independente, mas exige configurar `VITE_API_URL` e ter o serviço disponível para fluxos que dependem de dados reais.
- **Guards no cliente:** melhoram a navegação e evitam exibir áreas inadequadas, mas não são uma barreira de segurança; o servidor deve autorizar cada operação e recurso.

## Resultados e aprendizados

O projeto reúne uma experiência visual para descoberta e compra de produtos e interfaces administrativas para diferentes perfis. A estrutura modular de páginas, recursos de API e rotas facilita separar responsabilidades; o principal cuidado é manter a autorização consistente entre interface, rotas e backend.

## Próximos passos

- Publicar uma demo conectada a um ambiente acessível.
- Completar e validar fluxos ponta a ponta com a API, incluindo pedidos e pagamentos.
- Adicionar testes para os principais fluxos de navegação e compra.