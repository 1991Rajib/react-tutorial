# The `use()` Hook (React 19)

## ✍️ How to Import & Call
```javascript
import { use } from 'react';

const value = use(resource);
```

## 📥 Parameters Accepted
1. **`resource`** `Promise<T> | React.Context<T>` *(Required)*: Either a Promise you want to resolve with `<Suspense>`, or a React Context created with `createContext()`.

## 📤 Return Values
1. **`value`** `T`: The resolved value of the Promise, or the current value of the Context.

---

## 🛠️ Step-by-Step Implementation Recipe

### Pattern 1: Reading Promises with `use()` + `<Suspense>`
```jsx
import { use, Suspense } from 'react';

function UserProfile({ userPromise }) {
  // Suspends component until userPromise resolves!
  const user = use(userPromise);
  return <h2>{user.name}</h2>;
}

// In parent component:
<Suspense fallback={<Skeleton />}>
  <UserProfile userPromise={fetchUserPromise} />
</Suspense>
```
*Notice: Replaces traditional `useEffect` + `useState` + `isLoading` data fetching spaghetti!*

### Pattern 2: Reading Context Conditionally (Inside IF blocks & Loops)
```jsx
function Banner({ showAdvanced }) {
  if (showAdvanced) {
    // ✨ Legal in React 19! (Illegal with traditional useContext)
    const settings = use(SettingsContext);
    return <p>{settings.advancedMode}</p>;
  }
  return <p>Standard Mode</p>;
}
```

---

## ⚠️ Common Mistakes to Avoid
- ❌ **Mistake:** Creating a new promise directly inside the component body on every render (e.g. `use(fetch("/api"))`).
- ✅ **Fix:** Pass a promise created outside render, from a cache, or via a Server Component/state; creating a promise during render causes an infinite fetch loop.
