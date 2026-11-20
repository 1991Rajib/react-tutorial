import { useReducer } from 'react';

// Reducer function (Pure function: (state, action) => newState)
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + (action.step || 1) };
    case 'decrement':
      return { count: Math.max(0, state.count - (action.step || 1)) };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function BasicExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Counter with Step Size</h3>
        <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0', color: 'var(--primary)' }}>
          {state.count}
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => dispatch({ type: 'increment', step: 1 })}>+1</button>
          <button onClick={() => dispatch({ type: 'increment', step: 5 })}>+5</button>
          <button onClick={() => dispatch({ type: 'decrement', step: 1 })}>-1</button>
          <button onClick={() => dispatch({ type: 'decrement', step: 5 })}>-5</button>
          <button onClick={() => dispatch({ type: 'reset' })} style={{ border: '1px solid var(--border-color)', background: 'transparent' }}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
