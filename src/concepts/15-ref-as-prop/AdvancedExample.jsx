import { useRef, useState } from 'react';

// Reusable card taking a ref prop directly
function TerminalOutput({ ref, logs }) {
  return (
    <div
      ref={ref}
      style={{
        maxHeight: '180px',
        overflowY: 'auto',
        background: '#030712',
        border: '1px solid var(--border-color)',
        borderRadius: '6px',
        padding: '12px',
        fontFamily: 'monospace',
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      {logs.map((log, idx) => (
        <div key={idx} style={{ color: log.type === 'err' ? 'var(--danger)' : '#4ade80' }}>
          &gt; {log.msg}
        </div>
      ))}
    </div>
  );
}

export default function AdvancedExample() {
  const terminalRef = useRef(null);
  const [logs, setLogs] = useState([
    { type: 'ok', msg: 'System initialized on React 19 core.' },
    { type: 'ok', msg: 'Subscribed to event bus.' },
  ]);

  const addLog = (type = 'ok') => {
    setLogs((prev) => [
      ...prev,
      {
        type,
        msg: `Telemetry event emitted at ${new Date().toLocaleTimeString()}`,
      },
    ]);

    // Auto-scroll terminal smoothly to bottom
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 50);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Auto-Scrolling Terminal with Direct Ref Prop</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Parent component passes <code>ref=&#123;terminalRef&#125;</code> to <code>TerminalOutput</code> to control its scroll DOM coordinates.
        </p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <button onClick={() => addLog('ok')} style={{ background: 'var(--primary)', color: '#0f172a' }}>
            + Add Log Entry
          </button>
          <button onClick={() => addLog('err')} style={{ border: '1px solid var(--danger)', background: 'transparent', color: 'var(--danger)' }}>
            + Add Error Entry
          </button>
          <button onClick={() => setLogs([])} style={{ border: '1px solid var(--border-color)', background: 'transparent' }}>
            Clear Logs
          </button>
        </div>

        <div style={{ maxWidth: '500px' }}>
          <TerminalOutput ref={terminalRef} logs={logs} />
        </div>
      </div>
    </div>
  );
}
