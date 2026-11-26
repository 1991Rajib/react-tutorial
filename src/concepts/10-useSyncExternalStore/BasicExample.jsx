import { useSyncExternalStore } from 'react';

// 1. External Store 1: Online / Offline Navigator
function subscribeNetwork(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getNetworkSnapshot() {
  return navigator.onLine;
}

// 2. External Store 2: Responsive Media Query Store (Tearing-Free Window Dimension Listener)
function createMediaQueryStore(query) {
  return {
    subscribe(callback) {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener('change', callback);
      return () => matchMedia.removeEventListener('change', callback);
    },
    getSnapshot() {
      return window.matchMedia(query).matches;
    },
    getServerSnapshot() {
      return false; // Safe default for SSR hydration
    },
  };
}

const desktopMediaQuery = createMediaQueryStore('(min-width: 900px)');
const prefersDarkMediaQuery = createMediaQueryStore('(prefers-color-scheme: dark)');

export default function BasicExample() {
  // Subscribing to external non-React stores without tearing or useEffect synchronization lag
  const isOnline = useSyncExternalStore(subscribeNetwork, getNetworkSnapshot);
  const isDesktop = useSyncExternalStore(desktopMediaQuery.subscribe, desktopMediaQuery.getSnapshot, desktopMediaQuery.getServerSnapshot);
  const prefersDark = useSyncExternalStore(prefersDarkMediaQuery.subscribe, prefersDarkMediaQuery.getSnapshot, prefersDarkMediaQuery.getServerSnapshot);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Tearing-Free Browser Subscriptions</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          <code>useSyncExternalStore</code> is designed for subscribing to external state sources (browser APIs, Redux, Zustand) with a guarantee of zero visual tearing in concurrent React.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {/* Network Monitor */}
        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            background: '#0b1120',
            border: `1px solid ${isOnline ? 'rgba(52, 211, 153, 0.4)' : 'rgba(248, 113, 113, 0.4)'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '24px' }}>{isOnline ? '🌐' : '🔌'}</span>
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: isOnline ? 'rgba(52, 211, 153, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                color: isOnline ? 'var(--success)' : 'var(--danger)',
                fontWeight: 'bold',
              }}
            >
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
          <strong style={{ fontSize: '14px' }}>Browser Network Status</strong>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Subscribed to <code>navigator.onLine</code> without useEffect state lag.
          </span>
        </div>

        {/* Media Query Monitor */}
        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            background: '#0b1120',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '24px' }}>{isDesktop ? '🖥️' : '📱'}</span>
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(56, 189, 248, 0.15)',
                color: 'var(--primary)',
                fontWeight: 'bold',
              }}
            >
              {isDesktop ? 'DESKTOP (≥900px)' : 'MOBILE / TABLET (<900px)'}
            </span>
          </div>
          <strong style={{ fontSize: '14px' }}>MatchMedia Store</strong>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Resize your window across 900px to see instant reactive layout detection.
          </span>
        </div>

        {/* System Preference Monitor */}
        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            background: '#0b1120',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '24px' }}>{prefersDark ? '🌙' : '☀️'}</span>
            <span
              style={{
                fontSize: '11px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(129, 140, 248, 0.15)',
                color: 'var(--accent)',
                fontWeight: 'bold',
              }}
            >
              {prefersDark ? 'DARK SCHEME' : 'LIGHT SCHEME'}
            </span>
          </div>
          <strong style={{ fontSize: '14px' }}>OS Color Preference</strong>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Listens to <code>prefers-color-scheme</code> directly from browser OS settings.
          </span>
        </div>
      </div>
    </div>
  );
}
