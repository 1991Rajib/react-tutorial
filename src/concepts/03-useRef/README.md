# useRef Hook

## What is it?
`useRef` returns a mutable ref object whose `.current` property holds a value across renders.

## Two Primary Use Cases
1. **DOM Node Reference:** Accessing native HTML elements directly (e.g. focusing an input, scrolling, measuring size).
2. **Mutable Value Storage:** Holding values (like timer IDs, previous state values, counter tokens) **without triggering a re-render** when the value changes.

## 🚀 What's New in React 19?
1. **No More `forwardRef`:** In React 19, functional components can accept `ref` directly as a regular prop!
2. **Ref Cleanup Functions:** When passing a callback to `ref`, you can now return a cleanup function that runs when the element unmounts:
   ```jsx
   <div ref={(node) => {
     // Setup code when node attaches
     return () => {
       // Cleanup code when node detaches! (New in React 19)
     };
   }} />
   ```
