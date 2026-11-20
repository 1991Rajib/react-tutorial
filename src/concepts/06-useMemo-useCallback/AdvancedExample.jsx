import { useState, useMemo, useCallback, memo } from 'react';

// Memoized child component that only re-renders if its specific props change
const ListItem = memo(function ListItem({ item, onToggleFavorite }) {
  console.log(`[ListItem render] ${item.title}`);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        background: '#0b1120',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
      }}
    >
      <span>{item.title}</span>
      <button
        onClick={() => onToggleFavorite(item.id)}
        style={{
          background: item.isFavorite ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
          border: '1px solid var(--border-color)',
          fontSize: '12px',
          color: item.isFavorite ? 'var(--warning)' : 'var(--text-muted)',
        }}
      >
        {item.isFavorite ? '★ Favorited' : '☆ Favorite'}
      </button>
    </div>
  );
});

const INITIAL_DATA = [
  { id: 1, title: 'Learn Modern React 19 Actions', category: 'React', isFavorite: false },
  { id: 2, title: 'Master Jakob Nielsen Usability Heuristics', category: 'UX', isFavorite: true },
  { id: 3, title: 'Configure Fast Vite Builds', category: 'Tooling', isFavorite: false },
  { id: 4, title: 'Explore Concurrent useTransition', category: 'React', isFavorite: false },
];

export default function AdvancedExample() {
  const [items, setItems] = useState(INITIAL_DATA);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [extraCount, setExtraCount] = useState(0);

  // 1. useCallback preserves function reference across renders
  // Without this, every click on "extraCount" would generate a new function and re-render ALL ListItems!
  const handleToggleFavorite = useCallback((id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  }, []);

  // 2. useMemo caches the filtered array
  const filteredList = useMemo(() => {
    console.log('[Filtering list...]');
    if (filterCategory === 'ALL') return items;
    return items.filter((item) => item.category === filterCategory);
  }, [items, filterCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>useCallback + React.memo Referential Stability</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
          Check your browser console: Clicking "Unrelated State Counter" does NOT re-render any <code>ListItem</code> children!
        </p>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ fontSize: '13px', marginRight: '8px' }}>Filter Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="ALL">All Categories</option>
              <option value="React">React</option>
              <option value="UX">UX</option>
              <option value="Tooling">Tooling</option>
            </select>
          </div>

          <button
            onClick={() => setExtraCount((c) => c + 1)}
            style={{ border: '1px solid var(--border-color)', background: 'transparent' }}
          >
            Unrelated Counter: {extraCount}
          </button>
        </div>
      </div>

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
