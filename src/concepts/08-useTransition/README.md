# useTransition Hook (React 18 & 19)

## ✍️ How to Import & Call
```javascript
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();
```

## 📥 Parameters Accepted
*None.* `useTransition` takes no arguments.

## 📤 Return Values
1. **`isPending`** `boolean`: `true` while the background transition is actively rendering or while an async action is in flight.
2. **`startTransition`** `(callback: () => void | Promise<void>) => void`: Function that marks state updates inside it as non-urgent transitions. In React 19, natively supports `async` functions!

---

## 🛠️ Step-by-Step Implementation Recipe

### Step 1: Initialize the Hook
```javascript
const [isPending, startTransition] = useTransition();
```

### Step 2: Wrap Non-Urgent Updates in `startTransition`
```javascript
const handleTabChange = (nextTab) => {
  startTransition(() => {
    // Non-urgent: React renders this tab in the background without freezing user typing or clicks
    setCurrentTab(nextTab);
  });
};
```

### Step 3: React 19 Async Transitions
```javascript
startTransition(async () => {
  const result = await api.saveProfile(data);
  setProfile(result);
});
```

---

## ⚠️ Common Mistakes to Avoid
- ❌ **Mistake:** Wrapping text input typing state (`e.target.value`) inside `startTransition`.
- ✅ **Fix:** Keep text inputs urgent so typing feels responsive. Only wrap the heavy consequence (e.g. filtering a 10,000 item table).
