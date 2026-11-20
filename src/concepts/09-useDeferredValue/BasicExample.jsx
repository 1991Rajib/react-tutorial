import { useState, useDeferredValue } from 'react';

export default function BasicExample() {
  const [text, setText] = useState('');
  // React 19 initialValue parameter
  const deferredText = useDeferredValue(text, '');

  const isStale = text !== deferredText;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Immediate vs Deferred Value</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
          Type rapidly into the input. The input updates at 60fps, while <code>deferredText</code> seamlessly lags when CPU is busy.
        </p>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type rapidly..."
          style={{ width: '100%', maxWidth: '400px' }}
        />
      </div>

      <div className="card" style={{ background: '#0b1120', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p>
          Immediate Input Value: <strong style={{ color: 'var(--primary)' }}>{text || '—'}</strong>
        </p>
        <p style={{ opacity: isStale ? 0.5 : 1, transition: 'opacity 0.2s' }}>
          Deferred Value: <strong>{deferredText || '—'}</strong>{' '}
          {isStale && <span style={{ color: 'var(--warning)', fontSize: '12px' }}>[Deferred sync in progress...]</span>}
        </p>
      </div>
    </div>
  );
}
