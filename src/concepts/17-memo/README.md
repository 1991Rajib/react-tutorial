# React.memo (Component Memoization)

## What is it?
`React.memo` is a Higher-Order Component (HOC) that wraps a component to prevent it from re-rendering if its props have not changed.

```jsx
const MemoizedComponent = React.memo(MyComponent, arePropsEqual?);
```

## How Does it Work?
By default, whenever a parent component re-renders, **all of its children re-render too**, regardless of whether their props changed!

When you wrap a child with `React.memo`:
1. React performs a **shallow comparison** (`===`) of each prop between renders.
2. If all props are identical, React skips rendering the child and reuses the previous rendered result.
3. If any prop changed, the child re-renders.

## The Gotcha: Object & Function References
If you pass inline objects, arrays, or inline functions as props to a `React.memo` component:
```jsx
// ❌ FAILS: A new function reference () => {} is created on every parent render!
<MemoizedCard onClick={() => handleClick(id)} />

// ✅ FIX: Stabilize function reference with useCallback!
const memoizedHandler = useCallback(() => handleClick(id), [id]);
<MemoizedCard onClick={memoizedHandler} />
```

## Custom Comparison Function: `arePropsEqual`
You can pass a second argument to customize the comparison:
```jsx
function arePropsEqual(prevProps, nextProps) {
  // Return true if props are equal (DO NOT re-render)
  // Return false if props are different (DO re-render)
  return prevProps.item.id === nextProps.item.id && prevProps.item.updatedAt === nextProps.item.updatedAt;
}

export default React.memo(MyComponent, arePropsEqual);
```

## 🚀 The React 19 & React Compiler Future
With the introduction of the **React Compiler**, React automatically detects dependencies and memoizes components under the hood, making manual `React.memo` wrappers largely unnecessary in modern compiler-enabled codebases!
