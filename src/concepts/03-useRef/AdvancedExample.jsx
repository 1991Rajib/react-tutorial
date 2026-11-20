import { useState, useRef } from 'react';

export default function AdvancedExample() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Advanced: Track render count without causing an infinite render loop
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  // React 19 Ref Callback with Cleanup Function!
  const [boxDimensions, setBoxDimensions] = useState({ width: 0, height: 0 });

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);
  };

  const handleReset = () => {
    handlePause();
    setSeconds(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>Precision Stopwatch (Timer Ref)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>
          Stores the interval ID in <code>timerRef</code> so pausing and cleaning up does not trigger unnecessary renders.
        </p>

        <p style={{ fontSize: '32px', fontFamily: 'monospace', fontWeight: 'bold', margin: '8px 0', color: 'var(--primary)' }}>
          {new Date(seconds * 1000).toISOString().substr(14, 5)}
        </p>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={isRunning ? handlePause : handleStart}
            style={{
              background: isRunning ? 'var(--warning)' : 'var(--success)',
              color: '#0f172a',
              fontWeight: 'bold',
            }}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={handleReset} style={{ border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-main)' }}>
            Reset
          </button>
        </div>
      </div>

      <hr style={{ borderColor: 'var(--border-color)' }} />

      <div>
        <h3>React 19 Ref Callback Cleanup</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>
          In React 19, ref callbacks can return a cleanup function (e.g. to disconnect a <code>ResizeObserver</code>).
        </p>

        <div
          ref={(node) => {
            if (!node) return;
            const observer = new ResizeObserver((entries) => {
              for (let entry of entries) {
                setBoxDimensions({
                  width: Math.round(entry.contentRect.width),
                  height: Math.round(entry.contentRect.height),
                });
              }
            });
            observer.observe(node);

            // React 19 feature: Return cleanup function directly from ref!
            return () => {
              observer.disconnect();
            };
          }}
          style={{
            padding: '16px',
            background: '#0b1120',
            border: '1px dashed var(--accent)',
            borderRadius: '8px',
            resize: 'both',
            overflow: 'auto',
            minHeight: '80px',
          }}
        >
          <p style={{ fontSize: '13px', color: 'var(--accent)' }}>
            Drag bottom-right corner to resize this box:
          </p>
          <p style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '4px' }}>
            Size: {boxDimensions.width}px × {boxDimensions.height}px
          </p>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        Total Component Renders: <strong>{renderCountRef.current}</strong> (tracked silently via ref)
      </div>
    </div>
  );
}
