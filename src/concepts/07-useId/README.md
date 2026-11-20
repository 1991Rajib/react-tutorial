# useId Hook (React 18 & 19)

## What is it?
`useId` is a hook for generating unique, accessible IDs that are stable across both server and client rendering (hydration-safe).

```jsx
const id = useId();
```

## Why not just use `Math.random()` or hardcoded strings?
1. **Server-Side Hydration:** `Math.random()` generates different IDs on the server vs client, causing nasty hydration mismatch errors.
2. **Component Reusability:** If you hardcode `id="email"`, rendering that component twice creates duplicate IDs in the DOM, breaking accessibility (`htmlFor` label focus and `aria-describedby` screen readers).
3. **Compound Suffixes:** You can generate IDs for multiple related elements from one `useId`:
   ```jsx
   const id = useId();
   // id + '-input'
   // id + '-hint'
   // id + '-error'
   ```
