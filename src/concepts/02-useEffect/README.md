# useEffect Hook

## What is it?
`useEffect` lets you synchronize a component with an **external system** (such as the browser DOM, window resize events, timers, or a network socket).

## React 16 vs Modern React Mental Model
- **React 16 (Lifecycle mindset):** People treated `useEffect` as replacement for `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. This led to overusing `useEffect` for data fetching, syncing state, and reacting to user events.
- **Modern React (Synchronization mindset):**
  1. **Do NOT use `useEffect` for data fetching if you can avoid it:** In React 19, use the `use()` hook with Suspense or a query library.
  2. **Do NOT use `useEffect` to transform data for rendering:** Compute it directly in render.
  3. **Do NOT use `useEffect` to handle user actions (like clicks):** Put that code in the event handler directly.
  4. **Always clean up your connections/listeners:** Return a cleanup function to prevent memory leaks!
