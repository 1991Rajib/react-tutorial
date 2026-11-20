# useMemo & useCallback Hooks

## What are they?
- **`useMemo`**: Caches the **result** of an expensive calculation so it isn't recalculated on every render:
  ```jsx
  const visibleTodos = useMemo(() => filterTodos(todos, filter), [todos, filter]);
  ```
- **`useCallback`**: Caches a **function definition** between renders so that child components that depend on referential equality (e.g. wrapped in `React.memo`) don't re-render unnecessarily:
  ```jsx
  const handleClick = useCallback(() => { doSomething(id); }, [id]);
  ```

## 🚀 The React 19 / Modern Era Context
1. **The React Compiler:** React's upcoming compiler automatically memoizes values and functions, meaning the days of writing manual dependency arrays everywhere are ending!
2. **Do not prematurely optimize:** `useMemo` and `useCallback` have their own memory and comparison overhead. Only use them when an operation is measurably expensive or when passing callbacks to optimized children.
