import { useState, useTransition } from 'react';

// Generates 4,000 mock server event log records
const MOCK_SYSTEM_LOGS = Array.from({ length: 4000 }, (_, i) => {
  const levels = ['INFO', 'WARN', 'ERROR', 'AUDIT'];
  const services = ['auth-service', 'payment-gateway', 'order-processor', 'inventory-db'];
  const lvl = levels[i % levels.length];
  const srv = services[i % services.length];
  return {
    id: i + 1,
    level: lvl,
    service: srv,
    timestamp: `14:2${i % 60}:${(10 + (i % 50)).toString()}`,
    message: `[${srv}] Transaction trace #${10000 + i} status=${lvl === 'ERROR' ? 500 : 200} payloadSize=${120 + (i % 800)}B`,
  };
});

export default function BasicExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState(MOCK_SYSTEM_LOGS);
  const [isPending, startTransition] = useTransition();

  const handleSearchChange = (e) => {
    const nextQuery = e.target.value;

    // 1. URGENT UPDATE: Update input immediately so typing stays buttery-smooth at 60fps
    setSearchTerm(nextQuery);

    // 2. NON-URGENT TRANSITION: React can interrupt this heavy filtering if the user presses another key!
    startTransition(() => {
      // Artificial slight CPU work to simulate complex AST/log parsing
      const startTime = performance.now();
      while (performance.now() - startTime < 40) {
        // intentional busy-wait simulating intensive filtering
      }

      const lower = nextQuery.toLowerCase();
      const nextFiltered = MOCK_SYSTEM_LOGS.filter(
        (log) =>
          log.service.toLowerCase().includes(lower) ||
          log.message.toLowerCase().includes(lower) ||
          log.level.toLowerCase().includes(lower)
      );
      setFilteredLogs(nextFiltered);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Concurrent Non-Blocking UI Transitions</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          <code>useTransition</code> lets you mark expensive state updates as <strong>non-urgent</strong>.
          React can pause or discard non-urgent renders to keep user interactions (like typing) responsive at 60fps.
        </p>
      </div>

      {/* Search Input Bar with isPending indicator */}
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
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="Filter 4,000 system logs (e.g. 'error', 'payment', 'inventory')..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ width: '100%', padding: '10px 14px', fontSize: '14px' }}
            />
          </div>

          <div
            style={{
              padding: '8px 14px',
              borderRadius: '6px',
              background: isPending ? 'rgba(251, 191, 36, 0.15)' : 'rgba(52, 211, 153, 0.15)',
              border: `1px solid ${isPending ? 'rgba(251, 191, 36, 0.4)' : 'rgba(52, 211, 153, 0.4)'}`,
              color: isPending ? '#fbbf24' : 'var(--success)',
              fontSize: '12px',
              fontWeight: 'bold',
              minWidth: '150px',
              textAlign: 'center',
            }}
          >
            {isPending ? '⚡ Rendering (Pending)...' : '✓ 60fps Responsive'}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)' }}>
          <span>
            Showing <strong>{filteredLogs.length.toLocaleString()}</strong> of {MOCK_SYSTEM_LOGS.length.toLocaleString()} logs
          </span>
          <span>
            Input State: <strong>Urgent</strong> | Log Filter State: <strong>Transition Lane</strong>
          </span>
        </div>
      </div>

      {/* Log Stream Results Container */}
      <div
        style={{
          background: '#0b1120',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          maxHeight: '320px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          opacity: isPending ? 0.7 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {filteredLogs.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px' }}>
            No logs matching &quot;{searchTerm}&quot;.
          </div>
        ) : (
          filteredLogs.slice(0, 30).map((log) => (
            <div
              key={log.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '6px 10px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              <span style={{ color: 'var(--text-muted)' }}>{log.timestamp}</span>
              <span
                style={{
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  background:
                    log.level === 'ERROR'
                      ? 'rgba(248, 113, 113, 0.2)'
                      : log.level === 'WARN'
                      ? 'rgba(251, 191, 36, 0.2)'
                      : 'rgba(56, 189, 248, 0.2)',
                  color:
                    log.level === 'ERROR'
                      ? 'var(--danger)'
                      : log.level === 'WARN'
                      ? '#fbbf24'
                      : 'var(--primary)',
                }}
              >
                {log.level}
              </span>
              <span style={{ color: 'var(--text-main)', flex: 1 }}>{log.message}</span>
            </div>
          ))
        )}
        {filteredLogs.length > 30 && (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', marginTop: '6px' }}>
            + {filteredLogs.length - 30} more matching logs truncated for preview.
          </div>
        )}
      </div>
    </div>
  );
}
