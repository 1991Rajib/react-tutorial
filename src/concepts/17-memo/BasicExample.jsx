import { useState, useRef, memo } from 'react';

// 1. Regular Un-memoized Child Component
function RegularChild({ name }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div
      style={{
        padding: '12px',
        background: '#0b1120',
        borderRadius: '6px',
        border: '1px solid rgba(248, 113, 113, 0.4)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <p style={{ fontWeight: 'bold' }}>Standard Component (Un-memoized)</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Name prop: {name}</p>
      </div>
      <span
        style={{
          background: 'rgba(248, 113, 113, 0.2)',
          color: 'var(--danger)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        Renders: {renderCount.current} ⚠️
      </span>
    </div>
  );
}

// 2. Memoized Child Component (wrapped in memo)
const MemoizedChild = memo(function MemoizedChild({ name }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div
      style={{
        padding: '12px',
        background: '#0b1120',
        borderRadius: '6px',
        border: '1px solid rgba(52, 211, 153, 0.4)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <p style={{ fontWeight: 'bold', color: 'var(--success)' }}>
          React.memo Component (Memoized)
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Name prop: {name}</p>
      </div>
      <span
        style={{
          background: 'rgba(52, 211, 153, 0.2)',
          color: 'var(--success)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
      >
        Renders: {renderCount.current} ✅
      </span>
    </div>
  );
});

export default function BasicExample() {
  const [parentCount, setParentCount] = useState(0);
  const [childName, setChildName] = useState('Alex');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Visualizing Component Re-Renders</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Click "Increment Parent State". Notice how the standard child re-renders every time, but the <code>React.memo</code> child skips re-rendering!
        </p>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setParentCount((c) => c + 1)}
            style={{ background: 'var(--primary)', color: '#0f172a', fontWeight: 'bold' }}
          >
            Increment Parent State: {parentCount}
          </button>

          <button
            onClick={() => setChildName(childName === 'Alex' ? 'Jordan' : 'Alex')}
            style={{ border: '1px solid var(--border-color)', background: 'transparent' }}
          >
            Toggle Child Prop Name ({childName})
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
        <RegularChild name={childName} />
        <MemoizedChild name={childName} />
      </div>
    </div>
  );
}
