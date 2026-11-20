import { useState, useMemo } from 'react';

// Simulated intentionally slow calculation
function slowFactorial(n) {
  console.log(`[slowFactorial] Calculating factorial of ${n}...`);
  let result = 1;
  // artificial loop to simulate CPU work
  for (let i = 1; i <= n * 10000000; i++) {
    // busy work
  }
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

export default function BasicExample() {
  const [number, setNumber] = useState(5);
  const [darkTheme, setDarkTheme] = useState(false);

  // Without useMemo, toggling the darkTheme button would recalculate this slow function!
  const factorialResult = useMemo(() => {
    return slowFactorial(number);
  }, [number]); // Only recomputes when `number` changes

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>useMemo: Expensive Calculation Caching</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
          Notice how toggling the theme below is instantaneous because the factorial calculation is cached!
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <label>Compute Factorial of:</label>
          <input
            type="number"
            min="1"
            max="12"
            value={number}
            onChange={(e) => setNumber(Math.max(1, Number(e.target.value)))}
            style={{ width: '80px' }}
          />
          <span>Factorial: <strong style={{ color: 'var(--primary)' }}>{factorialResult}</strong></span>
        </div>

        <button
          onClick={() => setDarkTheme((prev) => !prev)}
          style={{
            background: darkTheme ? '#f8fafc' : '#0b1120',
            color: darkTheme ? '#0f172a' : '#f8fafc',
            border: '1px solid var(--border-color)',
          }}
        >
          Toggle Card Color (Unrelated State: {darkTheme ? 'Light' : 'Dark'})
        </button>
      </div>
    </div>
  );
}
