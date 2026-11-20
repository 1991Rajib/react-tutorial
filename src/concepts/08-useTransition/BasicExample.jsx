import { useState, useTransition } from 'react';

function AboutTab() {
  return <p style={{ padding: '12px' }}>👋 Welcome to the About page! (Lightweight)</p>;
}

function HeavyPostsTab() {
  // Artificial slowdown to simulate rendering a heavy component
  const startTime = performance.now();
  while (performance.now() - startTime < 60) {
    // 60ms artificial slowdown
  }

  const items = Array.from({ length: 250 }, (_, i) => `Post #${i + 1}`);

  return (
    <ul style={{ maxHeight: '200px', overflowY: 'auto', padding: '12px', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {items.map((item) => (
        <li key={item} style={{ background: '#0b1120', padding: '6px 10px', borderRadius: '4px', fontSize: '13px' }}>
          📄 {item} - Loaded heavy content
        </li>
      ))}
    </ul>
  );
}

export default function BasicExample() {
  const [tab, setTab] = useState('about');
  const [isPending, startTransition] = useTransition();

  const selectTab = (nextTab) => {
    // Mark switching tab as non-urgent!
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Non-Blocking Tab Switching</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
          Notice the <code>isPending</code> status indicator while React prepares the heavy tab in the background without freezing the UI.
        </p>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => selectTab('about')}
            style={{
              background: tab === 'about' ? 'var(--primary)' : 'var(--border-color)',
              color: tab === 'about' ? '#0f172a' : '#fff',
            }}
          >
            About Tab
          </button>
          <button
            onClick={() => selectTab('posts')}
            style={{
              background: tab === 'posts' ? 'var(--primary)' : 'var(--border-color)',
              color: tab === 'posts' ? '#0f172a' : '#fff',
            }}
          >
            Heavy Posts Tab
          </button>
          {isPending && (
            <span style={{ fontSize: '13px', color: 'var(--accent)' }}>
              ⏳ Loading tab in background...
            </span>
          )}
        </div>
      </div>

      <div className="card" style={{ opacity: isPending ? 0.7 : 1, transition: 'opacity 0.2s' }}>
        {tab === 'about' && <AboutTab />}
        {tab === 'posts' && <HeavyPostsTab />}
      </div>
    </div>
  );
}
