# useFormStatus Hook (React 19)

## ✍️ How to Import & Call
```javascript
import { useFormStatus } from 'react-dom';

const { pending, data, method, action } = useFormStatus();
```

## 📥 Parameters Accepted
*None.* `useFormStatus` takes no arguments.

## 📤 Return Values
1. **`pending`** `boolean`: `true` if the enclosing parent `<form>` is currently executing its action.
2. **`data`** `FormData | null`: The `FormData` instance currently being submitted by the parent form.
3. **`method`** `string | null`: The HTTP method of the parent form (`"get"` or `"post"`).
4. **`action`** `Function | string | null`: Reference to the action passed to the parent form.

---

## 🛠️ Step-by-Step Implementation Recipe

### Step 1: Create a Decoupled Child Component
```jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting... ⏳' : 'Submit'}
    </button>
  );
}
```

### Step 2: Render it INSIDE a `<form>`
```jsx
function MyForm() {
  return (
    <form action={myAction}>
      <input name="email" />
      <SubmitButton /> {/* Works because it is rendered inside <form>! */}
    </form>
  );
}
```

---

## ⚠️ The Golden Rule / Common Mistake
- ❌ **Mistake:** Calling `useFormStatus` inside the same component that renders the `<form>`.
  ```jsx
  // ❌ WRONG:
  function MyForm() {
    const { pending } = useFormStatus(); // Always undefined/false!
    return <form action={...}>...</form>;
  }
  ```
- ✅ **Fix:** `useFormStatus` acts like a Context reader. You **MUST** call it from a child component that is rendered *inside* the `<form>` tag.
