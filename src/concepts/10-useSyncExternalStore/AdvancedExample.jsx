import { useSyncExternalStore } from 'react';

// A tiny external store (lives outside of React completely!)
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();

  return {
    getState: () => state,
    setState: (updater) => {
      state = typeof updater === 'function' ? updater(state) : updater;
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// Global external notification store
const notificationStore = createStore([
  { id: 1, text: 'Welcome to Modern React 19 Lab!' },
]);

export default function AdvancedExample() {
  // Subscribe component to external store
  const notifications = useSyncExternalStore(
    notificationStore.subscribe,
    notificationStore.getState
  );

  const addNotification = () => {
    notificationStore.setState((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `New system alert at ${new Date().toLocaleTimeString()}`,
      },
    ]);
  };

  const clearNotifications = () => {
    notificationStore.setState([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>External Store Subscription (Mini-Zustand)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          State lives in a plain JavaScript object outside React, synchronized safely without tearing.
        </p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button onClick={addNotification} style={{ background: 'var(--primary)', color: '#0f172a' }}>
            + Dispatch External Event
          </button>
          <button onClick={clearNotifications} style={{ border: '1px solid var(--border-color)', background: 'transparent' }}>
            Clear All
          </button>
        </div>
      </div>

      <div className="card">
        <h4 style={{ marginBottom: '8px' }}>Active Notifications ({notifications.length})</h4>
        {notifications.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No alerts in external queue.</p>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {notifications.map((n) => (
              <li
                key={n.id}
                style={{
                  background: '#0b1120',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  borderLeft: '3px solid var(--accent)',
                }}
              >
                🔔 {n.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
