# Ref as Prop & Ref Cleanups (React 19)

## ✍️ How to Write It
In React 19, `ref` is a standard prop. You no longer need `React.forwardRef()`!

```jsx
// React 19: Plain function component accepting `ref` prop directly!
function CustomInput({ ref, label, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
}
```

## 📥 Parameters & Props
- **`ref`**: Passed directly into props like any other prop (`{ ref, label }`).

---

## 🛠️ Ref Callback Cleanups (New in React 19)
When passing a callback function to `ref`, you can return a cleanup function that automatically executes when the element detaches/unmounts:

```jsx
<div ref={(node) => {
  if (!node) return;
  const observer = new ResizeObserver((entries) => { ... });
  observer.observe(node);

  // Return cleanup function (New in React 19!):
  return () => {
    observer.disconnect();
  };
}} />
```

---

## ⚠️ Common Mistakes to Avoid
- ❌ **Mistake:** Continuing to wrap functional components with `React.forwardRef` in React 19.
- ✅ **Fix:** `forwardRef` is legacy. Simply accept `ref` in your component's props argument.
