import { useState, useRef } from 'react';

export default function AdvancedExample() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [refCleanupLogs, setRefCleanupLogs] = useState([]);

  // 1. Mutable Timer Ref: holds requestAnimationFrame or interval ID without causing re-renders
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  // 2. Mutable Render Tracker: increments on every render without triggering an infinite loop
  const renderCounterRef = useRef(0);
  renderCounterRef.current += 1;

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedMs;

    timerRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current);
    }, 40);
  };

  const handlePause = () => {
    if (!isRunning) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  };

  const handleReset = () => {
    handlePause();
    setElapsedMs(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (elapsedMs === 0) return;
    const currentLapTime = laps.length === 0 ? elapsedMs : elapsedMs - laps[0].totalMs;
    setLaps((prev) => [
      {
        id: prev.length + 1,
        lapMs: currentLapTime,
        totalMs: elapsedMs,
      },
      ...prev,
    ]);
  };

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSec / 60);
    const seconds = totalSec % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Precision Chronometer &amp; React 19 Ref Cleanups</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Demonstrates storing active interval timers in refs, tracking internal render counts silently, and using <strong>React 19 ref cleanup callbacks</strong>.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Stopwatch Controller */}
        <div
          style={{
            background: '#0b1120',
            padding: '24px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Total Renders: <strong style={{ color: 'var(--accent)' }}>{renderCounterRef.current}</strong> (tracked via <code>useRef</code>)
          </div>

          <div
            style={{
              fontSize: '44px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              color: 'var(--primary)',
              letterSpacing: '2px',
              textShadow: '0 0 20px rgba(56, 189, 248, 0.2)',
            }}
          >
            {formatTime(elapsedMs)}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={isRunning ? handlePause : handleStart}
              style={{
                background: isRunning ? 'var(--danger)' : 'var(--success)',
                color: '#0f172a',
                fontWeight: 'bold',
                padding: '8px 20px',
                fontSize: '14px',
              }}
            >
              {isRunning ? 'Stop' : 'Start'}
            </button>

            <button
              onClick={handleLap}
              disabled={!isRunning}
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                padding: '8px 16px',
                fontSize: '14px',
              }}
            >
              Record Lap
            </button>

            <button
              onClick={handleReset}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                padding: '8px 16px',
                fontSize: '14px',
              }}
            >
              Reset
            </button>
          </div>

          {/* Laps List */}
          <div style={{ width: '100%', marginTop: '8px', maxHeight: '160px', overflowY: 'auto' }}>
            {laps.length > 0 ? (
              <table style={{ width: '100%', fontSize: '12px', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '6px' }}>Lap #</th>
                    <th style={{ padding: '6px' }}>Split Time</th>
                    <th style={{ padding: '6px', textAlign: 'right' }}>Total Time</th>
                  </tr>
                </thead>
                <tbody>
                  {laps.map((lap) => (
                    <tr key={lap.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '6px' }}>Lap {lap.id}</td>
                      <td style={{ padding: '6px', color: 'var(--primary)', fontFamily: 'monospace' }}>
                        +{formatTime(lap.lapMs)}
                      </td>
                      <td style={{ padding: '6px', textAlign: 'right', fontFamily: 'monospace' }}>
                        {formatTime(lap.totalMs)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', padding: '12px' }}>
                No lap splits recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Right: React 19 Ref Cleanup Callback Demo */}
        <div
          style={{
            background: '#0b1120',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div>
            <h4 style={{ fontSize: '14px', color: 'var(--accent)', marginBottom: '4px' }}>
              React 19 Feature: Ref Cleanup Function
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              In React 19, ref callbacks can return a cleanup function that runs when the element unmounts, replacing cumbersome useEffect listeners!
            </p>
          </div>

          {/* Container with React 19 Ref Cleanup */}
          <div
            ref={(element) => {
              if (element) {
                const time = new Date().toLocaleTimeString();
                setRefCleanupLogs((p) => [`[${time}] Ref attached to DOM element`, ...p.slice(0, 4)]);
              }
              // React 19 Cleanup Function
              return () => {
                const time = new Date().toLocaleTimeString();
                setRefCleanupLogs((p) => [`[${time}] Ref cleaned up on unmount`, ...p.slice(0, 4)]);
              };
            }}
            style={{
              padding: '12px',
              borderRadius: '6px',
              background: 'rgba(56, 189, 248, 0.05)',
              border: '1px dashed var(--primary)',
              fontSize: '12px',
            }}
          >
            <div style={{ fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>
              Dynamic Ref-Tracked Box
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              Returns cleanup function directly from ref callback:
              <code>ref=&#123;(node) =&gt; &#123; return () =&gt; cleanup() &#125;&#125;</code>
            </div>
          </div>

          {/* Logs */}
          <div style={{ fontSize: '11px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Ref Lifecycle Event Feed:</span>
            {refCleanupLogs.map((log, i) => (
              <div
                key={i}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'var(--text-main)',
                }}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
