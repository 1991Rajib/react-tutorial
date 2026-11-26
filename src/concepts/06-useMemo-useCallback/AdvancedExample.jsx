import { useState, useMemo, useCallback, useRef, memo } from 'react';

// Memoized child component that only re-renders if its specific props change
const ListItem = memo(function ListItem({ item, onToggleFavorite }) {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        background: '#0b1120',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
      }}
    >
      <div>
        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.title}</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Category: <span style={{ color: 'var(--primary)' }}>{item.category}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => onToggleFavorite(item.id)}
          style={{
            background: item.isFavorite ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${item.isFavorite ? 'rgba(251, 191, 36, 0.4)' : 'var(--border-color)'}`,
            fontSize: '12px',
            color: item.isFavorite ? '#fbbf24' : 'var(--text-muted)',
            padding: '4px 10px',
          }}
        >
          {item.isFavorite ? '★ Starred' : '☆ Star'}
        </button>

        <span
          style={{
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: '4px',
            background: 'rgba(52, 211, 153, 0.1)',
            color: 'var(--success)',
            fontFamily: 'monospace',
          }}
        >
          Renders: {renderCountRef.current}
        </span>
      </div>
    </div>
  );
});

const INITIAL_TOPICS = [
  { id: 1, title: 'Server-Side Rendering (SSR) & Streaming Suspense', category: 'Architecture', isFavorite: true },
  { id: 2, title: 'Jakob Nielsen Heuristics for Enterprise Dashboards', category: 'UX Design', isFavorite: true },
  { id: 3, title: 'Fiber Work Loop & Concurrent Priority Lanes', category: 'React Core', isFavorite: false },
  { id: 4, title: 'Optimistic UI Updates with Instant Rollbacks', category: 'React Core', isFavorite: false },
  { id: 5, title: 'Accessible ARIA Dialogs and Focus Trap Automation', category: 'UX Design', isFavorite: false },
];

export default function AdvancedExample() {
  const [items, setItems] = useState(INITIAL_TOPICS);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [parentCounter, setParentCounter] = useState(0);

  // 1. useCallback preserves function reference across renders
  // Without useCallback, every click on parentCounter would create a new function reference and re-render ALL ListItems!
  const handleToggleFavorite = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  }, []); // Stable empty dependency array

  // 2. useMemo caches the filtered items array
  const filteredList = useMemo(() => {
    if (categoryFilter === 'ALL') return items;
    return items.filter((item) => item.category === categoryFilter);
  }, [items, categoryFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Referential Stability with useCallback &amp; React.memo</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          <code>useCallback</code> caches the callback function definition. Passing this stable reference to <code>React.memo</code> child components prevents wasted re-renders when parent state changes.
        </p>
      </div>

      {/* Parent Controls Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          padding: '12px 16px',
          background: '#0b1120',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Filter Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '6px 10px', fontSize: '12px' }}
          >
            <option value="ALL">All Categories</option>
            <option value="React Core">React Core</option>
            <option value="Architecture">Architecture</option>
            <option value="UX Design">UX Design</option>
          </select>
        </div>

        {/* Unrelated Parent Re-render Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setParentCounter((c) => c + 1)}
            style={{
              fontSize: '12px',
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
            }}
          >
            Trigger Parent Re-render (Count: {parentCounter})
          </button>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Notice: Child &quot;Renders&quot; count does NOT increase!
          </span>
        </div>
      </div>

      {/* Child Items Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredList.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
