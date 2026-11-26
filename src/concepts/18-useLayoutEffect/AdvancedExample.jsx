import { useState, useRef, useLayoutEffect, useEffect } from 'react';

export default function AdvancedExample() {
  const [activeHook, setActiveHook] = useState('useLayoutEffect'); // 'useLayoutEffect' | 'useEffect'
  const [showTooltip, setShowTooltip] = useState(false);
  const [placement, setPlacement] = useState('bottom'); // 'bottom' | 'top'
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  // When tooltip opens, measure its DOM rectangle and flip placement if near viewport/container bottom
  const measureAndPosition = () => {
    if (!buttonRef.current || !tooltipRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    setMeasuredHeight(Math.round(tooltipRect.height));

    // Calculate if there is enough space below (needs at least tooltipRect.height + 15px)
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const shouldFlipToTop = spaceBelow < tooltipRect.height + 60;

    setPlacement(shouldFlipToTop ? 'top' : 'bottom');
  };

  // 1. Synchronous layout pass: Runs BEFORE browser paint
  useLayoutEffect(() => {
    if (activeHook !== 'useLayoutEffect' || !showTooltip) return;
    measureAndPosition();
  }, [showTooltip, activeHook]);

  // 2. Asynchronous layout pass: Runs AFTER browser paint (may exhibit layout flicker/jump)
  useEffect(() => {
    if (activeHook !== 'useEffect' || !showTooltip) return;
    measureAndPosition();
  }, [showTooltip, activeHook]);

  const toggleTooltip = () => {
    // Reset to bottom first to demonstrate potential flip
    setPlacement('bottom');
    setShowTooltip((prev) => !prev);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '6px' }}>
          Real-World: Collision-Aware Tooltip & Popover Positioning
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.5' }}>
          When computing dynamic positioning (like auto-flipping tooltips, dropdowns, or popovers),
          you must measure the DOM element's height/width before deciding where to display it.
        </p>
      </div>

      {/* Control Configuration Bar */}
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
        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Strategy:</span>

        <button
          onClick={() => {
            setActiveHook('useLayoutEffect');
            setShowTooltip(false);
          }}
          style={{
            background:
              activeHook === 'useLayoutEffect' ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
            color: activeHook === 'useLayoutEffect' ? '#0f172a' : 'var(--text-main)',
            fontWeight: activeHook === 'useLayoutEffect' ? 'bold' : 'normal',
            fontSize: '13px',
            padding: '6px 14px',
          }}
        >
          ⚡ useLayoutEffect (Zero Flicker)
        </button>

        <button
          onClick={() => {
            setActiveHook('useEffect');
            setShowTooltip(false);
          }}
          style={{
            background: activeHook === 'useEffect' ? 'var(--accent)' : 'rgba(255,255,255,0.06)',
            color: '#fff',
            fontWeight: activeHook === 'useEffect' ? 'bold' : 'normal',
            fontSize: '13px',
            padding: '6px 14px',
          }}
        >
          ⏱️ useEffect (Post-Paint Measurement)
        </button>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          Position: <strong style={{ color: 'var(--accent)' }}>{placement.toUpperCase()}</strong>{' '}
          | Height: {measuredHeight ? `${measuredHeight}px` : 'unmeasured'}
        </span>
      </div>

      {/* Interactive Trigger Demo Area */}
      <div
        style={{
          padding: '30px 20px',
          background: '#0b1120',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '220px',
          position: 'relative',
        }}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            ref={buttonRef}
            onClick={toggleTooltip}
            style={{
              background: 'var(--primary)',
              color: '#0f172a',
              fontWeight: 'bold',
              padding: '10px 20px',
              fontSize: '14px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>{showTooltip ? 'Hide Details' : 'Show Popover'}</span>
            <span>{showTooltip ? '▲' : '▼'}</span>
          </button>

          {/* Floating Popover Container */}
          {showTooltip && (
            <div
              ref={tooltipRef}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                // When placement is 'top', render above button; else render below
                ...(placement === 'top'
                  ? { bottom: 'calc(100% + 10px)' }
                  : { top: 'calc(100% + 10px)' }),
                width: '280px',
                padding: '14px',
                background: '#1e293b',
                color: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                zIndex: 50,
                fontSize: '13px',
                lineHeight: '1.4',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  paddingBottom: '6px',
                }}
              >
                <strong style={{ color: 'var(--accent)' }}>Dynamic Popover</strong>
                <span
                  style={{
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background:
                      activeHook === 'useLayoutEffect'
                        ? 'rgba(56, 189, 248, 0.2)'
                        : 'rgba(129, 140, 248, 0.2)',
                    color:
                      activeHook === 'useLayoutEffect' ? 'var(--primary)' : 'var(--accent)',
                  }}
                >
                  {activeHook}
                </span>
              </div>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px' }}>
                Measured DOM Height: <strong>{measuredHeight}px</strong>
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                Computed Placement:{' '}
                <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>
                  {placement.toUpperCase()}
                </span>{' '}
                (auto-flipped before paint to prevent visual jumping).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Production Guidelines Notice */}
      <div
        style={{
          padding: '14px 18px',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '6px',
        }}
      >
        <h4 style={{ color: '#fbbf24', fontSize: '14px', marginBottom: '6px' }}>
          ⚠️ Critical SSR (Server-Side Rendering) Consideration:
        </h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>
          <code>useLayoutEffect</code> does <strong>not</strong> run on the server (neither Next.js
          nor Node has a DOM to measure). In SSR environments, calling it directly can trigger a
          warning: <em>&quot;useLayoutEffect does nothing on the server&quot;</em>. Use a conditional
          isomorphic helper or gate the hook with <code>typeof window !== &apos;undefined&apos;</code>.
        </p>
      </div>
    </div>
  );
}
