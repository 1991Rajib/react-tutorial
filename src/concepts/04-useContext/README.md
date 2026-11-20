# useContext Hook

## What is it?
`useContext` allows components to read and subscribe to context from the nearest provider without manually passing props through every intermediate component ("prop drilling").

## 🚀 What's New in React 19?
1. **No More `.Provider` Required:**
   In React 19, you can render `<ThemeContext value={theme}>` directly! You no longer need to write `<ThemeContext.Provider value={theme}>`.
2. **Alternative `use(Context)` API:**
   You can also consume context using the new `use()` hook (`const theme = use(ThemeContext);`), which has the unique advantage of being callable inside conditionals (`if`) and loops!

## When to use Context
- Global UI theme (Light/Dark mode)
- Authenticated user session
- Current language/localization
- Routing / navigation data
