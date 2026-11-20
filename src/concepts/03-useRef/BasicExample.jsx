import { useState, useRef, useEffect } from 'react';

export default function BasicExample() {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  // Storing previous value without triggering a re-render
  const prevTextRef = useRef('');

  useEffect(() => {
    prevTextRef.current = text;
  }, [text]);

  const handleFocus = () => {
    // Directly focus the input DOM node
    inputRef.current?.focus();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>1. DOM Reference (Direct Focus)</h3>
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Click button to focus me..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleFocus} style={{ background: 'var(--primary)', color: '#0f172a' }}>
            Focus Input
          </button>
        </div>
      </div>

      <hr style={{ borderColor: 'var(--border-color)' }} />

      <div>
        <h3>2. Tracking Previous Value</h3>
        <p style={{ margin: '8px 0' }}>Current Value: <strong>{text || '(empty)'}</strong></p>
        <p style={{ margin: '8px 0', color: 'var(--text-muted)' }}>
          Previous Value: <strong>{prevTextRef.current || '(none)'}</strong>
        </p>
      </div>
    </div>
  );
}
