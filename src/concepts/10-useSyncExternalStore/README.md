# useSyncExternalStore Hook (React 18 & 19)

## What is it?
`useSyncExternalStore` is the official hook recommended by the React team for subscribing to external state stores (like Redux, Zustand, or browser APIs like `navigator.onLine`, window dimensions, and media queries).

```jsx
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
```

## What problem does it solve? ("Tearing")
In modern React with concurrent rendering, React can pause and resume rendering across multiple components. If an external store changes *during* that pause, one component might render with the old data and another with the new data. This glitch is called **Tearing**.

`useSyncExternalStore` guarantees that reads from external stores are always consistent and synchronous without tearing.

## When to use it
- Browser APIs: `navigator.onLine` (Network status), `window.matchMedia` (Dark mode/media queries), `window.scrollY`.
- Custom global stores outside React component tree.
