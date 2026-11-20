# useOptimistic Hook (React 19)

## ✍️ How to Import & Call
```javascript
import { useOptimistic } from 'react';

const [optimisticState, setOptimistic] = useOptimistic(passthroughState, updateFn);
```

## 📥 Parameters Accepted
1. **`passthroughState`** `any` *(Required)*: The actual, verified state returned from the server or `useState`.
2. **`updateFn`** `(currentState, optimisticValue) => nextOptimisticState` *(Required)*: Pure function that takes the current state and the value passed to `setOptimistic`, and returns the temporary optimistic state.

## 📤 Return Values
1. **`optimisticState`** `any`: The temporary optimistic state shown immediately (0ms latency). If the underlying action fails or throws an error, React **automatically rolls back** to `passthroughState`!
2. **`setOptimistic`** `(optimisticValue: any) => void`: Function used to trigger the temporary optimistic state update immediately.

---

## 🛠️ Step-by-Step Implementation Recipe

### Step 1: Initialize actual state and wrap with useOptimistic
```javascript
const [likes, setLikes] = useState(42);

const [optimisticLikes, setOptimisticLikes] = useOptimistic(
  likes,
  (currentLikes, amount) => currentLikes + amount
);
```

### Step 2: Trigger optimistic update inside an async transition or form action
```javascript
const handleLike = () => {
  startTransition(async () => {
    // 1. Instant UI update (0ms perceived latency!)
    setOptimisticLikes(1);

    try {
      // 2. Background server sync
      const verifiedLikes = await api.upvote();
      setLikes(verifiedLikes);
    } catch (err) {
      // 3. On error, React AUTOMATICALLY rolls back optimisticLikes to likes!
      console.error(err);
    }
  });
};
```

---

## ⚠️ Common Mistakes to Avoid
- ❌ **Mistake:** Calling `setOptimistic` outside a `startTransition` or form action.
- ✅ **Fix:** `setOptimistic` must be called inside a Transition or an Action to allow React to link the temporary state to the async lifecycle.
