# Generators

Generators (Scalffolding) allow us to generate code quickly. It allow dev to follow the best practice in the code structure.

### Run:

```
yarn generate
```

## Structure

### Containers

Smart component that handle graphql api

```
/src
  -> /app
    -> /containers
      -> /Todos <features naming conventions>
        -> index.tsx
        -> models.sx
        -> gql.tsx
        -> CreateTodo.tsx (e.g for mutations)
        -> ListTodos.tsx (e.g for queries)
        -> SubscribeTodos.tsx (e.g for subscription)
        -> /interfaces
        -> /__tests__
```

### Components

Components focuses on reusability, styling

```
/src
  -> /app
    -> /components
      -> /Spinner
        -> index.tsx
        -> /__tests__
```

Check lists

- ComponentSape
