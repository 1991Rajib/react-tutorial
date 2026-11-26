import UseStateBasic from './concepts/01-useState/BasicExample.jsx';
import UseStateAdv from './concepts/01-useState/AdvancedExample.jsx';

import UseEffectBasic from './concepts/02-useEffect/BasicExample.jsx';
import UseEffectAdv from './concepts/02-useEffect/AdvancedExample.jsx';

import UseRefBasic from './concepts/03-useRef/BasicExample.jsx';
import UseRefAdv from './concepts/03-useRef/AdvancedExample.jsx';

import UseContextBasic from './concepts/04-useContext/BasicExample.jsx';
import UseContextAdv from './concepts/04-useContext/AdvancedExample.jsx';

import UseReducerBasic from './concepts/05-useReducer/BasicExample.jsx';
import UseReducerAdv from './concepts/05-useReducer/AdvancedExample.jsx';

import UseMemoBasic from './concepts/06-useMemo-useCallback/BasicExample.jsx';
import UseMemoAdv from './concepts/06-useMemo-useCallback/AdvancedExample.jsx';

import UseIdBasic from './concepts/07-useId/BasicExample.jsx';
import UseIdAdv from './concepts/07-useId/AdvancedExample.jsx';

import UseTransitionBasic from './concepts/08-useTransition/BasicExample.jsx';
import UseTransitionAdv from './concepts/08-useTransition/AdvancedExample.jsx';

import UseDeferredBasic from './concepts/09-useDeferredValue/BasicExample.jsx';
import UseDeferredAdv from './concepts/09-useDeferredValue/AdvancedExample.jsx';

import UseSyncStoreBasic from './concepts/10-useSyncExternalStore/BasicExample.jsx';
import UseSyncStoreAdv from './concepts/10-useSyncExternalStore/AdvancedExample.jsx';

import UseActionStateBasic from './concepts/11-useActionState/BasicExample.jsx';
import UseActionStateAdv from './concepts/11-useActionState/AdvancedExample.jsx';

import UseFormStatusBasic from './concepts/12-useFormStatus/BasicExample.jsx';
import UseFormStatusAdv from './concepts/12-useFormStatus/AdvancedExample.jsx';

import UseOptimisticBasic from './concepts/13-useOptimistic/BasicExample.jsx';
import UseOptimisticAdv from './concepts/13-useOptimistic/AdvancedExample.jsx';

import UseHookBasic from './concepts/14-use-hook/BasicExample.jsx';
import UseHookAdv from './concepts/14-use-hook/AdvancedExample.jsx';

import RefAsPropBasic from './concepts/15-ref-as-prop/BasicExample.jsx';
import RefAsPropAdv from './concepts/15-ref-as-prop/AdvancedExample.jsx';

import DocMetadataBasic from './concepts/16-document-metadata/BasicExample.jsx';
import DocMetadataAdv from './concepts/16-document-metadata/AdvancedExample.jsx';

import MemoBasic from './concepts/17-memo/BasicExample.jsx';
import MemoAdv from './concepts/17-memo/AdvancedExample.jsx';

import UseLayoutEffectBasic from './concepts/18-useLayoutEffect/BasicExample.jsx';
import UseLayoutEffectAdv from './concepts/18-useLayoutEffect/AdvancedExample.jsx';

export const TOPICS = [
  // --- Category 1: React 16 Foundations Modernized ---
  {
    id: '01-useState',
    name: 'useState',
    version: 'React 16+',
    category: 'Foundations (Modernized)',
    summary: 'Component state, automatic batching, and derived values without useEffect.',
    folder: 'src/concepts/01-useState',
    BasicComponent: UseStateBasic,
    AdvancedComponent: UseStateAdv,
  },
  {
    id: '02-useEffect',
    name: 'useEffect',
    version: 'React 16+',
    category: 'Foundations (Modernized)',
    summary: 'Synchronization with external systems, listeners, and mandatory cleanups.',
    folder: 'src/concepts/02-useEffect',
    BasicComponent: UseEffectBasic,
    AdvancedComponent: UseEffectAdv,
  },
  {
    id: '03-useRef',
    name: 'useRef',
    version: 'React 16 / 19',
    category: 'Foundations (Modernized)',
    summary: 'DOM references, mutable timers without re-render, and React 19 ref cleanup.',
    folder: 'src/concepts/03-useRef',
    BasicComponent: UseRefBasic,
    AdvancedComponent: UseRefAdv,
  },
  {
    id: '04-useContext',
    name: 'useContext',
    version: 'React 16 / 19',
    category: 'Foundations (Modernized)',
    summary: 'Global state passing, simplified <ThemeContext value=...> without .Provider.',
    folder: 'src/concepts/04-useContext',
    BasicComponent: UseContextBasic,
    AdvancedComponent: UseContextAdv,
  },
  {
    id: '05-useReducer',
    name: 'useReducer',
    version: 'React 16+',
    category: 'Foundations (Modernized)',
    summary: 'Action-dispatch state machines for complex workflows (e.g. shopping carts).',
    folder: 'src/concepts/05-useReducer',
    BasicComponent: UseReducerBasic,
    AdvancedComponent: UseReducerAdv,
  },
  {
    id: '06-useMemo-useCallback',
    name: 'useMemo & useCallback',
    version: 'React 16+',
    category: 'Foundations (Modernized)',
    summary: 'Referential stability, performance caching, and React Compiler context.',
    folder: 'src/concepts/06-useMemo-useCallback',
    BasicComponent: UseMemoBasic,
    AdvancedComponent: UseMemoAdv,
  },
  {
    id: '17-memo',
    name: 'React.memo',
    version: 'React 16+',
    category: 'Foundations (Modernized)',
    summary: 'Component memoization, shallow props comparison, custom arePropsEqual, and React Compiler.',
    folder: 'src/concepts/17-memo',
    BasicComponent: MemoBasic,
    AdvancedComponent: MemoAdv,
  },
  {
    id: '18-useLayoutEffect',
    name: 'useLayoutEffect',
    version: 'React 16+',
    category: 'Foundations (Modernized)',
    summary: 'Synchronous execution before browser paint for layout measurements and zero-flicker UI updates.',
    folder: 'src/concepts/18-useLayoutEffect',
    BasicComponent: UseLayoutEffectBasic,
    AdvancedComponent: UseLayoutEffectAdv,
  },

  // --- Category 2: React 18 Concurrency & Accessibility ---
  {
    id: '07-useId',
    name: 'useId',
    version: 'React 18+',
    category: 'Concurrency & Utilities',
    summary: 'Hydration-safe unique IDs for accessible form labels and ARIA descriptors.',
    folder: 'src/concepts/07-useId',
    BasicComponent: UseIdBasic,
    AdvancedComponent: UseIdAdv,
  },
  {
    id: '08-useTransition',
    name: 'useTransition',
    version: 'React 18 / 19',
    category: 'Concurrency & Utilities',
    summary: 'Non-blocking UI transitions and React 19 async transition actions.',
    folder: 'src/concepts/08-useTransition',
    BasicComponent: UseTransitionBasic,
    AdvancedComponent: UseTransitionAdv,
  },
  {
    id: '09-useDeferredValue',
    name: 'useDeferredValue',
    version: 'React 18 / 19',
    category: 'Concurrency & Utilities',
    summary: 'Deferring heavy render calculations while keeping keyboard typing at 60fps.',
    folder: 'src/concepts/09-useDeferredValue',
    BasicComponent: UseDeferredBasic,
    AdvancedComponent: UseDeferredAdv,
  },
  {
    id: '10-useSyncExternalStore',
    name: 'useSyncExternalStore',
    version: 'React 18+',
    category: 'Concurrency & Utilities',
    summary: 'Tearing-free subscription to browser APIs and external state stores.',
    folder: 'src/concepts/10-useSyncExternalStore',
    BasicComponent: UseSyncStoreBasic,
    AdvancedComponent: UseSyncStoreAdv,
  },

  // --- Category 3: React 19 Game Changers ---
  {
    id: '11-useActionState',
    name: 'useActionState',
    version: 'React 19 🔥',
    category: 'React 19 Breakthroughs',
    summary: 'Native async action handling, eliminating manual loading & error state boilerplate.',
    folder: 'src/concepts/11-useActionState',
    BasicComponent: UseActionStateBasic,
    AdvancedComponent: UseActionStateAdv,
  },
  {
    id: '12-useFormStatus',
    name: 'useFormStatus',
    version: 'React 19 🔥',
    category: 'React 19 Breakthroughs',
    summary: 'Child components automatically inspecting enclosing parent <form> status.',
    folder: 'src/concepts/12-useFormStatus',
    BasicComponent: UseFormStatusBasic,
    AdvancedComponent: UseFormStatusAdv,
  },
  {
    id: '13-useOptimistic',
    name: 'useOptimistic',
    version: 'React 19 🔥',
    category: 'React 19 Breakthroughs',
    summary: 'Instant 0ms perceived feedback for likes/comments with automatic error rollback.',
    folder: 'src/concepts/13-useOptimistic',
    BasicComponent: UseOptimisticBasic,
    AdvancedComponent: UseOptimisticAdv,
  },
  {
    id: '14-use-hook',
    name: 'use() API',
    version: 'React 19 🔥',
    category: 'React 19 Breakthroughs',
    summary: 'Reading promises directly with Suspense & consuming context inside IF blocks.',
    folder: 'src/concepts/14-use-hook',
    BasicComponent: UseHookBasic,
    AdvancedComponent: UseHookAdv,
  },
  {
    id: '15-ref-as-prop',
    name: 'Ref as Prop & Cleanups',
    version: 'React 19 🔥',
    category: 'React 19 Breakthroughs',
    summary: 'No forwardRef needed! Plain function components receive ref as a prop.',
    folder: 'src/concepts/15-ref-as-prop',
    BasicComponent: RefAsPropBasic,
    AdvancedComponent: RefAsPropAdv,
  },
  {
    id: '16-document-metadata',
    name: 'Document Metadata (<title>)',
    version: 'React 19 🔥',
    category: 'React 19 Breakthroughs',
    summary: 'Native <title>, <meta>, <link> tags hoisted directly into HTML <head>.',
    folder: 'src/concepts/16-document-metadata',
    BasicComponent: DocMetadataBasic,
    AdvancedComponent: DocMetadataAdv,
  },
];
