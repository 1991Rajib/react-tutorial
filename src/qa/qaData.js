export const REACT_QA_LIST = [
  // --- CATEGORY 1: CORE FUNDAMENTALS ---
  {
    id: 'q1',
    category: 'Core Fundamentals',
    question: 'What is the Virtual DOM, and how does the Reconciliation (Fiber) algorithm work?',
    answer: `The Virtual DOM (VDOM) is a lightweight JavaScript object representation of the real DOM kept in memory.

When a component's state or props change:
1. Render Phase: React calls the component to construct a new Virtual DOM tree.
2. Diffing (Reconciliation): React compares the new Virtual DOM tree with the previous Virtual DOM snapshot using its Fiber reconciler.
3. Commit Phase: React calculates the minimum necessary real DOM mutations and applies them synchronously in one efficient batch.

Why Fiber?
In React 16+, the Fiber architecture turned rendering from a rigid, synchronous recursive tree walk into an interruptible work loop. This allows modern React (18 & 19) to pause low-priority work (like transitions) when high-priority work (like user typing) arrives.`,
  },
  {
    id: 'q2',
    category: 'Core Fundamentals',
    question: 'Why is the "key" prop required in lists, and why is using the array index as a key an anti-pattern?',
    answer: `The "key" prop tells React which items in a list have been added, removed, or reordered between renders.

Why using index as a key is dangerous:
If you insert or delete an item in the middle of a list, every item below it gets a new index. React will mistakenly think the old item at that index merely changed its props rather than knowing an item was inserted or deleted!

Negative Consequences:
1. Component local state (like input values or animations) sticks to the wrong items.
2. Serious performance degradation because React re-renders every item instead of just inserting one DOM node.

Rule: Always use stable, unique IDs (such as database item.id or uuid), never array indices.`,
  },
  {
    id: 'q3',
    category: 'Core Fundamentals',
    question: 'What is a Stale Closure in React hooks, and how do you prevent it?',
    answer: `A stale closure occurs when a callback or effect captures variables from an older render pass, and continues using those outdated values after state has changed.

Classic Example:
const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    // ❌ Stale closure! count is permanently 0 from the initial render!
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []); // empty deps

How to fix it:
1. Use functional updates: setCount(prev => prev + 1); (Reads the guaranteed latest state at execution time).
2. Add necessary dependencies to the dependency array.
3. If storing mutable values without re-rendering, use a useRef.`,
  },
  {
    id: 'q4',
    category: 'Core Fundamentals',
    question: 'What are Controlled vs Uncontrolled Components, and which should you choose in enterprise forms?',
    answer: `• Controlled Components:
The input's value is driven by React state: <input value={text} onChange={e => setText(e.target.value)} />.
Pros: Single source of truth, immediate validation, instant disabled buttons.
Cons: Every keystroke triggers a component re-render. In a 50-field enterprise form, this can cause visible typing lag.

• Uncontrolled Components:
The DOM holds the input value, and React reads it on demand via a ref or FormData: <input ref={inputRef} defaultValue="initial" />.
Pros: Zero re-renders while the user is typing (blazing fast).
Cons: Harder to do instant per-character UI changes.

Enterprise Recommendation:
Libraries like React Hook Form combine the best of both worlds: they use uncontrolled inputs under the hood for 60fps typing performance, while exposing a clean API for validation.`,
  },

  // --- CATEGORY 2: REACT 18 & 19 CONCURRENCY ---
  {
    id: 'q5',
    category: 'React 18 & 19 Concurrency',
    question: 'What is Automatic Batching, and how does it differ from React 16?',
    answer: `Batching is when React groups multiple state updates into a single re-render pass for better performance.

• In React 16:
React ONLY batched state updates inside native synthetic event handlers (like onClick). If you had multiple setState calls inside a setTimeout, a Promise.then, or a native addEventListener, React would trigger a full separate re-render for EVERY single setState!

• In React 18 & 19:
Automatic Batching is enabled everywhere by default. Whether state updates occur inside fetch promises, setTimeout, or event listeners, React automatically bundles them into one single render.

If you ever need to opt-out and force an immediate synchronous render, React provides flushSync(() => { ... }).`,
  },
  {
    id: 'q6',
    category: 'React 18 & 19 Concurrency',
    question: 'What is Concurrent React, and what problem does it solve?',
    answer: `Before React 18, rendering was synchronous and blocking: once React started rendering a component tree, it could not stop until it finished. If rendering took 150ms, the browser completely froze—user typing, clicks, and animations lagged.

Concurrent React makes rendering INTERRUPTIBLE.
React can:
1. Start rendering an update in memory.
2. Pause rendering midway if a high-priority event (like the user typing into an input) occurs.
3. Handle the urgent keystroke immediately so typing feels instant.
4. Resume, discard, or restart the background low-priority work.

Hooks enabled by Concurrency: useTransition, useDeferredValue, and Suspense.`,
  },
  {
    id: 'q7',
    category: 'React 18 & 19 Concurrency',
    question: 'How does useActionState revolutionize form handling in React 19?',
    answer: `In React 16-18, building an async form required substantial manual boilerplate:
- const [loading, setLoading] = useState(false);
- const [error, setError] = useState(null);
- const [result, setResult] = useState(null);
- e.preventDefault() in onSubmit
- try / catch / finally blocks

In React 19, useActionState replaces ALL of this in 1 clean line:
const [state, formAction, isPending] = useActionState(myAsyncAction, initialState);

Benefits:
1. Native integration with <form action={formAction}> without e.preventDefault().
2. isPending is automatically true while the async promise is unresolved.
3. Automatically works with React Transitions.
4. Error states and return values are unified in state.`,
  },
  {
    id: 'q8',
    category: 'React 18 & 19 Concurrency',
    question: 'What is useFormStatus, and why must it be called from inside a child component?',
    answer: `useFormStatus gives child components access to the pending status, submitted data, and action of the parent <form> without any prop drilling.

Golden Rule:
useFormStatus MUST be called from a child component rendered INSIDE the <form>, not in the same component that creates the <form>.

Why?
useFormStatus functions like a Context reader. The <form> element provides the status context down its subtree. A component cannot read a context that is provided by its own JSX return statement; only children rendered inside that provider can read it!`,
  },
  {
    id: 'q9',
    category: 'React 18 & 19 Concurrency',
    question: 'What is Optimistic UI, and how does useOptimistic handle network errors?',
    answer: `Optimistic UI means immediately updating the screen as if a server action has already succeeded (0ms perceived latency), while the actual HTTP request travels across the network in the background.

With useOptimistic:
const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes, (current, val) => current + val);

What happens if the server fails?
If the background server action throws an error or rejects, React AUTOMATICALLY rolls back optimisticLikes to the verified actual state!
Developers do not need to write manual revert logic or state snapshots.`,
  },
  {
    id: 'q10',
    category: 'React 18 & 19 Concurrency',
    question: 'How does the use() hook break the traditional "Rules of Hooks"?',
    answer: `Traditional hooks (useState, useEffect, useContext) have strict rules:
1. Must be called at the very top level.
2. Cannot be called inside if statements, switch statements, or loops.
3. Cannot be called after an early return.

The new use() API in React 19 is a primitive, not a standard hook:
1. It CAN be called conditionally inside if statements!
   if (isAdmin) { const config = use(AdminContext); }
2. It can read PROMISES directly in render when combined with <Suspense>.
   const data = use(fetchPromise); // React suspends until resolved!

This eliminates traditional useEffect data fetching patterns.`,
  },

  // --- CATEGORY 3: MNC & BIG 4 SCENARIO-BASED ---
  {
    id: 'q11',
    category: 'MNC & Big 4 Scenario-Based',
    question: '[Deloitte / Accenture] "A dashboard with a large table and 10 search/filter inputs lags heavily every time a user types. How do you diagnose and fix it?"',
    answer: `Step 1: Diagnostics (Never guess, always measure):
- Open React DevTools Profiler to record an interaction. Check flame graphs to see which components are re-rendering and why ("Why did this render?").
- Open Chrome DevTools Performance tab to inspect Long Tasks (tasks blocking main thread > 50ms).

Step 2: Root Cause Analysis:
Typing into an input triggers a state update on every keystroke in the parent container. Because the parent re-renders, the entire heavy table re-renders, recalculating rows and blocking the typing animation.

Step 3: Fixes (Layered Strategy):
1. State Colocation / Moving State Down: Move the input's local text state inside the input component itself so parent does not re-render on every keystroke.
2. React 18/19 useDeferredValue:
   const deferredQuery = useDeferredValue(query);
   The input updates at 60fps; the heavy table consumes deferredQuery without blocking the main thread.
3. Virtualization (Windowing): If the table has 500+ rows, render only the rows currently visible in the viewport using react-window or @tanstack/react-virtual.
4. Memoization: Wrap table rows in React.memo and filter computations in useMemo.`,
  },
  {
    id: 'q12',
    category: 'MNC & Big 4 Scenario-Based',
    question: '[PwC / EY] "What is an Asynchronous Race Condition in search inputs, and how do you resolve it?"',
    answer: `The Problem:
A user types "cat", firing API Request #1.
The user immediately adds "s" to search "cats", firing API Request #2.
Because network packets travel unpredictably, Request #1 ("cat") might take 800ms while Request #2 ("cats") takes 200ms.
Request #2 arrives first and displays "cats" results.
600ms later, Request #1 arrives and overwrites the screen with "cat" results! The screen now shows the wrong data for what is typed in the search bar.

How to Fix:
1. AbortController (Standard Browser API):
   useEffect(() => {
     const controller = new AbortController();
     fetch(\`/api/search?q=\${query}\`, { signal: controller.signal })
       .then(res => res.json())
       .then(data => setResults(data))
       .catch(err => { if (err.name !== 'AbortError') console.error(err); });

     return () => controller.abort(); // Cancels previous pending request!
   }, [query]);

2. In modern React: Use TanStack React Query or SWR, which handle automatic cancellation, deduplication, and stale-while-revalidate out of the box.`,
  },
  {
    id: 'q13',
    category: 'MNC & Big 4 Scenario-Based',
    question: '[KPMG / Google] "A user clicks a \'Pay Now\' or \'Submit\' button multiple times rapidly, causing duplicate transactions. How do you prevent this on the client?"',
    answer: `Defensive Architecture Strategy:

1. Immediate UI Disabling (React 19 useActionState / useFormStatus):
   In React 19, the submit button is automatically disabled via useFormStatus:
   const { pending } = useFormStatus();
   <button disabled={pending}>{pending ? 'Processing...' : 'Pay Now'}</button>
   This prevents duplicate clicks before the first request finishes.

2. Idempotency Key (Critical for Financial Transactions):
   Generate a unique UUID client-side when the checkout page loads:
   const idempotencyKey = useRef(crypto.randomUUID()).current;
   Send this key in the request header: 'X-Idempotency-Key': idempotencyKey.
   If duplicate requests reach the backend, the payment gateway checks the key and ensures the credit card is charged only once!

3. Single-Flight Promise Lock:
   Store an isSubmittingRef.current flag. If clicked while true, return early immediately.`,
  },
  {
    id: 'q14',
    category: 'MNC & Big 4 Scenario-Based',
    question: '[Deloitte / TCS] "Your production React application takes 7 seconds to load on mobile devices due to a massive bundle. How do you optimize it?"',
    answer: `Systematic Optimization Plan:

1. Bundle Inspection:
   Run vite-bundle-visualizer or source-map-explorer to identify largest bloat dependencies (e.g. lodash full import vs lodash-es, moment.js vs date-fns).

2. Route-Based Code Splitting (Lazy Loading):
   Replace eager page imports with React.lazy and Suspense:
   const Dashboard = React.lazy(() => import('./pages/Dashboard'));
   const Settings = React.lazy(() => import('./pages/Settings'));
   Users only download JavaScript for the route they actually visit.

3. Component-Level Lazy Loading:
   Lazy load heavy subtrees that are hidden on initial load (e.g., Modals, PDF generators, Rich Text Editors, Chart widgets):
   {showModal && <Suspense fallback={<Spinner />}><LazyModal /></Suspense>}

4. Modern Asset Delivery:
   - Convert images to WebP/AVIF format.
   - Use dynamic font loading with font-display: swap.
   - Serve static assets via a CDN with Brotli compression and HTTP/2 or HTTP/3.`,
  },
  {
    id: 'q15',
    category: 'MNC & Big 4 Scenario-Based',
    question: '[EY / Amazon] "An API call in a useEffect causes an infinite re-render loop. How did this happen, and how do you fix it?"',
    answer: `The Root Cause:
useEffect(() => {
  fetchData().then(data => setData(data));
}, [data]); // ❌ Infinite loop!

Why it loops:
1. Component mounts -> useEffect runs.
2. fetchData() resolves -> setData(data) is called.
3. State update triggers a component re-render.
4. Because 'data' changed, useEffect runs again.
5. Loop continues forever, crashing browser CPU!

Other subtle causes:
- Passing an unmemoized object or array to the dependency array:
  const filterOptions = { status: 'active' }; // new object reference {} every render!
  useEffect(..., [filterOptions]); // runs every render!

The Fix:
1. Only include true primitive dependencies or stabilize objects/functions with useMemo and useCallback.
2. If fetching on mount, leave dependency array empty: [].
3. In React 19, replace useEffect data fetching with use(promise) + Suspense.`,
  },
  {
    id: 'q16',
    category: 'MNC & Big 4 Scenario-Based',
    question: '[Meta / Microsoft] "A third-party chart library crashes at runtime with a null pointer. Instead of crashing the entire React app with a white screen, how do you handle it?"',
    answer: `The Solution: Error Boundaries

By default, an unhandled JavaScript runtime error during render unmounts the entire React component tree, leaving the user with a blank white screen.

How Error Boundaries work:
An Error Boundary is a component that implements:
1. static getDerivedStateFromError(error): Renders a fallback UI (e.g., "Chart could not be loaded. [Retry]").
2. componentDidCatch(error, errorInfo): Logs the crash stack trace to an observability platform (like Sentry, Datadog, or New Relic).

Best Practice (Granular Boundaries):
Do not wrap only the root <App />!
Wrap individual isolated widgets:
<Layout>
  <Sidebar />
  <ErrorBoundary fallback={<WidgetErrorFallback />}>
    <ThirdPartyChart />
  </ErrorBoundary>
</Layout>
If the chart crashes, the rest of the application remains fully functional and clickable!`,
  },

  // --- CATEGORY 4: ENTERPRISE ARCHITECTURE & SYSTEM DESIGN ---
  {
    id: 'q17',
    category: 'Enterprise Architecture & System Design',
    question: 'When should you choose Context API vs External State Management (Zustand, Redux Toolkit, TanStack Query)?',
    answer: `Architecture Decision Matrix:

1. React Context API:
- Best for: Low-frequency, global app settings (Theme, Localization, Authenticated User Session).
- Major Drawback: Context has NO selector mechanism. When ANY value inside the context changes, EVERY component that calls useContext() re-renders, even if it only uses an unchanged slice!

2. Zustand / Redux Toolkit:
- Best for: High-frequency, complex client state (Audio players, canvas drawing apps, multi-window dashboards).
- Superpower: Supports fine-grained selectors (const volume = useStore(s => s.volume)). Components only re-render when their specific subscribed slice changes!

3. TanStack Query (React Query) / SWR:
- Best for: SERVER STATE (Data fetched from APIs).
- Superpower: Handles caching, background refetching, pagination, retry on failure, and garbage collection.
- Enterprise Rule: Keep Server State (API data) in TanStack Query, and Client State (Modals, toggles) in Zustand/useState. Do not duplicate API data in Redux!`,
  },
  {
    id: 'q18',
    category: 'Enterprise Architecture & System Design',
    question: 'What are React Server Components (RSCs), and how do they differ from traditional Client Components and SSR?',
    answer: `• Traditional Client-Side Rendering (CSR):
Browser downloads an empty HTML file + a massive JS bundle, then executes JS to render the entire UI.

• Traditional Server-Side Rendering (SSR):
Server renders the initial HTML and sends it to the browser for instant first paint. BUT the browser still downloads the entire JS bundle and must "hydrate" every single DOM node before anything is interactive.

• React Server Components (RSCs - React 19 / Next.js):
RSCs execute EXCLUSIVELY on the server and NEVER send their JavaScript to the client!
Key Benefits:
1. Zero Bundle Size: Heavy packages (e.g. markdown parsers, syntax highlighters) stay on the server. Client bundle size is 0 KB for that component!
2. Direct Backend Access: Can read database or file system directly inside the component without creating REST/GraphQL endpoints.
3. Client Components ('use client'): Used strictly for interactive parts (onClick, useState, browser APIs).`,
  },
  {
    id: 'q19',
    category: 'Enterprise Architecture & System Design',
    question: 'How would you architect a real-time collaborative application (like Google Docs or Figma) in React?',
    answer: `Architecture Blueprint:

1. Communication Layer:
- Persistent WebSocket connection (or WebRTC for peer-to-peer latency).
- Protocol: Binary protocol (Protobuf) or JSON-RPC.

2. State Synchronization:
- CRDTs (Conflict-free Replicated Data Types like Yjs or Automerge) to handle concurrent edits without server lock-ups.

3. High-Frequency Event Optimization:
- Mouse cursor movements or drag events fire 60-120 times/sec.
- Throttling: Use requestAnimationFrame to batch cursor updates rather than updating React state 120 times/sec.
- Bypass React State for Canvas: For real-time canvas dragging, manipulate the HTML5 Canvas or WebGL context directly, keeping React for the surrounding UI toolbar.

4. Optimistic Updates:
- Use React 19's useOptimistic to show local edits immediately with auto-rollback on conflict.`,
  },
  {
    id: 'q20',
    category: 'Enterprise Architecture & System Design',
    question: 'What is the "Compound Component" pattern, and why is it preferred for enterprise design systems?',
    answer: `The Compound Component pattern allows multiple components to work together implicitly to share state without prop drilling.

Example from HTML:
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
<select> manages the selected value, while <option> knows whether it is selected without passing props.

In React Design Systems:
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Security</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Account details...</Tabs.Content>
  <Tabs.Content value="tab2">Security settings...</Tabs.Content>
</Tabs>

Why Enterprise Teams Love It:
1. Maximum Flexibility: Consumers can reorder triggers, insert custom icons or dividers anywhere without breaking functionality.
2. No Prop Explosions: Avoids monolithic components with 25 props like <Tabs tab1Label="..." tab2Label="..." showIcons={true} />.`,
  },

  // --- CATEGORY 5: PERFORMANCE & OPTIMIZATION ---
  {
    id: 'q21',
    category: 'Performance & Optimization',
    question: 'Can useMemo and useCallback actually HURT performance? When should you avoid them?',
    answer: `YES! useMemo and useCallback are not free—they carry their own computational and memory overhead.

Why they can hurt performance:
1. Memory Overhead: React must allocate memory to store the cached value/function and the previous dependency array.
2. Comparison Overhead: On every single render, React iterates through the dependency array comparing every element (prevDeps[i] === nextDeps[i]).
3. Unnecessary for Cheap Operations:
   // ❌ BAD: Array has 10 items. Shallow comparing deps is SLOWER than doing the map!
   const doubled = useMemo(() => items.map(x => x * 2), [items]);

When to Avoid:
- Primitive operations (basic math, string concatenation, small array filters under 200 items).
- When the component re-renders very rarely anyway.
- When props change on almost every render (the memo cache misses every time).

When to Use:
- Heavy calculations (filtering/sorting 5,000+ items).
- Referential stability when passing callbacks to React.memo wrapped child components.`,
  },
  {
    id: 'q22',
    category: 'Performance & Optimization',
    question: 'What is "Moving State Down" (State Colocation), and why is it better than memoization?',
    answer: `State Colocation means placing state as close as possible to the component that actually uses it, rather than keeping it at the top of the tree.

Anti-Pattern:
function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <HeavyAnalyticsGraph /> {/* Re-renders every time modal opens! */}
      <ComplexDataTable />    {/* Re-renders every time modal opens! */}
      <button onClick={() => setModalOpen(true)}>Open Help</button>
      {modalOpen && <HelpModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

The Fix (Move State Down):
function HelpButtonWithModal() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setModalOpen(true)}>Open Help</button>
      {modalOpen && <HelpModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

Now, opening the modal only re-renders HelpButtonWithModal!
HeavyAnalyticsGraph and ComplexDataTable never re-render—with ZERO useMemo, ZERO useCallback, and ZERO React.memo!`,
  },
  {
    id: 'q23',
    category: 'Performance & Optimization',
    question: 'What is the React Compiler (React Forget), and will it replace useMemo, useCallback, and React.memo?',
    answer: `The React Compiler is an optimizing compiler developed by the React Core team at Meta.

The Problem it Solves:
In traditional React, developers spend thousands of hours writing manual dependency arrays for useMemo, useCallback, and React.memo, often introducing bugs (stale closures) or premature optimizations.

How the React Compiler Works:
During your build step (via Babel or Vite plugin), the compiler automatically analyzes JavaScript syntax trees and memos:
1. Caches component return values if props have not changed (automates React.memo).
2. Caches computed expressions (automates useMemo).
3. Caches function declarations (automates useCallback).

Will it replace them?
YES! In compiler-enabled React codebases, you write plain, idiomatic JavaScript without worrying about dependency arrays or memoization wrappers.`,
  },
  {
    id: 'q24',
    category: 'Performance & Optimization',
    question: 'Why is React Strict Mode double-mounting components in development, and what bugs does it catch?',
    answer: `In development mode, React StrictMode intentionally mounts, unmounts, and re-mounts every component (calling effects twice: mount -> cleanup -> mount).

Why does it do this?
To help developers catch:
1. Missing cleanup functions in useEffect (e.g. unclosed WebSockets, dangling event listeners, uncleared timers).
2. Side-effects running inside the render phase (render functions must be pure!).
3. Broken assumptions that components will only ever mount once.

In production mode, StrictMode does NOT double-mount. It is strictly a development diagnostic tool.`,
  },
  {
    id: 'q25',
    category: 'Performance & Optimization',
    question: 'What is "Tearing" in Concurrent React, and how does useSyncExternalStore prevent it?',
    answer: `What is Tearing?
In visual graphics and UI, "tearing" means showing two conflicting states on the screen at the same moment.
In Concurrent React, React can pause rendering a component tree to handle an urgent user input, then resume. If an external store (like Redux, Zustand, or window.innerWidth) updates while rendering is paused:
- Component A (rendered before pause) displays Value 1.
- Component B (rendered after pause) displays Value 2.
The screen shows inconsistent, mismatched data!

How useSyncExternalStore Fixes It:
useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) forces React to synchronously read from external stores, guaranteeing zero tearing across concurrent renders.
It is the standard foundation for all modern state libraries.`,
  },
];
