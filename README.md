# ⚛️ React 16 to 19 Master Lab

A 100% hands-on, code-first interactive playground to brush up from **React 16** to the cutting-edge **React 19**.

No boring video lectures—every hook and concept has its own dedicated folder containing:
1. `README.md` — Full documentation, mental model shift, parameters, and common pitfalls.
2. `BasicExample.jsx` — Simple, focused interactive demo.
3. `AdvancedExample.jsx` — Real-world, robust scenario with error handling, loading states, and UX heuristics.

---

## 🚀 Quick Start

Start the local development server:

```bash
npm run dev
```

Then open the URL in your browser (usually `http://localhost:5173`).

---

## 📚 Curriculum & Directory Structure

```
src/
├── concepts/
│   ├── 01-useState/                # Automatic batching, object state, derived state
│   ├── 02-useEffect/               # Synchronization, socket/listener cleanups
│   ├── 03-useRef/                  # DOM refs, timers, React 19 ref cleanups
│   ├── 04-useContext/              # Direct <Context value=...> without .Provider
│   ├── 05-useReducer/              # Shopping cart & complex state machines
│   ├── 06-useMemo-useCallback/     # Referential stability & React Compiler context
│   ├── 07-useId/                   # Accessible, collision-free ARIA form IDs
│   ├── 08-useTransition/           # Non-blocking rendering & React 19 async actions
│   ├── 09-useDeferredValue/        # Adaptive 60fps search filtering over 5,000 items
│   ├── 10-useSyncExternalStore/    # Tearing-free external subscriptions & store
│   ├── 11-useActionState/          # Native async form actions (no isLoading/try-catch)
│   ├── 12-useFormStatus/           # Deep child buttons inspecting parent form
│   ├── 13-useOptimistic/           # 0ms perceived feedback & auto-rollback on error
│   ├── 14-use-hook/                # use(Promise) with Suspense & conditional context
│   ├── 15-ref-as-prop/             # No more forwardRef! Ref as a standard prop
│   └── 16-document-metadata/       # Native <title> & SEO metadata hoisted to <head>
```

---

## 🎯 How to Learn with This Lab

1. Run `npm run dev` in your terminal.
2. Click through the topics in the interactive sidebar.
3. Switch between **Explanation**, **Basic Example**, and **Advanced Example** tabs.
4. Open the corresponding `.jsx` file in `src/concepts/<folder>` in your code editor.
5. Edit the code, break it, add console logs, and see your changes instantly update via Hot Module Replacement (HMR)!
