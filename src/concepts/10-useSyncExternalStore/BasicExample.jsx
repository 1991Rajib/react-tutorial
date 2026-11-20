import { useSyncExternalStore } from 'react';

// 1. Subscribe function: attaches browser event listeners
function subscribeOnline(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

// 2. Snapshot function: returns current value
function getOnlineSnapshot() {
  return navigator.onLine;
}

export default function BasicExample() {
  // Custom hook usage in 1 line
  const isOnline = useSyncExternalStore(subscribeOnline, getOnlineSnapshot);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Browser Online / Offline Status</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Tearing-free subscription to the browser's <code>navigator.onLine</code> API.
        </p>

        <div
          style={{
            padding: '16px',
            borderRadius: '8px',
            background: isOnline ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
            border: `1px solid ${isOnline ? 'var(--success)' : 'var(--danger)'}`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '24px' }}>{isOnline ? '🌐' : '🔌'}</span>
          <div>
            <p style={{ fontWeight: 'bold', color: isOnline ? 'var(--success)' : 'var(--danger)' }}>
              {isOnline ? 'Connected to Internet (Online)' : 'No Connection (Offline)'}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              (Try turning off your Wi-Fi or setting Network to 'Offline' in DevTools to see it update instantly!)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
