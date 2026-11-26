import { useState, useEffect } from 'react';

export default function BasicExample() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isPollingActive, setIsPollingActive] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(1.085);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [unreadCount, setUnreadCount] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);
  const [lifecycleLogs, setLifecycleLogs] = useState([]);

  const addLog = (text, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLifecycleLogs((prev) => [`[${time}] ${text}`, ...prev.slice(0, 5)]);
  };

  // EFFECT 1: Window Resize Listener with Mandatory Cleanup
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    addLog('Mounted window resize event listener');

    // Cleanup runs when unmounting
    return () => {
      window.removeEventListener('resize', handleResize);
      addLog('Cleaned up window resize listener');
    };
  }, []);

  // EFFECT 2: Polling Timer with Dynamic Dependencies & Cleanup
  useEffect(() => {
    if (!isPollingActive) {
      addLog('Polling paused — timer not started');
      return;
    }

    addLog('Started 4s live exchange rate polling interval');
    const timerId = setInterval(() => {
      // Simulate small currency market fluctuation
      const delta = (Math.random() * 0.008 - 0.004);
      setExchangeRate((prev) => +(prev + delta).toFixed(4));
      setLastUpdated(new Date().toLocaleTimeString());
      setUnreadCount((c) => c + 1);
    }, 4000);

    // CRITICAL CLEANUP: Prevents interval memory leaks whenever `isPollingActive` changes
    return () => {
      clearInterval(timerId);
      addLog('Cleaned up exchange rate interval timer');
    };
  }, [isPollingActive]);

  // EFFECT 3: Document Title Synchronization
  useEffect(() => {
    document.title = unreadCount > 0 ? `(${unreadCount}) React Lab` : 'React Lab';
    return () => {
      document.title = 'React Lab';
    };
  }, [unreadCount]);

  // EFFECT 4: Auto-Dismissing Notification with Timer Cleanup
  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage(null);
      addLog('Auto-dismissed notification toast after 3s');
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  const triggerToast = () => {
    setToastMessage(`Security audit snapshot generated at ${new Date().toLocaleTimeString()}`);
    addLog('Triggered manual notification toast');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Synchronization &amp; Lifecycle Cleanup</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          <code>useEffect</code> connects your component to external browser events, timers, or subscriptions.
          <strong>Every effect with an active listener or timer MUST return a cleanup function.</strong>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Left Column: Interactive Telemetry Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card 1: Window Dimensions */}
          <div
            style={{
              background: '#0b1120',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
            }}
          >
            <h4 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '8px' }}>
              1. Browser Viewport Listener
            </h4>
            <div style={{ fontSize: '13px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span>
                Width: <strong>{windowDimensions.width}px</strong>
              </span>
              <span>
                Height: <strong>{windowDimensions.height}px</strong>
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
              Resize your browser window to observe real-time event updates.
            </span>
          </div>

          {/* Card 2: Live Currency Poller */}
          <div
            style={{
              background: '#0b1120',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--accent)' }}>
                2. Live EUR / USD Exchange Rate
              </h4>
              <button
                onClick={() => setIsPollingActive((p) => !p)}
                style={{
                  fontSize: '12px',
                  padding: '4px 10px',
                  background: isPollingActive ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255,255,255,0.06)',
                  color: isPollingActive ? 'var(--success)' : 'var(--text-muted)',
                  border: `1px solid ${isPollingActive ? 'rgba(52, 211, 153, 0.4)' : 'var(--border-color)'}`,
                }}
              >
                {isPollingActive ? '● Polling Active (4s)' : '○ Paused'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary)' }}>
                €1 = ${exchangeRate.toFixed(4)}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Updated: {lastUpdated}
              </span>
            </div>
          </div>

          {/* Card 3: Document Title & Notification Toast */}
          <div
            style={{
              background: '#0b1120',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
            }}
          >
            <h4 style={{ fontSize: '14px', color: '#f59e0b', marginBottom: '8px' }}>
              3. Document Title &amp; Timed Toast
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <button onClick={triggerToast} style={{ fontSize: '12px', padding: '6px 12px' }}>
                Show Auto-Dismiss Toast (3s)
              </button>
              <button
                onClick={() => setUnreadCount(0)}
                style={{ fontSize: '12px', padding: '6px 12px', background: 'transparent', border: '1px solid var(--border-color)' }}
              >
                Clear Title Badges ({unreadCount})
              </button>
            </div>

            {toastMessage && (
              <div
                style={{
                  background: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: 'var(--primary)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{toastMessage}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>auto-dismissing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Execution Lifecycle Logs */}
        <div
          style={{
            background: '#0b1120',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Effect Lifecycle Activity Log
            </h4>
            <button
              onClick={() => setLifecycleLogs([])}
              style={{ fontSize: '11px', padding: '2px 8px', background: 'transparent', border: '1px solid var(--border-color)' }}
            >
              Clear
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, fontFamily: 'monospace', fontSize: '11px' }}>
            {lifecycleLogs.length === 0 ? (
              <span style={{ color: 'var(--text-muted)' }}>No recent effect logs.</span>
            ) : (
              lifecycleLogs.map((log, i) => (
                <div
                  key={i}
                  style={{
                    padding: '6px 8px',
                    borderRadius: '4px',
                    background: log.includes('Cleaned up') ? 'rgba(248, 113, 113, 0.1)' : 'rgba(56, 189, 248, 0.08)',
                    color: log.includes('Cleaned up') ? 'var(--danger)' : 'var(--primary)',
                    borderLeft: `3px solid ${log.includes('Cleaned up') ? 'var(--danger)' : 'var(--primary)'}`,
                  }}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
