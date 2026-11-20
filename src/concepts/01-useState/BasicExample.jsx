import { useState } from 'react';

export default function BasicExample() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Counter (Functional Updates)</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0' }}>
          Count: {count}
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Using functional updates is best practice */}
          <button onClick={() => setCount((prev) => prev - 1)}>-</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount((prev) => prev + 1)}>+</button>
        </div>
      </div>

      <hr style={{ borderColor: 'var(--border-color)' }} />

      <div>
        <h3>Toggle Switch</h3>
        <p style={{ margin: '8px 0' }}>
          Status: <strong>{isOn ? 'ACTIVE 🟢' : 'INACTIVE ⚪'}</strong>
        </p>
        <button
          onClick={() => setIsOn((prev) => !prev)}
          style={{
            background: isOn ? 'var(--success)' : 'var(--border-color)',
            color: '#fff',
          }}
        >
          {isOn ? 'Turn Off' : 'Turn On'}
        </button>
      </div>
    </div>
  );
}
