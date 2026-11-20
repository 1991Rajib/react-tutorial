import { useState, useDeferredValue, useMemo } from 'react';

// Generates 5,000 mock items
const LARGE_DATASET = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `Data Entry #${i + 1} - ${['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'][i % 5]} Component`,
  category: ['Security', 'Performance', 'UI/UX', 'Database', 'Network'][i % 5],
}));

function SlowList({ query }) {
  // Filter items matching the deferred query
  const filtered = useMemo(() => {
    if (!query) return LARGE_DATASET.slice(0, 50); // initial sample
    return LARGE_DATASET.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <ul
      style={{
        listStyle: 'none',
        maxHeight: '260px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '8px',
        background: '#0b1120',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
      }}
    >
      <li style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        Showing {filtered.length} matching entries out of 5,000 total items
      </li>
      {filtered.map((item) => (
        <li
          key={item.id}
          style={{
            padding: '6px 10px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '4px',
            fontSize: '13px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{item.name}</span>
          <span style={{ fontSize: '11px', color: 'var(--accent)' }}>{item.category}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AdvancedExample() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query, '');

  const isPending = query !== deferredQuery;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>High-Volume Instant Search (5,000 Items)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
          Notice: As you type quickly, the input remains 100% responsive and lag-free. The list fades slightly to indicate background recalculation.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. 'Alpha' or 'Delta'..."
            style={{ width: '100%', maxWidth: '400px' }}
          />
          {isPending && (
            <span style={{ fontSize: '12px', color: 'var(--primary)' }}>
              Filtering 5,000 items... ⏳
            </span>
          )}
        </div>
      </div>

      <div style={{ opacity: isPending ? 0.6 : 1, transition: 'opacity 0.15s ease' }}>
        <SlowList query={deferredQuery} />
      </div>
    </div>
  );
}
