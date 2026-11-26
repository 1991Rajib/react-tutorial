import { useState, useRef, useEffect, useLayoutEffect } from 'react';

export default function BasicExample() {
  const [mode, setMode] = useState('useLayoutEffect'); // 'useLayoutEffect' | 'useEffect'
  const [boxPosition, setBoxPosition] = useState(0);
  const [logs, setLogs] = useState([]);
  const boxRef = useRef(null);

  // Measure and position the box whenever mode or manual trigger changes
  // In 'useLayoutEffect' mode: runs synchronously before browser paint -> no visible jump/flicker!
  // In 'useEffect' mode: runs asynchronously after browser paint -> box renders initially, then adjusts.
  useLayoutEffect(() => {
    if (mode !== 'useLayoutEffect') return;

    // Synchronous execution before browser paint
    const timestamp = performance.now().toFixed(1);
    setLogs((prev) => [
      `[useLayoutEffect @ ${timestamp}ms] Synchronous DOM read & state adjustment BEFORE paint.`,
      ...prev.slice(0, 5),
    ]);
  }, [boxPosition, mode]);

  useEffect(() => {
    if (mode !== 'useEffect') return;

    // Asynchronous execution after browser paint
    const timestamp = performance.now().toFixed(1);
    setLogs((prev) => [
      `[useEffect @ ${timestamp}ms] Asynchronous effect ran AFTER browser painted to screen.`,
      ...prev.slice(0, 5),
    ]);
  }, [boxPosition, mode]);

  const handleRandomize = () => {
    // Reposition between 0px and 240px
    const nextOffset = Math.floor(Math.random() * 240);
    setBoxPosition(nextOffset);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '6px' }}>1. Execution Timing: Before Paint vs After Paint</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
          <strong>useLayoutEffect</strong> fires synchronously after React mutates the DOM, but{' '}
          <em>before the browser repaints the screen</em>. This makes it ideal for measuring DOM
          dimensions and adjusting layout without flickering.
        </p>
      </div>

      {/* Mode Selector Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: '#0b1120',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Active Hook Mode:</span>

        <button
          onClick={() => setMode('useLayoutEffect')}
          style={{
            background: mode === 'useLayoutEffect' ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
            color: mode === 'useLayoutEffect' ? '#0f172a' : 'var(--text-main)',
            fontWeight: mode === 'useLayoutEffect' ? 'bold' : 'normal',
            fontSize: '13px',
            padding: '6px 14px',
          }}
        >
          ⚡ useLayoutEffect (Before Paint)
        </button>

        <button
          onClick={() => setMode('useEffect')}
          style={{
            background: mode === 'useEffect' ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
            color: '#fff',
            fontWeight: mode === 'useEffect' ? 'bold' : 'normal',
            fontSize: '13px',
            padding: '6px 14px',
          }}
        >
          ⏱️ useEffect (After Paint)
        </button>

        <button
          onClick={handleRandomize}
          style={{
            marginLeft: 'auto',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '13px',
            padding: '6px 14px',
          }}
        >
          🎲 Reposition Box
        </button>
      </div>

      {/* Visual Canvas Demo */}
      <div
        style={{
          padding: '24px',
          background: '#0b1120',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          minHeight: '140px',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Boundary Container (Simulated Layout Track):
        </div>

        <div
          style={{
            height: '60px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '6px',
            border: '1px dashed var(--border-color)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            ref={boxRef}
            style={{
              position: 'absolute',
              top: '8px',
              left: `${boxPosition}px`,
              transition: 'left 0.15s ease-out',
              background: mode === 'useLayoutEffect' ? 'var(--primary)' : 'var(--accent)',
              color: '#0f172a',
              fontWeight: 'bold',
              fontSize: '12px',
              padding: '10px 16px',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{mode === 'useLayoutEffect' ? '⚡' : '⏱️'}</span>
            <span>Offset: {boxPosition}px</span>
          </div>
        </div>
      </div>

      {/* Comparison Explainer Table */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div
          style={{
            padding: '14px',
            borderRadius: '6px',
            background: 'rgba(56, 189, 248, 0.05)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
          }}
        >
          <h4 style={{ color: 'var(--primary)', marginBottom: '6px', fontSize: '14px' }}>
            useLayoutEffect (Synchronous)
          </h4>
          <ul style={{ fontSize: '13px', color: 'var(--text-muted)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>Runs synchronously <strong>after DOM mutation</strong>, but <strong>before screen paint</strong>.</li>
            <li>Browser cannot paint until this hook finishes executing.</li>
            <li>Prevents screen flicker when measuring layout or setting tooltip coordinates.</li>
          </ul>
        </div>

        <div
          style={{
            padding: '14px',
            borderRadius: '6px',
            background: 'rgba(129, 140, 248, 0.05)',
            border: '1px solid rgba(129, 140, 248, 0.3)',
          }}
        >
          <h4 style={{ color: 'var(--accent)', marginBottom: '6px', fontSize: '14px' }}>
            useEffect (Asynchronous)
          </h4>
          <ul style={{ fontSize: '13px', color: 'var(--text-muted)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>Runs asynchronously <strong>after the browser paints</strong> the screen.</li>
            <li>Does NOT block visual painting, keeping the app smooth & responsive.</li>
            <li>Default choice for 98% of effects (data fetching, listeners, timers).</li>
          </ul>
        </div>
      </div>

      {/* Execution Logs */}
      <div className="card" style={{ background: '#0b1120', padding: '14px' }}>
        <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Timing Execution Log:
        </h4>
        {logs.length === 0 ? (
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Click &quot;Reposition Box&quot; to inspect lifecycle timing logs.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {logs.map((log, i) => (
              <div
                key={i}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: log.includes('useLayoutEffect') ? 'var(--primary)' : 'var(--accent)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
