import { useState, useDeferredValue } from 'react';

// Generates 1,500 simulated products
const CATALOG_ITEMS = Array.from({ length: 1500 }, (_, i) => ({
  id: i + 1,
  name: `SKU-${1000 + i} ${['Pro Laptop', 'Ultra Monitor', 'Ergo Chair', 'Desk Pad', 'USB-C Dock'][i % 5]}`,
  sku: `INV-${(20000 + i).toString()}`,
  price: Math.floor(Math.sin(i) * 300 + 450),
  stock: (i * 7) % 85,
}));

export default function BasicExample() {
  const [query, setQuery] = useState('');

  // React 19 Feature: useDeferredValue accepts an optional initialValue!
  const deferredQuery = useDeferredValue(query, '');

  // Detect whether the deferred render is currently lagging behind urgent user typing
  const isStale = query !== deferredQuery;

  // Filter items based on the deferred value so typing in `query` remains completely unblocked
  const filtered = CATALOG_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(deferredQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Fast Keystrokes with Deferred Content Rendering</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          <code>useDeferredValue</code> lets you defer updating a heavy section of the UI.
          In React 19, you can pass an initial value: <code>useDeferredValue(query, &apos;&apos;)</code>.
        </p>
      </div>

      {/* Immediate Keystroke Input Bar */}
      <div
        style={{
          background: '#0b1120',
          padding: '16px 20px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input
            type="text"
            placeholder="Type quickly to search catalog (e.g. 'Pro', 'Chair', 'INV-201')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, padding: '10px 14px', fontSize: '14px' }}
          />

          <div
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              background: isStale ? 'rgba(251, 191, 36, 0.15)' : 'rgba(52, 211, 153, 0.15)',
              border: `1px solid ${isStale ? 'rgba(251, 191, 36, 0.4)' : 'rgba(52, 211, 153, 0.4)'}`,
              color: isStale ? '#fbbf24' : 'var(--success)',
              minWidth: '130px',
              textAlign: 'center',
            }}
          >
            {isStale ? '⏳ Syncing Deferred...' : '✓ Synchronized'}
          </div>
        </div>

        {/* Status Indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
          <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Urgent Input State: </span>
            <strong style={{ color: 'var(--primary)' }}>&quot;{query || '(empty)'}&quot;</strong>
          </div>
          <div style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Deferred Tree Query: </span>
            <strong style={{ color: 'var(--accent)' }}>&quot;{deferredQuery || '(empty)'}&quot;</strong>
          </div>
        </div>
      </div>

      {/* Catalog Table with Stale Opacity Feedback */}
      <div
        style={{
          background: '#0b1120',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          maxHeight: '320px',
          overflowY: 'auto',
          opacity: isStale ? 0.6 : 1,
          transition: 'opacity 0.15s ease',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>Results: <strong>{filtered.length} items</strong></span>
          <span>{isStale ? 'Re-rendering catalog in background...' : 'Catalog up to date'}</span>
        </div>

        <table style={{ width: '100%', fontSize: '13px', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '8px' }}>SKU Code</th>
              <th style={{ padding: '8px' }}>Product Name</th>
              <th style={{ padding: '8px' }}>Price</th>
              <th style={{ padding: '8px', textAlign: 'right' }}>Stock Units</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 15).map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace', color: 'var(--primary)' }}>{item.sku}</td>
                <td style={{ padding: '8px' }}>{item.name}</td>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>${item.price}</td>
                <td style={{ padding: '8px', textAlign: 'right', color: item.stock < 10 ? 'var(--danger)' : 'var(--text-main)' }}>
                  {item.stock} in stock
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length > 15 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', padding: '8px' }}>
            + {filtered.length - 15} more items matching deferred query.
          </div>
        )}
      </div>
    </div>
  );
}
