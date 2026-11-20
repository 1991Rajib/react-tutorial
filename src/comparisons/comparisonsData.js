export const HOOK_COMPARISONS = [
  {
    id: 'state-vs-reducer',
    title: 'useState vs useReducer',
    tagline: 'Simple independent values vs Complex multi-field state machines',
    whenToUse: {
      left: {
        name: 'useState',
        bestFor: [
          'Independent, simple state primitives (strings, booleans, numbers)',
          'Local UI state like modal open/closed, form input value',
          'Straightforward toggles or counters',
        ],
        codeSnippet: `const [count, setCount] = useState(0);
setCount(prev => prev + 1);`,
      },
      right: {
        name: 'useReducer',
        bestFor: [
          'Multiple state variables that update together in response to 1 event',
          'Next state depends on complex logic or previous states',
          'Separating "what happened" (actions) from "how state changes" (reducer)',
          'E-commerce carts, multi-step checkout wizards, game loops',
        ],
        codeSnippet: `const [cart, dispatch] = useReducer(cartReducer, initialCart);
dispatch({ type: 'ADD_ITEM', product });`,
      },
    },
    ruleOfThumb: 'Start with useState. When you find yourself writing 3+ separate setStates in the same event handler, or your state is a deeply nested object, switch to useReducer.',
  },

  {
    id: 'memo-vs-callback',
    title: 'useMemo vs useCallback',
    tagline: 'Caching calculated values vs Caching function definitions',
    whenToUse: {
      left: {
        name: 'useMemo',
        bestFor: [
          'Caches the RETURN VALUE of a calculation',
          'Avoiding expensive CPU loops, heavy transforms, or sorting large arrays',
          'Creating a stable object reference passed as a prop',
        ],
        codeSnippet: `// Runs function & caches result
const sortedList = useMemo(() => {
  return heavySort(items);
}, [items]);`,
      },
      right: {
        name: 'useCallback',
        bestFor: [
          'Caches the FUNCTION DEFINITION itself',
          'Passing callbacks to React.memo child components to prevent re-renders',
          'Passing callbacks to custom hook dependency arrays',
        ],
        codeSnippet: `// Caches the function itself
const handleClick = useCallback((id) => {
  deleteItem(id);
}, []);`,
      },
    },
    ruleOfThumb: 'useMemo(() => fn, deps) is the exact equivalent of useCallback(fn, deps). useMemo returns a value; useCallback returns a function.',
  },

  {
    id: 'transition-vs-deferred',
    title: 'useTransition vs useDeferredValue',
    tagline: 'When you control the state update vs When you only receive a prop/value',
    whenToUse: {
      left: {
        name: 'useTransition',
        bestFor: [
          'You OWN the setState call and want to mark it as low-priority',
          'You want an explicit isPending boolean indicator',
          'Switching tabs, navigating routes, or triggering async actions (React 19)',
        ],
        codeSnippet: `const [isPending, startTransition] = useTransition();

function handleTabClick(nextTab) {
  startTransition(() => {
    setActiveTab(nextTab);
  });
}`,
      },
      right: {
        name: 'useDeferredValue',
        bestFor: [
          'You DO NOT own the state (e.g. value comes from props or third-party)',
          'You have an instant input value, and want a deferred copy for heavy list rendering',
          'You want to check stale UI state via (value !== deferredValue)',
        ],
        codeSnippet: `const [query, setQuery] = useState('');
// query is instant; deferredQuery lags smoothly during CPU load
const deferredQuery = useDeferredValue(query);

return <HeavyList search={deferredQuery} />;`,
      },
    },
    ruleOfThumb: 'If you have direct access to the setState setter, use useTransition. If you only receive a value (or prop) and want a low-priority version of it, use useDeferredValue.',
  },

  {
    id: 'actionstate-vs-state',
    title: 'useActionState (React 19) vs useState (React 16)',
    tagline: 'Native Async Mutation Lifecycle vs Manual Loading/Error Management',
    whenToUse: {
      left: {
        name: 'useState (React 16 Old Way)',
        bestFor: [
          'Requires 3 separate states: [loading, setLoading], [error, setError], [data, setData]',
          'Requires manual e.preventDefault() on submit',
          'Requires manual try / catch / finally blocks in every event handler',
        ],
        codeSnippet: `const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

async function onSubmit(e) {
  e.preventDefault();
  setLoading(true);
  try { await api.save(); }
  catch (err) { setError(err); }
  finally { setLoading(false); }
}`,
      },
      right: {
        name: 'useActionState (React 19 Way)',
        bestFor: [
          'Replaces all loading/error/data boilerplate in ONE hook',
          'Automatically provides state, formAction, and isPending',
          'Passes cleanly to native <form action={formAction}> without e.preventDefault()',
        ],
        codeSnippet: `// 1 line handles loading, error, and return value!
const [state, formAction, isPending] = useActionState(
  async (prevState, formData) => {
    return await api.save(formData);
  },
  initialState
);`,
      },
    },
    ruleOfThumb: 'For asynchronous mutations, form submissions, and server actions in React 19, useActionState is the new gold standard.',
  },

  {
    id: 'ref-vs-state',
    title: 'useRef vs useState',
    tagline: 'Quiet mutable persistence vs Triggering UI re-renders',
    whenToUse: {
      left: {
        name: 'useRef',
        bestFor: [
          'Changing .current DOES NOT trigger a component re-render',
          'Storing interval / timer IDs (setInterval, setTimeout)',
          'Accessing native DOM elements directly (focus, scroll, dimensions)',
          'Tracking previous props/state values silently',
        ],
        codeSnippet: `const timerRef = useRef(null);
timerRef.current = setInterval(...); // Silent change!`,
      },
      right: {
        name: 'useState',
        bestFor: [
          'Changing state MUST re-render the component to update the UI',
          'Values rendered directly in JSX (text, counters, list items)',
          'Conditional rendering flags (isVisible, isOpen)',
        ],
        codeSnippet: `const [count, setCount] = useState(0);
setCount(1); // Triggers component re-render!`,
      },
    },
    ruleOfThumb: 'If the value is visible on the screen or affects JSX rendering, use useState. If the value is internal plumbing that should not cause a re-render, use useRef.',
  },

  {
    id: 'context-vs-use',
    title: 'useContext vs use() (React 19)',
    tagline: 'Top-level only vs Conditional & Promise reading',
    whenToUse: {
      left: {
        name: 'useContext (React 16)',
        bestFor: [
          'Must be called at the top-level of the component',
          'CANNOT be inside an if statement, switch, or loop',
          'Only reads React Context, cannot read Promises',
        ],
        codeSnippet: `// Must be top-level!
const theme = useContext(ThemeContext);`,
      },
      right: {
        name: 'use() API (React 19)',
        bestFor: [
          'Can be called conditionally inside if statements and loops!',
          'Reads both Context AND Promises',
          'Integrates natively with Suspense for data streaming',
        ],
        codeSnippet: `if (userIsAdmin) {
  // Completely legal in React 19!
  const secretConfig = use(AdminContext);
}`,
      },
    },
    ruleOfThumb: 'use() is a generalized reading primitive for resources. In React 19, use() can replace useContext and unlocks conditional reads.',
  },
];
