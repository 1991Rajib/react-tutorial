# useDeferredValue Hook (React 18 & 19)

## ✍️ How to Import & Call
```javascript
import { useDeferredValue } from 'react';

const deferredValue = useDeferredValue(value, initialValue?);
```

## 📥 Parameters Accepted
1. **`value`** `any` *(Required)*: The value you want to defer (e.g. search input text, filter query, or prop).
2. **`initialValue`** `any` *(Optional, React 19+)*: Optional initial value used during the first render of the component.

## 📤 Return Values
1. **`deferredValue`** `any`: A version of the value that lags behind the current value during heavy renders, keeping user inputs responsive.

---

## 🛠️ Step-by-Step Implementation Recipe

### Step 1: Store Immediate Input in State and Defer It
```javascript
const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);
```

### Step 2: Pass `deferredQuery` to the Heavy List or Chart
```jsx
<input value={query} onChange={e => setQuery(e.target.value)} />
<div style={{ opacity: query !== deferredQuery ? 0.6 : 1 }}>
  <HeavyList filter={deferredQuery} />
</div>
```
*Notice: Dimming the list with opacity when `query !== deferredQuery` signals to the user that fresh data is calculating in the background.*

---

## ⚠️ Common Mistakes to Avoid
- ❌ **Mistake:** Using `useDeferredValue` as a replacement for debouncing network requests.
- ✅ **Fix:** `useDeferredValue` defers React RENDERING, not network requests. For API search calls, debounce or use `AbortController`.
