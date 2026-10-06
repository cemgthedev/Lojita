# Mocks

Os mocks ficam separados da interface para que páginas, providers e guards
consumam apenas os adaptadores em `src/shared/lib`.

Para um novo domínio, como produtos:

1. Crie `products.mock.ts` com os dados de desenvolvimento.
2. Crie `products.api.ts` com métodos como `list` e `findById` que leem o mock.
3. Consuma o adaptador em um hook com React Query:

```ts
useQuery({ queryKey: ["products"], queryFn: productsApi.list });
```

Quando a API estiver pronta, substitua somente a implementação de
`productsApi.list` por `http.get(...)`; a chave da query e os componentes
continuam os mesmos. Para ações de escrita, use `useMutation`.
