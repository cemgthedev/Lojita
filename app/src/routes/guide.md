# Guia: páginas compartilhadas e RBAC nas rotas

Este projeto usa React Router com rotas declaradas em `src/routes`. A
autenticação, a autorização por papel, os layouts e as páginas são
responsabilidades distintas. Mantenha essa separação ao adicionar páginas
acessíveis por mais de um tipo de usuário.

## Como as rotas estão organizadas

- `index.tsx` reúne as rotas públicas e monta `authenticatedRoutes` sob
  `RequireAuth`. Tudo dentro desse grupo exige sessão autenticada.
- `shared.routes.tsx` contém páginas autenticadas compartilhadas e páginas
  comuns, como perfil. Rotas que precisam de autorização adicional podem ter
  seu próprio `RequireRole`.
- `seller.routes.tsx`, `admin.routes.tsx` e `support.routes.tsx` protegem as
  áreas por papel e montam, respectivamente, `SellerLayout`, `AdminLayout` e
  `SupportLayout`.
- Cada layout renderiza o conteúdo filho por meio de `<Outlet />`; por isso,
  as rotas filhas recebem automaticamente o sidebar e o header daquele papel.
- `layouts/sidebar.config.tsx` define os links de navegação exibidos pelos
  sidebars. Um link de navegação não é uma regra de autorização.
- `RequireRole` autoriza se o usuário tiver **qualquer** papel da lista
  (`some`), não todos. Os valores válidos estão em
  `users/validations/auth.schema.ts`.

## Uma página, vários layouts

Use um único componente de página para a funcionalidade compartilhada, por
exemplo `OrdersPage`, e declare uma rota para cada layout que deve apresentá-la.
Assim, cada usuário recebe a navegação adequada ao seu papel sem duplicar a
implementação da página.

Exemplo ilustrativo para uma futura `pages/Orders/index.tsx`:

```tsx
// routes/seller.routes.tsx
{
  path: `${urls.seller_dashboard}${urls.orders}`,
  element: <OrdersPage />,
}

// routes/admin.routes.tsx
{
  path: `${urls.admin_dashboard}${urls.orders}`,
  element: <OrdersPage />,
}

// routes/support.routes.tsx
{
  path: `${urls.support_dashboard}${urls.orders}`,
  element: <OrdersPage />,
}
```

Essas entradas ficam dentro dos filhos dos respectivos layouts e dentro do
`RequireRole` já existente em cada arquivo. Use caminhos diferentes, como
`${urls.seller_dashboard}${urls.orders}`,
`${urls.admin_dashboard}${urls.orders}` e
`${urls.support_dashboard}${urls.orders}`, quando cada perfil deve manter sua
própria área, URL e shell. Cada rota deve apontar para o mesmo componente
importado; não copie a página para três diretórios.

Adicione também cada link à configuração do sidebar correspondente:

```tsx
{
  name: "Pedidos",
  href: `${urls.seller_dashboard}${urls.orders}`,
  icon: <ShoppingBasketIcon size={20} />,
}
```

Repita o link para admin e suporte com seus prefixos e configurações. Mantenha
rota e link sincronizados usando constantes em `constants/urls.ts`. Declare as
rotas explicitamente nos arquivos `seller.routes.tsx`, `admin.routes.tsx` e
`support.routes.tsx`; não derive a árvore de rotas da configuração do sidebar,
pois a navegação é apresentação e não política de acesso. Rotas aninhadas com
um `path` relativo também são válidas, desde que permaneçam sob o layout e o
`RequireRole` corretos.

## Rotas de loja pública e gerenciamento

Separe a vitrine pública da área autenticada de gerenciamento:

- A vitrine pública usa o caminho `` `${urls.stores}/:id` `` e renderiza
  `StoreDetailsPage`. Monte o link com
  `` `${urls.stores}/${encodeURIComponent(storeId)}` ``.
- A página do vendedor para gerenciar sua própria loja usa
  `` `${urls.seller_dashboard}${urls.store}` `` (`/seller-dashboard/store`).
  Ela identifica a loja pelo
  usuário autenticado. A rota de detalhes explícita é
  `` `${urls.seller_dashboard}${urls.store}/:storeId` ``.
- A administração acessa uma loja por
  `` `${urls.admin_dashboard}${urls.stores}/:storeId` `` (`/admin-dashboard/stores/:storeId`),
  protegida pelo guard de admin.
- A edição usa
  `` `${urls.seller_dashboard}${urls.store}/:storeId${urls.update}` `` ou
  `` `${urls.admin_dashboard}${urls.stores}/:storeId${urls.update}` ``,
  conforme o layout/papel. Ao compor links com IDs, use
  `encodeURIComponent(storeId)`.

Use `urls.stores` seguido pelo ID para links “Ver vitrine” e os caminhos da
área autenticada para “Ver loja”/gerenciamento. Não volte a introduzir uma
rota global separada como `/store-dashboard`: o shell e a autorização devem
vir da rota de papel.

## Quando usar `shared.routes.tsx`

Coloque uma rota em `shared.routes.tsx` quando a experiência for realmente
comum a todos os usuários autenticados e não precisar do header/sidebar de
seller, admin ou suporte. O `RequireAuth` de `routes/index.tsx` já protege esse
grupo:

```tsx
{
  path: "/orders",
  element: <OrdersPage />,
}
```

Se ela precisar de uma autorização além de autenticação, envolva-a com
`RequireRole`:

```tsx
{
  element: <RequireRole allowedRoles={[ROLE.ADMIN, ROLE.SUPPORT]} />,
  children: [
    {
      path: "/orders/operations",
      element: <OrdersPage />,
    },
  ],
}
```

Não use uma única rota compartilhada fora dos layouts de papel e espere que
ela receba o sidebar de admin ou suporte: layouts são herdados pela posição da
rota na árvore. Se a mesma página deve aparecer em shells diferentes, declare
uma entrada por shell e reutilize o componente.

## Autorização: regras práticas

1. **A autenticação e o papel são verificações diferentes.** `RequireAuth`
   garante a sessão; `RequireRole` limita a área a papéis permitidos. Mantenha
   ambas as camadas na árvore de rotas.
2. **Escolha a menor permissão necessária.** Restrinja a rota ao papel ou
   conjunto de papéis que realmente pode acessar a funcionalidade. Não inclua
   todos os papéis só porque compartilham o componente.
3. **A página compartilhada não deve decidir se a rota é protegida.** A regra
   de entrada pertence à árvore de rotas. A página pode adaptar ações ou
   apresentação ao papel, mas não deve substituir o guard.
4. **O menu não protege dados.** Ocultar um link no sidebar melhora a UX, mas
   qualquer usuário pode tentar abrir a URL diretamente. Proteja a rota e,
   principalmente, valide cada operação e autorização no servidor/API.
5. **A autorização também depende do recurso.** Um vendedor pode ter acesso à
   página de pedidos, mas só deve ler ou alterar pedidos de sua própria loja.
   Faça essa validação no backend; não confie em IDs, filtros ou papel enviados
   pelo cliente.
6. **Mantenha um componente base neutro.** Para diferenças pequenas de
   interface, passe props explícitas ou use permissões derivadas de uma fonte
   central. Evite duplicar páginas ou espalhar verificações de papel por cada
   botão.
7. **Não trate rotas geradas pelo menu como política de acesso.** A configuração
   do sidebar é apresentação. Prefira declarar as rotas explicitamente dentro
   do guard/layout apropriado, para que um novo link não crie implicitamente
   uma rota acessível.

## Checklist para adicionar uma página compartilhada

- [ ] Criar um único componente em `pages/<Feature>` e reutilizá-lo.
- [ ] Decidir se a experiência é comum sem layout de papel ou se deve aparecer
      em um ou mais layouts de papel.
- [ ] Adicionar a rota sob `RequireAuth`; para áreas de papel, mantê-la também
      sob o `RequireRole` e layout correspondentes.
- [ ] Declarar uma rota por layout necessário, mesmo que todas renderizem o
      mesmo componente.
- [ ] Adicionar os links somente aos sidebars dos papéis autorizados e manter
      os caminhos alinhados.
- [ ] Validar acesso direto à URL com usuário autorizado e não autorizado.
- [ ] Confirmar que a API aplica autorização por papel e por recurso.
- [ ] Incluir uma tela/rota de acesso negado apropriada. Atualmente,
      `RequireRole` redireciona para `/forbidden`; confirme que essa rota está
      implementada para não cair na rota curinga de não encontrado.
