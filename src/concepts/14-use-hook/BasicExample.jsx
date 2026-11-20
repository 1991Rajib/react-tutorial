import { createContext, use, useState } from 'react';

// Sample configuration context
const ConfigContext = createContext({
  apiKey: 'live_pk_9948271',
  environment: 'production',
  maxRetries: 3,
});

function ConditionalSettings({ showSecretConfig }) {
  if (showSecretConfig) {
    // ✨ REACT 19 SUPERPOWER: Calling `use()` inside an IF block!
    // This was strictly forbidden and impossible with `useContext`!
    const config = use(ConfigContext);

    return (
      <div style={{ padding: '12px', background: '#0b1120', borderRadius: '6px', border: '1px solid var(--accent)' }}>
        <p style={{ color: 'var(--accent)', fontWeight: 'bold' }}>🔒 Sensitive Configuration (Unlocked):</p>
        <p style={{ fontSize: '13px', marginTop: '4px' }}>API Key: <code>{config.apiKey}</code></p>
        <p style={{ fontSize: '13px' }}>Environment: {config.environment}</p>
        <p style={{ fontSize: '13px' }}>Max Retries: {config.maxRetries}</p>
      </div>
    );
  }

  return (
    <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
      ⚪ Standard View: Sensitive settings are hidden. (No context evaluated).
    </div>
  );
}

export default function BasicExample() {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Conditional Context Reading with <code>use()</code></h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Traditional hooks like <code>useContext</code> throw errors if placed inside an <code>if</code> statement. React 19's <code>use()</code> works anywhere!
        </p>

        <button
          onClick={() => setShowSecret((prev) => !prev)}
          style={{
            background: showSecret ? 'var(--warning)' : 'var(--primary)',
            color: '#0f172a',
            fontWeight: 'bold',
            marginBottom: '16px',
          }}
        >
          {showSecret ? 'Hide Secrets' : 'Reveal Conditional Secrets (inside IF)'}
        </button>

        <ConditionalSettings showSecretConfig={showSecret} />
      </div>
    </div>
  );
}
