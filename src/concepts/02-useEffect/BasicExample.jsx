import { useState, useEffect } from 'react';

export default function BasicExample() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [clicks, setClicks] = useState(0);

  // Effect 1: Synchronizing with window resize event + CLEANUP
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Mandatory cleanup: runs on unmount or before effect re-runs
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array: runs only on mount/unmount

  // Effect 2: Synchronizing with browser document title
  useEffect(() => {
    document.title = `Clicked ${clicks} times`;
  }, [clicks]); // Only re-runs when `clicks` changes

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>1. Window Resize Listener</h3>
        <p style={{ margin: '8px 0', fontSize: '18px' }}>
          Current Window Width: <strong style={{ color: 'var(--primary)' }}>{windowWidth}px</strong>
        </p>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          (Try resizing your browser window to see this update live!)
        </p>
      </div>

      <hr style={{ borderColor: 'var(--border-color)' }} />

      <div>
        <h3>2. Document Title Synchronizer</h3>
        <p style={{ margin: '8px 0' }}>Click count: {clicks}</p>
        <button onClick={() => setClicks((c) => c + 1)}>
          Update Document Title
        </button>
      </div>
    </div>
  );
}
