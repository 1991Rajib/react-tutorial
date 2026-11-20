import { useState, useRef, useCallback, memo } from 'react';

// Custom comparison function
function areUserPropsEqual(prevProps, nextProps) {
  // Only re-render if user ID or reputation score changed (ignores irrelevant timestamp ticks)
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.score === nextProps.user.score &&
    prevProps.onPromote === nextProps.onPromote
  );
}

const UserCard = memo(function UserCard({ user, onPromote }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div
      style={{
        padding: '12px 16px',
        background: '#0b1120',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <p style={{ fontWeight: 'bold' }}>{user.name}</p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Reputation Score: <strong style={{ color: 'var(--primary)' }}>{user.score}</strong> | Heartbeat: {user.lastSeen}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={() => onPromote(user.id)}
          style={{ background: 'var(--accent)', color: '#fff', fontSize: '12px', padding: '6px 10px' }}
        >
          +10 Rep
        </button>
        <span
          style={{
            fontSize: '11px',
            color: 'var(--success)',
            background: 'rgba(52, 211, 153, 0.1)',
            padding: '2px 6px',
            borderRadius: '4px',
          }}
        >
          Renders: {renderCount.current}
        </span>
      </div>
    </div>
  );
}, areUserPropsEqual);

export default function AdvancedExample() {
  const [user, setUser] = useState({
    id: 101,
    name: 'Sarah Connor',
    score: 80,
    lastSeen: '10:00:00 AM',
  });

  const [ticker, setTicker] = useState(0);

  // 1. Stable callback with useCallback (prevents breaking React.memo)
  const handlePromote = useCallback((userId) => {
    setUser((prev) => ({ ...prev, score: prev.score + 10 }));
  }, []);

  const simulateBackgroundHeartbeat = () => {
    // Updates lastSeen timestamp on the user object, but custom areUserPropsEqual ignores it!
    setUser((prev) => ({ ...prev, lastSeen: new Date().toLocaleTimeString() }));
    setTicker((t) => t + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Custom arePropsEqual Comparator</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Click "Simulate Background Heartbeat". The parent state updates with a new timestamp, but <code>UserCard</code> uses custom equality logic to skip re-rendering!
        </p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={simulateBackgroundHeartbeat}
            style={{ border: '1px solid var(--border-color)', background: 'transparent' }}
          >
            Emit Background Heartbeat ({ticker} ticks)
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '540px' }}>
        <UserCard user={user} onPromote={handlePromote} />
      </div>
    </div>
  );
}
