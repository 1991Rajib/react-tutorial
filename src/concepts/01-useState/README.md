# useState Hook

## What is it?
`useState` is the fundamental hook in React that lets functional components hold and update their own local state.

## React 16 vs Modern React
- **React 16:** State updates inside `setTimeout`, promises, or native DOM listeners did NOT batch automatically (causing multiple re-renders).
- **React 18 & 19:** **Automatic Batching** is enabled everywhere! Multiple `setState` calls inside async functions or event handlers are batched into a single render pass.

## Core Rules & Best Practices
1. **Never mutate state directly:** Always provide a new object/array or value (`setCount(count + 1)`, NOT `count++`).
2. **Use functional updates when new state depends on previous state:**
   ```jsx
   setCount(prev => prev + 1); // Safe from race conditions and batching
   ```
3. **Do not put derived state in state:**
   If a value can be computed from props or existing state (e.g. `fullName = firstName + ' ' + lastName`), calculate it during render! Do NOT sync it with `useEffect`.
