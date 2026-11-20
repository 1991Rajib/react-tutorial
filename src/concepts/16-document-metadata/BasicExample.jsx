import { useState } from 'react';

export default function BasicExample() {
  const [page, setPage] = useState('Home');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* ✨ React 19: Native <title> hoisted to document <head>! */}
      <title>{`${page} - React 19 Metadata Demo`}</title>
      <meta name="description" content={`Browsing the ${page} section in the React 19 playground.`} />

      <div>
        <h3>Native Document Metadata Hoisting</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Look at your browser tab title right now! As you switch the buttons below, the browser tab title changes dynamically from inside this component without <code>react-helmet</code> or <code>useEffect</code>.
        </p>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['Home', 'Pricing', 'Documentation', 'Contact Us'].map((tab) => (
            <button
              key={tab}
              onClick={() => setPage(tab)}
              style={{
                background: page === tab ? 'var(--primary)' : 'var(--border-color)',
                color: page === tab ? '#0f172a' : '#fff',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="card" style={{ marginTop: '16px', background: '#0b1120' }}>
          <p>Current Page: <strong style={{ color: 'var(--primary)' }}>{page}</strong></p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Browser Tab Title is hoisted to: <code>"{page} - React 19 Metadata Demo"</code>
          </p>
        </div>
      </div>
    </div>
  );
}
