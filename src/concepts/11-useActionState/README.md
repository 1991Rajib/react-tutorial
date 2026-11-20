# useActionState Hook (React 19)

## ✍️ How to Import & Call
```javascript
import { useActionState } from 'react';

const [state, formAction, isPending] = useActionState(actionFn, initialState, permalink?);
```

## 📥 Parameters Accepted
1. **`actionFn`** `(previousState, formData) => Promise<any> | any` *(Required)*: The async action function that executes when the form is submitted. Receives the previous state and the submitted `FormData`, and returns the next state.
2. **`initialState`** `any` *(Required)*: The initial state value before the action is ever triggered (e.g. `null` or `{ error: null }`).
3. **`permalink`** `string` *(Optional)*: URL for progressive enhancement before JavaScript loads.

## 📤 Return Values
1. **`state`**: The current/latest value returned by `actionFn` (or `initialState` initially).
2. **`formAction`**: The action handler passed directly to `<form action={formAction}>` or `<button formAction={formAction}>`.
3. **`isPending`** `boolean`: Automatically `true` while the async action is running. Eliminates manual `isLoading` state!

---

## 🛠️ Step-by-Step Implementation Recipe

### Step 1: Write the Async Action Function
```javascript
async function updateUserAction(prevState, formData) {
  const name = formData.get('name');
  const res = await api.updateName(name);
  if (!res.ok) return { error: 'Failed to update' };
  return { success: true, name: res.name };
}
```

### Step 2: Initialize useActionState in your Component
```javascript
const [state, formAction, isPending] = useActionState(updateUserAction, null);
```

### Step 3: Pass formAction Directly to `<form>`
```jsx
<form action={formAction}>
  <input name="name" required disabled={isPending} />
  <button type="submit" disabled={isPending}>
    {isPending ? 'Saving...' : 'Save'}
  </button>
</form>
```
*Notice: No `e.preventDefault()`, no `onSubmit`, and no manual `try/catch`!*

---

## ⚠️ Common Mistakes to Avoid
- ❌ **Mistake:** Forgetting that `actionFn` receives `previousState` as its **first** parameter and `formData` as its **second** parameter.
- ✅ **Fix:** Always declare action functions as `async (prevState, formData) => { ... }`.
