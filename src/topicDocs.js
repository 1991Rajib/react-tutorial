export const TOPIC_DOCS = {
  '01-useState': {
    title: 'useState: State & Batching',
    version: 'React 16+',
    importSnippet: `import { useState } from 'react';`,
    signature: `const [state, setState] = useState(initialState);`,
    parameters: [
      {
        name: 'initialState',
        type: 'any | () => any',
        required: true,
        description: 'The initial value you want the state to have. Can be a value (0, "text", false, { ... }) or a lazy initializer function (() => computeHeavyInitialValue()) that only runs on initial render.',
      },
    ],
    returns: [
      {
        name: 'state',
        type: 'any',
        description: 'The current state value. On initial render, it matches initialState. On subsequent renders, it holds the most recent updated value.',
      },
      {
        name: 'setState',
        type: '(nextState | (prevState => nextState)) => void',
        description: 'Function used to update the state and trigger a component re-render. Can receive a direct value or a functional update callback.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Import the hook at the top of your component file',
        code: `import { useState } from 'react';`,
        explanation: 'Always import from "react". Do not import inside functions.',
      },
      {
        step: 2,
        title: 'Call useState inside your component body',
        code: `const [count, setCount] = useState(0);`,
        explanation: 'Destructure the array into the state value and its matching "set" setter function.',
      },
      {
        step: 3,
        title: 'Update state using a direct value or functional updater',
        code: `// Direct value:
setCount(5);

// Functional updater (Best practice when new state depends on previous):
setCount(prev => prev + 1);`,
        explanation: 'Functional updates protect against race conditions and multiple rapid state updates.',
      },
    ],
    whyItMatters: 'useState allows components to hold, remember, and update their own local values across renders.',
    react16VsModern: `• In React 16: Multiple setState calls inside setTimeout or fetch did NOT batch together, triggering duplicate render cycles.
• In React 18 & 19: Automatic Batching is universal. Multiple state updates are batched into a single render pass regardless of where they are called.
• Modern Rule: Never put derived state into state or sync it with useEffect. Compute it during render!`,
    commonMistakes: [
      {
        mistake: 'Mutating state directly (e.g. count++ or user.name = "John").',
        solution: 'Always pass a new value or object (e.g. setUser({ ...user, name: "John" })). React uses Object.is shallow comparison to detect changes.',
      },
      {
        mistake: 'Putting derived calculations in state and syncing them via useEffect.',
        solution: 'Calculate derived values on the fly during render (e.g. const fullName = `${first} ${last}`).',
      },
    ],
    keyTakeaway: 'Always use functional updates (setCount(prev => prev + 1)) when the new value depends on the previous value.',
  },

  '02-useEffect': {
    title: 'useEffect: Synchronization, Not Lifecycle',
    version: 'React 16+',
    importSnippet: `import { useEffect } from 'react';`,
    signature: `useEffect(setupFunction, dependencyArray?);`,
    parameters: [
      {
        name: 'setupFunction',
        type: '() => void | (() => void)',
        required: true,
        description: 'The function containing your side-effect logic (e.g. attaching listeners, timers, sockets). Can optionally return a cleanup function.',
      },
      {
        name: 'dependencyArray',
        type: 'any[] (optional)',
        required: false,
        description: 'List of reactive values (props, state) referenced inside the effect. If omitted, runs after every render. If [], runs only on mount and unmount. If [a, b], runs when a or b changes.',
      },
    ],
    returns: [
      {
        name: 'undefined',
        type: 'void',
        description: 'useEffect does not return anything to the component.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Import useEffect',
        code: `import { useEffect } from 'react';`,
        explanation: 'Import from "react".',
      },
      {
        step: 2,
        title: 'Write setup logic and return a cleanup function',
        code: `useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  // Return cleanup function:
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Empty array = mount / unmount only`,
        explanation: 'The cleanup function runs when the component unmounts and before the effect re-runs with new dependencies.',
      },
    ],
    whyItMatters: 'useEffect connects your component to external systems like browser events, timers, or sockets.',
    react16VsModern: `• In React 16: Treated as a direct replacement for componentDidMount/Update/Unmount. This caused heavy abuse for data fetching and syncing state.
• In React 19:
  1. Do NOT use useEffect for data fetching (use the use() hook with Suspense).
  2. Do NOT use useEffect for user click actions (keep them in event handlers).
  3. Always return a cleanup function to prevent memory leaks.`,
    commonMistakes: [
      {
        mistake: 'Omitting referenced variables from the dependency array.',
        solution: 'Include every state or prop used inside the effect, or refactor to avoid referencing them.',
      },
      {
        mistake: 'Forgetting cleanup functions on subscriptions, event listeners, or intervals.',
        solution: 'Always return a function () => { cleanup(); } to prevent memory leaks.',
      },
    ],
    keyTakeaway: 'Effects are for synchronization with external non-React systems. If you can compute it during render, you do not need an effect.',
  },

  '03-useRef': {
    title: 'useRef: DOM References & Mutable Values',
    version: 'React 16 / 19',
    importSnippet: `import { useRef } from 'react';`,
    signature: `const ref = useRef(initialValue);`,
    parameters: [
      {
        name: 'initialValue',
        type: 'any',
        required: true,
        description: 'The initial value stored on the ref object. Typically null when referencing a DOM element, or a number/timer ID for mutable values.',
      },
    ],
    returns: [
      {
        name: 'refObject',
        type: '{ current: any }',
        description: 'An object with a single mutable property: .current. Mutating ref.current does NOT trigger a component re-render.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Create the ref object',
        code: `const inputRef = useRef(null);`,
        explanation: 'Initializes inputRef with { current: null }.',
      },
      {
        step: 2,
        title: 'Attach the ref to a JSX element',
        code: `<input ref={inputRef} type="text" />`,
        explanation: 'React assigns the native DOM node to inputRef.current once mounted.',
      },
      {
        step: 3,
        title: 'Access or manipulate .current in event handlers',
        code: `const handleFocus = () => {
  inputRef.current?.focus();
};`,
        explanation: 'Always check if .current exists before calling methods on it.',
      },
    ],
    whyItMatters: 'useRef holds a mutable .current reference across renders without triggering a re-render when changed.',
    react16VsModern: `• In React 16: Required React.forwardRef() to pass refs to custom components.
• In React 19:
  1. Functional components accept ref directly as a normal prop!
  2. Ref callbacks can now return cleanup functions that run when the DOM node detaches.`,
    commonMistakes: [
      {
        mistake: 'Reading or writing ref.current during rendering (outside effects or event handlers).',
        solution: 'Only mutate or read ref.current inside event handlers or useEffect.',
      },
    ],
    keyTakeaway: 'Use useRef for direct DOM interactions (focus, scroll, measurements) or timer references.',
  },

  '04-useContext': {
    title: 'useContext: Global State Passing',
    version: 'React 16 / 19',
    importSnippet: `import { createContext, useContext } from 'react';`,
    signature: `const value = useContext(SomeContext);`,
    parameters: [
      {
        name: 'SomeContext',
        type: 'React.Context<T>',
        required: true,
        description: 'The context object created with createContext(defaultValue).',
      },
    ],
    returns: [
      {
        name: 'contextValue',
        type: 'T',
        description: 'The current context value provided by the nearest matching Context Provider above this component in the tree.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Create the Context outside any component',
        code: `export const ThemeContext = createContext('light');`,
        explanation: 'Create a standalone context file or place it above components.',
      },
      {
        step: 2,
        title: 'Provide the context at a higher level',
        code: `// React 19 syntax (no .Provider required!):
<ThemeContext value="dark">
  <App />
</ThemeContext>`,
        explanation: 'In React 19, you can render <ThemeContext value=...> directly without .Provider.',
      },
      {
        step: 3,
        title: 'Consume the context in any child component',
        code: `function Card() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}`,
        explanation: 'Reads the value from the nearest ThemeContext up the tree.',
      },
    ],
    whyItMatters: 'Solves prop drilling by passing state down component subtrees cleanly.',
    react16VsModern: `• In React 16: You had to write <ThemeContext.Provider value={theme}>.
• In React 19: You can render <ThemeContext value={theme}> directly without .Provider!
• In React 19: You can also use use(ThemeContext) conditionally inside if blocks and loops.`,
    commonMistakes: [
      {
        mistake: 'Putting high-frequency state into context (e.g. typing input text).',
        solution: 'Context triggers a re-render for EVERY consumer when any value changes. Keep high-frequency state in local state or dedicated state stores like Zustand.',
      },
    ],
    keyTakeaway: 'Great for app-wide settings (theme, user authentication, locale).',
  },

  '05-useReducer': {
    title: 'useReducer: Complex State Machines',
    version: 'React 16+',
    importSnippet: `import { useReducer } from 'react';`,
    signature: `const [state, dispatch] = useReducer(reducer, initialArg, init?);`,
    parameters: [
      {
        name: 'reducer',
        type: '(state, action) => newState',
        required: true,
        description: 'A pure function that takes the current state and an action object, and returns the next state.',
      },
      {
        name: 'initialArg',
        type: 'any',
        required: true,
        description: 'The initial state value (e.g. { count: 0, items: [] }).',
      },
      {
        name: 'init',
        type: '(initialArg) => initialState (optional)',
        required: false,
        description: 'Optional lazy initialization function for computing the initial state.',
      },
    ],
    returns: [
      {
        name: 'state',
        type: 'any',
        description: 'The current state maintained by the reducer.',
      },
      {
        name: 'dispatch',
        type: '(action) => void',
        description: 'Function used to dispatch an action object (typically { type: "...", payload: ... }) to the reducer.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Define the pure reducer function',
        code: `function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.item] };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}`,
        explanation: 'The reducer must be pure: never mutate state directly; always return a new object.',
      },
      {
        step: 2,
        title: 'Initialize useReducer in your component',
        code: `const [cart, dispatch] = useReducer(cartReducer, { items: [] });`,
        explanation: 'Pass your reducer function and initial state.',
      },
      {
        step: 3,
        title: 'Dispatch actions on user events',
        code: `<button onClick={() => dispatch({ type: 'ADD_ITEM', item: { name: 'Book', price: 15 } })}>
  Add Book
</button>`,
        explanation: 'Calling dispatch passes the action to cartReducer and triggers a re-render with the new state.',
      },
    ],
    whyItMatters: 'Encapsulates complex state logic into a pure reducer function with predictable action dispatches.',
    react16VsModern: `• Perfect alternative to Redux for complex components like e-commerce shopping carts, multi-step wizards, or game state machines.
• Separates "what happened" (actions) from "how the state updates" (reducer).`,
    commonMistakes: [
      {
        mistake: 'Mutating the state argument directly inside the reducer.',
        solution: 'Always return a brand new state object using spread operators or array methods like .map() or .filter().',
      },
    ],
    keyTakeaway: 'Prefer useReducer when state involves multiple related fields or when next state depends on complex conditions.',
  },

  '06-useMemo-useCallback': {
    title: 'useMemo & useCallback: Referential Stability',
    version: 'React 16+',
    importSnippet: `import { useMemo, useCallback } from 'react';`,
    signature: `const memoizedValue = useMemo(() => computeValue(a, b), [a, b]);
const memoizedCallback = useCallback((x) => doSomething(x), [deps]);`,
    parameters: [
      {
        name: 'calculateValue / fn',
        type: '() => any / (...args) => any',
        required: true,
        description: 'For useMemo: a function calculating the expensive value. For useCallback: the function definition you want to cache.',
      },
      {
        name: 'dependencies',
        type: 'any[]',
        required: true,
        description: 'Array of reactive dependencies. Only re-calculates/re-creates when one of these values changes.',
      },
    ],
    returns: [
      {
        name: 'memoizedResult',
        type: 'any / Function',
        description: 'useMemo returns the cached return value. useCallback returns the cached function instance.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Wrap expensive calculations in useMemo',
        code: `const sortedItems = useMemo(() => {
  return items.slice().sort((a, b) => b.price - a.price);
}, [items]);`,
        explanation: 'Only re-runs the sort loop when items changes, not when unrelated state updates.',
      },
      {
        step: 2,
        title: 'Wrap callback functions in useCallback',
        code: `const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(i => i.id !== id));
}, []); // Stable function reference across every render`,
        explanation: 'Keeps the function memory address identical so child components wrapped in React.memo do not re-render.',
      },
    ],
    whyItMatters: 'useMemo caches expensive computation values; useCallback caches function references for React.memo children.',
    react16VsModern: `• In React 16: Required careful manual dependency arrays everywhere to prevent unwanted re-renders.
• Modern Era: The React Compiler automatically memoizes code under the hood! Manual memoization is only needed for genuinely heavy calculations or critical referential stability.`,
    commonMistakes: [
      {
        mistake: 'Using useMemo for cheap operations (e.g. filtering 10 items).',
        solution: 'useMemo has memory and comparison overhead. Only use it when the calculation is measurably slow or passing to memoized children.',
      },
    ],
    keyTakeaway: 'Never optimize prematurely. Simple calculations (e.g. array filters under 500 items) do not need useMemo.',
  },

  '17-memo': {
    title: 'React.memo: Component Memoization',
    version: 'React 16+',
    importSnippet: `import { memo } from 'react';`,
    signature: `const MemoizedComponent = memo(Component, arePropsEqual?);`,
    parameters: [
      {
        name: 'Component',
        type: 'React.ComponentType',
        required: true,
        description: 'The React component you want to memoize.',
      },
      {
        name: 'arePropsEqual',
        type: '(prevProps, nextProps) => boolean (optional)',
        required: false,
        description: 'Optional custom comparison function. Return true to skip rendering, or false to re-render. Defaults to shallow equality (===).',
      },
    ],
    returns: [
      {
        name: 'MemoizedComponent',
        type: 'React.ComponentType',
        description: 'A new component that React skips re-rendering if its props are unchanged.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Wrap your component function in memo',
        code: `import { memo } from 'react';

const UserBadge = memo(function UserBadge({ name, score }) {
  return <div>{name}: {score}</div>;
});`,
        explanation: 'React compares prevProps with nextProps using Object.is shallow comparison.',
      },
      {
        step: 2,
        title: 'Stabilize functions and object props passed to it',
        code: `// In parent component:
const onSelect = useCallback((id) => { ... }, []);
const config = useMemo(() => ({ tier: 'gold' }), []);

<UserBadge onSelect={onSelect} config={config} />`,
        explanation: 'If parent passes an inline () => {} or inline {}, shallow comparison fails and memo does nothing!',
      },
    ],
    whyItMatters: 'Wraps a component to prevent it from re-rendering if its props are shallowly equal (===).',
    react16VsModern: `• In React 16: Heavily used to prevent parent state updates from trickling down to children.
• Critical Requirement: Passing callbacks to memoized components requires useCallback; passing objects/arrays requires useMemo.
• React Compiler Future: With the React Compiler, manual React.memo wrappers are automated under the hood!`,
    commonMistakes: [
      {
        mistake: 'Passing unmemoized inline arrow functions to memoized components.',
        solution: 'Wrap the handler in useCallback or move it outside the component if it does not depend on state.',
      },
    ],
    keyTakeaway: 'Use when a component renders frequently with unchanged props and has a non-trivial render tree.',
  },

  '07-useId': {
    title: 'useId: Accessible Hydration-Safe IDs',
    version: 'React 18+',
    importSnippet: `import { useId } from 'react';`,
    signature: `const id = useId();`,
    parameters: [],
    returns: [
      {
        name: 'id',
        type: 'string',
        description: 'A unique, stable string ID (e.g. ":r1:") that matches on both server and client without hydration collisions.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Call useId inside your accessible form component',
        code: `import { useId } from 'react';

function FormField({ label }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}`,
        explanation: 'The htmlFor on the label matches the id on the input automatically.',
      },
      {
        step: 2,
        title: 'Use suffixes for compound ARIA elements',
        code: `const id = useId();
const hintId = \`\${id}-hint\`;
const errorId = \`\${id}-error\`;

<input id={id} aria-describedby={\`\${hintId} \${errorId}\`} />
<span id={hintId}>Help text</span>
<span id={errorId}>Error message</span>`,
        explanation: 'Generates collision-free IDs for related form inputs, hints, and error alerts.',
      },
    ],
    whyItMatters: 'Generates unique IDs for form labels, hints, and error messages that never clash and match during server hydration.',
    react16VsModern: `• In React 16: Developers used Math.random() or hardcoded IDs, which broke SSR hydration and caused duplicates when a component rendered multiple times.
• In React 18+: useId() is built-in and guaranteed unique per instance.`,
    commonMistakes: [
      {
        mistake: 'Using useId to generate keys in a list (e.g. items.map(item => <li key={useId()}>)).',
        solution: 'Keys should be generated from your data (e.g. item.id). useId is specifically for HTML form accessibility.',
      },
    ],
    keyTakeaway: 'Always pair with htmlFor and aria-describedby for accessible, screen-reader friendly forms.',
  },

  '08-useTransition': {
    title: 'useTransition: Urgent vs Non-Urgent Rendering',
    version: 'React 18 / 19',
    importSnippet: `import { useTransition } from 'react';`,
    signature: `const [isPending, startTransition] = useTransition();`,
    parameters: [],
    returns: [
      {
        name: 'isPending',
        type: 'boolean',
        description: 'True while the background transition is actively rendering or while an async action is in flight.',
      },
      {
        name: 'startTransition',
        type: '(callback: () => void | Promise<void>) => void',
        description: 'Function that marks any state updates inside it as non-urgent transitions. In React 19, supports async functions!',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Call useTransition',
        code: `const [isPending, startTransition] = useTransition();`,
        explanation: 'Provides the pending boolean and the transition wrapper function.',
      },
      {
        step: 2,
        title: 'Wrap non-urgent state updates inside startTransition',
        code: `const handleTabChange = (nextTab) => {
  // Urgent: Immediate feedback if needed
  startTransition(() => {
    // Non-urgent: React renders this in background without freezing UI
    setCurrentTab(nextTab);
  });
};`,
        explanation: 'If user types or clicks again mid-render, React interrupts this transition to handle user input.',
      },
      {
        step: 3,
        title: 'React 19 Async Transitions',
        code: `startTransition(async () => {
  const result = await api.saveProfile(data);
  setProfile(result);
});`,
        explanation: 'In React 19, startTransition natively supports async functions! isPending remains true until the promise resolves.',
      },
    ],
    whyItMatters: 'Marks heavy renders as background transitions so typing, clicking, and animations never freeze or stutter.',
    react16VsModern: `• In React 16: All state updates were urgent. Rendering 5,000 items locked the browser thread and froze user typing.
• In React 18 & 19: React interrupts background transitions whenever the user types or clicks again.
• In React 19: startTransition() natively supports async functions (await)!`,
    commonMistakes: [
      {
        mistake: 'Wrapping text input changes (e.target.value) inside startTransition.',
        solution: 'Keep the text input urgent so typing feels instant. Only wrap the heavy consequence (e.g. filtering a 10,000 item table).',
      },
    ],
    keyTakeaway: 'Wrap tab changes, heavy filters, and page transitions in startTransition to keep the UI at 60fps.',
  },

  '09-useDeferredValue': {
    title: 'useDeferredValue: Adaptive CPU Throttling',
    version: 'React 18 / 19',
    importSnippet: `import { useDeferredValue } from 'react';`,
    signature: `const deferredValue = useDeferredValue(value, initialValue?);`,
    parameters: [
      {
        name: 'value',
        type: 'any',
        required: true,
        description: 'The value you want to defer (e.g. search input text, filter query, or prop).',
      },
      {
        name: 'initialValue',
        type: 'any (optional, React 19+)',
        required: false,
        description: 'Optional initial value used during the first render of the component.',
      },
    ],
    returns: [
      {
        name: 'deferredValue',
        type: 'any',
        description: 'A version of the value that lags behind the current value during heavy renders, keeping user inputs responsive.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Store immediate input in useState and defer it',
        code: `const [query, setQuery] = useState('');
const deferredQuery = useDeferredValue(query);`,
        explanation: 'query updates immediately (60fps); deferredQuery updates when the main thread has free CPU cycles.',
      },
      {
        step: 2,
        title: 'Pass deferredQuery to the heavy list or chart',
        code: `<input value={query} onChange={e => setQuery(e.target.value)} />
<div style={{ opacity: query !== deferredQuery ? 0.6 : 1 }}>
  <HeavyList filter={deferredQuery} />
</div>`,
        explanation: 'Dimming the UI when query !== deferredQuery signals to the user that fresh data is calculating in the background.',
      },
    ],
    whyItMatters: 'Defers updating slow parts of the UI while keeping text inputs instant.',
    react16VsModern: `• Old way: Debounce or throttle with fixed 300ms delay.
• Modern way: Zero fixed delay! Fast computers update immediately; slower computers defer smoothly.
• In React 19: Accepts an optional initialValue parameter for instant first render.`,
    commonMistakes: [
      {
        mistake: 'Using useDeferredValue as a replacement for debouncing network requests.',
        solution: 'useDeferredValue defers React RENDERING, not network requests. For API search calls, debounce or use AbortController.',
      },
    ],
    keyTakeaway: 'Pair with CSS opacity (isStale ? 0.6 : 1) to inform users that fresh data is calculating in the background.',
  },

  '10-useSyncExternalStore': {
    title: 'useSyncExternalStore: Tearing-Free Subscriptions',
    version: 'React 18+',
    importSnippet: `import { useSyncExternalStore } from 'react';`,
    signature: `const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);`,
    parameters: [
      {
        name: 'subscribe',
        type: '(callback: () => void) => () => void',
        required: true,
        description: 'Function that subscribes to the store and returns an unsubscribe cleanup function.',
      },
      {
        name: 'getSnapshot',
        type: '() => any',
        required: true,
        description: 'Function that returns the current snapshot of data from the store. Must return the same reference if nothing changed!',
      },
      {
        name: 'getServerSnapshot',
        type: '() => any (optional)',
        required: false,
        description: 'Function that returns the initial snapshot during Server-Side Rendering (SSR).',
      },
    ],
    returns: [
      {
        name: 'snapshot',
        type: 'any',
        description: 'The current immutable snapshot of the external store.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Define subscribe and getSnapshot functions',
        code: `function subscribeOnline(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getOnlineSnapshot() {
  return navigator.onLine;
}`,
        explanation: 'These functions can be defined outside the component for referential stability.',
      },
      {
        step: 2,
        title: 'Call useSyncExternalStore in your custom hook or component',
        code: `export function useOnlineStatus() {
  return useSyncExternalStore(subscribeOnline, getOnlineSnapshot);
}`,
        explanation: 'Guarantees tearing-free, synchronous updates across all concurrent components.',
      },
    ],
    whyItMatters: 'The official way to subscribe to browser APIs (online status, window scroll) and external state stores without concurrency visual glitches ("tearing").',
    react16VsModern: `• Replaces the old useEffect + useState subscription pattern which could show inconsistent data across different components in concurrent React.`,
    commonMistakes: [
      {
        mistake: 'Returning a brand new object/array in getSnapshot every time (e.g. () => ({ online: navigator.onLine })).',
        solution: 'getSnapshot must return an immutable value or the same object reference if unchanged; otherwise React re-renders infinitely.',
      },
    ],
    keyTakeaway: 'The standard building block for state libraries like Zustand and Redux.',
  },

  '11-useActionState': {
    title: 'useActionState: The React 19 Form Revolution',
    version: 'React 19 🔥',
    importSnippet: `import { useActionState } from 'react';`,
    signature: `const [state, formAction, isPending] = useActionState(actionFn, initialState, permalink?);`,
    parameters: [
      {
        name: 'actionFn',
        type: '(previousState, formData) => Promise<any> | any',
        required: true,
        description: 'The async action function that executes when the form is submitted. Receives previous state and submitted FormData, and returns the next state.',
      },
      {
        name: 'initialState',
        type: 'any',
        required: true,
        description: 'The initial state before the action is ever triggered (e.g. null or { error: null }).',
      },
      {
        name: 'permalink',
        type: 'string (optional)',
        required: false,
        description: 'Optional URL for progressive enhancement before JS loads.',
      },
    ],
    returns: [
      {
        name: 'state',
        type: 'any',
        description: 'The latest value returned by actionFn (or initialState initially).',
      },
      {
        name: 'formAction',
        type: '(formData: FormData) => void',
        description: 'The action handler function passed directly to <form action={formAction}> or <button formAction={formAction}>.',
      },
      {
        name: 'isPending',
        type: 'boolean',
        description: 'True while the async action is actively running. Eliminates manual isLoading state!',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Write the async action function',
        code: `async function updateUserAction(prevState, formData) {
  const name = formData.get('name');
  const res = await api.updateName(name);
  if (!res.ok) return { error: 'Failed to update' };
  return { success: true, name: res.name };
}`,
        explanation: 'Always receives (previousState, formData) as parameters.',
      },
      {
        step: 2,
        title: 'Initialize useActionState in your component',
        code: `const [state, formAction, isPending] = useActionState(updateUserAction, null);`,
        explanation: 'Provides state, formAction, and automatic isPending loading boolean in 1 line!',
      },
      {
        step: 3,
        title: 'Pass formAction directly to the form',
        code: `<form action={formAction}>
  <input name="name" required disabled={isPending} />
  <button type="submit" disabled={isPending}>
    {isPending ? 'Saving...' : 'Save'}
  </button>
</form>`,
        explanation: 'No e.preventDefault(), no onSubmit, no try/catch boilerplate!',
      },
    ],
    whyItMatters: 'Native async action handling for forms. Eliminates manual isLoading, isError, and try/catch boilerplate.',
    react16VsModern: `• In React 16: You needed 3 useState variables (loading, error, data), an onSubmit handler, and e.preventDefault().
• In React 19: const [state, formAction, isPending] = useActionState(fn, initial). Pass formAction to <form action={formAction}> and React handles the rest!`,
    commonMistakes: [
      {
        mistake: 'Passing a function that does not accept previousState as its first argument.',
        solution: 'The action function signature is always (previousState, formData) => newResult.',
      },
    ],
    keyTakeaway: 'The modern default for mutations, form submissions, and async buttons in React 19.',
  },

  '12-useFormStatus': {
    title: 'useFormStatus: Contextual Child Form Awareness',
    version: 'React 19 🔥',
    importSnippet: `import { useFormStatus } from 'react-dom';`,
    signature: `const { pending, data, method, action } = useFormStatus();`,
    parameters: [],
    returns: [
      {
        name: 'pending',
        type: 'boolean',
        description: 'True if the enclosing parent <form> is currently executing its action.',
      },
      {
        name: 'data',
        type: 'FormData | null',
        description: 'The FormData instance being submitted by the parent form, allowing child components to read live form values.',
      },
      {
        name: 'method',
        type: 'string | null',
        description: 'The HTTP method of the parent form ("get" or "post").',
      },
      {
        name: 'action',
        type: 'Function | string | null',
        description: 'Reference to the action prop passed to the parent form.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Create a decoupled child component (e.g. SubmitButton)',
        code: `import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Submitting... ⏳' : 'Submit'}
    </button>
  );
}`,
        explanation: 'SubmitButton takes zero props! It reads the parent form state automatically.',
      },
      {
        step: 2,
        title: 'Render SubmitButton INSIDE a parent <form>',
        code: `function MyForm() {
  return (
    <form action={myAction}>
      <input name="email" />
      <SubmitButton /> {/* Works because it is rendered inside <form>! */}
    </form>
  );
}`,
        explanation: 'Must be rendered as a descendant of <form>.',
      },
    ],
    whyItMatters: 'Allows deep child buttons or banners to know if the parent form is pending or submitting without prop drilling.',
    react16VsModern: `• In React 16: You had to pass isLoading down through props to every button and child.
• In React 19: Child components call const { pending, data } = useFormStatus() to self-disable or show loading spinners automatically.`,
    commonMistakes: [
      {
        mistake: 'Calling useFormStatus in the SAME component that renders the <form>.',
        solution: 'useFormStatus only reads the PARENT form. You must extract your button/child into its own component rendered inside <form>.',
      },
    ],
    keyTakeaway: 'Must be called from a component rendered inside the <form>, not in the parent itself.',
  },

  '13-useOptimistic': {
    title: 'useOptimistic: Instant 0ms Perceived Response',
    version: 'React 19 🔥',
    importSnippet: `import { useOptimistic } from 'react';`,
    signature: `const [optimisticState, setOptimistic] = useOptimistic(passthroughState, updateFn);`,
    parameters: [
      {
        name: 'passthroughState',
        type: 'any',
        required: true,
        description: 'The actual, verified state returned from the server or useState.',
      },
      {
        name: 'updateFn',
        type: '(currentState, optimisticValue) => nextOptimisticState',
        required: true,
        description: 'Pure function that takes the current state and the value passed to setOptimistic, and returns the temporary optimistic state.',
      },
    ],
    returns: [
      {
        name: 'optimisticState',
        type: 'any',
        description: 'The optimistic state shown to the user while an async action is running. Automatically rolls back to passthroughState if action fails!',
      },
      {
        name: 'setOptimistic',
        type: '(optimisticValue: any) => void',
        description: 'Function used to trigger the temporary optimistic state update immediately.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Define actual state and wrap with useOptimistic',
        code: `const [likes, setLikes] = useState(42);

const [optimisticLikes, setOptimisticLikes] = useOptimistic(
  likes,
  (currentLikes, amount) => currentLikes + amount
);`,
        explanation: 'optimisticLikes defaults to likes when no transition is pending.',
      },
      {
        step: 2,
        title: 'Trigger optimistic update inside an async transition',
        code: `const handleLike = () => {
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
};`,
        explanation: 'React manages the temporary overlay and handles rollback on rejection automatically.',
      },
    ],
    whyItMatters: 'Updates the UI instantly (likes, comments, cart additions) while the network request is still traveling to the server.',
    react16VsModern: `• In React 16: Required complex manual optimistic state, manual error checking, and manual revert logic.
• In React 19: React handles the optimistic overlay automatically. If the background action fails, React automatically rolls back to the actual state!`,
    commonMistakes: [
      {
        mistake: 'Calling setOptimistic outside a startTransition or form action.',
        solution: 'setOptimistic must be called inside a Transition or an Action to allow React to link the temporary state to the async lifecycle.',
      },
    ],
    keyTakeaway: 'Essential for snappy UX (Jakob Nielsen Heuristic #1: Visibility of System Status).',
  },

  '14-use-hook': {
    title: 'use() API: Promises & Conditional Context',
    version: 'React 19 🔥',
    importSnippet: `import { use } from 'react';`,
    signature: `const value = use(resource);`,
    parameters: [
      {
        name: 'resource',
        type: 'Promise<T> | React.Context<T>',
        required: true,
        description: 'Either a Promise you want to resolve with Suspense, or a React Context created with createContext().',
      },
    ],
    returns: [
      {
        name: 'value',
        type: 'T',
        description: 'The resolved value of the Promise, or the current value of the Context.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Reading Promises with use() + Suspense',
        code: `import { use, Suspense } from 'react';

function UserProfile({ userPromise }) {
  // Suspends component until userPromise resolves!
  const user = use(userPromise);
  return <h2>{user.name}</h2>;
}

// In parent:
<Suspense fallback={<Skeleton />}>
  <UserProfile userPromise={fetchUserPromise} />
</Suspense>`,
        explanation: 'Replaces useEffect + useState data fetching boilerplate.',
      },
      {
        step: 2,
        title: 'Reading Context conditionally inside IF statements',
        code: `function Banner({ showAdvanced }) {
  if (showAdvanced) {
    // ✨ Legal in React 19! (Illegal with useContext)
    const settings = use(SettingsContext);
    return <p>{settings.advancedMode}</p>;
  }
  return <p>Standard Mode</p>;
}`,
        explanation: 'use() can be called inside loops and conditional statements.',
      },
    ],
    whyItMatters: 'Reads promises with Suspense and reads context anywhere, even inside if statements and loops.',
    react16VsModern: `• In React 16: Hooks could NEVER be inside an if statement or loop (Rules of Hooks).
• In React 19: use() can be called conditionally!
• In React 19: Pass a promise to use(promise) and React suspends until it resolves with zero useEffect boilerplate.`,
    commonMistakes: [
      {
        mistake: 'Creating a new promise directly inside the component body on every render (e.g. use(fetch("/api"))).',
        solution: 'Pass a promise created outside render, from a cache, or via a Server Component/state; creating a promise during render causes an infinite fetch loop.',
      },
    ],
    keyTakeaway: 'The foundation for modern data fetching in React 19.',
  },

  '15-ref-as-prop': {
    title: 'Ref as Prop & Ref Cleanups',
    version: 'React 19 🔥',
    importSnippet: `// No special imports required! Ref is a standard prop.`,
    signature: `function MyComponent({ ref, label, ...props }) { ... }`,
    parameters: [
      {
        name: 'ref',
        type: 'React.Ref<T>',
        required: false,
        description: 'A ref passed from the parent component, directly received as a prop.',
      },
    ],
    returns: [],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Accept ref directly as a prop in function components',
        code: `// React 19: No React.forwardRef needed!
function CustomInput({ ref, label, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
}`,
        explanation: 'forwardRef is now considered legacy and deprecated.',
      },
      {
        step: 2,
        title: 'Use Ref Callback Cleanups',
        code: `<div ref={(node) => {
  if (!node) return;
  const observer = new ResizeObserver(...);
  observer.observe(node);

  // Return cleanup function (New in React 19!):
  return () => {
    observer.disconnect();
  };
}} />`,
        explanation: 'When the element unmounts, React automatically calls the returned cleanup callback.',
      },
    ],
    whyItMatters: 'Pass ref directly as a prop to any function component. ForwardRef is now legacy!',
    react16VsModern: `• In React 16: You had to wrap components with React.forwardRef((props, ref) => ...).
• In React 19: Function components receive ref as a normal prop!
• In React 19: Ref callbacks can return cleanup functions that execute when DOM nodes unmount.`,
    commonMistakes: [
      {
        mistake: 'Continuing to wrap components with React.forwardRef in React 19.',
        solution: 'Simply take ref in your component props argument ({ ref, ...props }).',
      },
    ],
    keyTakeaway: 'Cleaner, simpler component APIs without awkward wrappers.',
  },

  '16-document-metadata': {
    title: 'Native Document Metadata (<title>, <meta>)',
    version: 'React 19 🔥',
    importSnippet: `// Built directly into React JSX! No external libraries needed.`,
    signature: `<title>Page Title</title>\n<meta name="description" content="..." />\n<link rel="canonical" href="..." />`,
    parameters: [],
    returns: [],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Render <title> or <meta> tags directly inside your component',
        code: `function ArticlePage({ article }) {
  return (
    <article>
      {/* React 19 automatically hoists these tags into HTML <head>! */}
      <title>{article.title} - My Blog</title>
      <meta name="description" content={article.summary} />
      <meta name="author" content={article.author} />
      <link rel="canonical" href={article.url} />

      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </article>
  );
}`,
        explanation: 'React detects metadata tags anywhere in your JSX tree and automatically hoists them to the HTML <head>.',
      },
    ],
    whyItMatters: 'Set document titles and SEO metadata directly in your JSX component tree.',
    react16VsModern: `• In React 16: Required third-party libraries like react-helmet or manual document.title in useEffect.
• In React 19: React detects <title>, <meta>, and <link> tags anywhere in your components and hoists them to HTML <head> automatically!`,
    commonMistakes: [
      {
        mistake: 'Installing react-helmet or react-helmet-async in React 19.',
        solution: 'React 19 has native document metadata hoisting built-in. Do not install external helmet packages.',
      },
    ],
    keyTakeaway: 'Built right into core React without any external dependencies.',
  },

  '18-useLayoutEffect': {
    title: 'useLayoutEffect: Synchronous DOM Measurement',
    version: 'React 16+',
    importSnippet: `import { useLayoutEffect } from 'react';`,
    signature: `useLayoutEffect(setupFunction, dependencyArray?);`,
    parameters: [
      {
        name: 'setupFunction',
        type: '() => void | (() => void)',
        required: true,
        description: 'Synchronous side-effect function that runs after DOM mutations but BEFORE the browser paints. Can return an optional cleanup function.',
      },
      {
        name: 'dependencyArray',
        type: 'any[] (optional)',
        required: false,
        description: 'Reactive dependencies. If omitted, runs after every render. If [], runs on mount/unmount. If [a, b], runs when dependencies change.',
      },
    ],
    returns: [
      {
        name: 'undefined',
        type: 'void',
        description: 'useLayoutEffect returns nothing.',
      },
    ],
    howToWriteSteps: [
      {
        step: 1,
        title: 'Import useLayoutEffect from react',
        code: `import { useLayoutEffect, useRef, useState } from 'react';`,
        explanation: 'Has the identical signature to useEffect, but different execution timing.',
      },
      {
        step: 2,
        title: 'Measure DOM nodes and synchronously adjust layout',
        code: `useLayoutEffect(() => {
  const { height } = tooltipRef.current.getBoundingClientRect();
  if (height > maxAllowedHeight) {
    setPosition('top'); // React re-renders BEFORE the browser paints! Zero flicker.
  }
}, [isOpen]);`,
        explanation: 'React runs this synchronously right after DOM mutations. Any state updates triggered here are flushed before the screen is painted, preventing visual jank or flicker.',
      },
    ],
    whyItMatters: 'Guarantees the user never sees intermediate or uncalculated layout positions.',
    react16VsModern: `• Render-Commit-Paint Pipeline:
  1. Render phase: Component executes, calculates virtual DOM.
  2. Commit phase: React applies mutations to the real DOM.
  3. useLayoutEffect runs SYNCHRONOUSLY: Inspects/measures DOM. If it updates state, React recalculates before the browser can paint.
  4. Browser Paint: The browser paints pixels onto the screen for the user.
  5. useEffect runs ASYNCHRONOUSLY: React fires useEffect after paint.
• SSR Warning: In Server-Side Rendering (Next.js/Node), neither DOM nor painting exists. useLayoutEffect triggers a warning on the server. Use useEffect or an isomorphic wrapper for SSR safe code.`,
    commonMistakes: [
      {
        mistake: 'Using useLayoutEffect by default for all side-effects (data fetching, subscriptions).',
        solution: 'useLayoutEffect blocks browser painting and can hurt page performance and frame rates. Use standard useEffect for 98% of effects, reserving useLayoutEffect strictly for DOM measurements and flicker prevention.',
      },
      {
        mistake: 'Calling useLayoutEffect in Next.js Server Components or SSR code without a window check.',
        solution: 'Guard with typeof window !== "undefined" or use standard useEffect on the server.',
      },
    ],
    keyTakeaway: 'Use useEffect by default. Only reach for useLayoutEffect when you must measure DOM layout and update state before the user sees the screen.',
  },
};
