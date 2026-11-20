# useReducer Hook

## What is it?
`useReducer` is an alternative to `useState` that handles complex state logic via an action-dispatch pattern (very similar to Redux, but built right into React without external libraries).

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

## When to prefer `useReducer` over `useState`
1. When state has multiple sub-values that update together.
2. When the next state depends on complex rules or previous states.
3. When you want to separate state update logic from UI rendering logic (clean testing!).
4. For managing full workflows like shopping carts, multi-step wizards, or undo/redo systems.
