import { useState, useRef, useEffect } from 'react';

export default function BasicExample() {
  const PIN_LENGTH = 6;
  const [digits, setDigits] = useState(Array(PIN_LENGTH).fill(''));
  const [isVerified, setIsVerified] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 1. Array of DOM element refs for each individual input box
  const inputRefs = useRef([]);

  // 2. Mutable Ref: Storing previous completed PIN without causing re-renders
  const prevPinRef = useRef('');

  // Auto-focus the first input box on initial mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    // Only accept numeric single characters
    const cleanChar = value.slice(-1);
    if (value && !/^\d+$/.test(cleanChar)) return;

    setErrorMsg('');
    const newDigits = [...digits];
    newDigits[index] = cleanChar;
    setDigits(newDigits);

    // Auto-advance focus to the next input if digit entered
    if (cleanChar && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify if all digits filled
    const fullPin = newDigits.join('');
    if (fullPin.length === PIN_LENGTH) {
      prevPinRef.current = fullPin;
      if (fullPin === '482910') {
        setIsVerified(true);
      } else {
        setErrorMsg('Invalid PIN. (Try demo PIN: 482910)');
      }
    } else {
      setIsVerified(false);
    }
  };

  const handleKeyDown = (index, e) => {
    // On Backspace, move focus to previous input if current is empty
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pastedData)) {
      setErrorMsg('Pasted content must be numbers only.');
      return;
    }

    const pastedDigits = pastedData.slice(0, PIN_LENGTH).split('');
    const newDigits = [...digits];
    pastedDigits.forEach((digit, i) => {
      newDigits[i] = digit;
    });
    setDigits(newDigits);

    // Focus either the next empty slot or the last digit
    const nextEmptyIndex = newDigits.findIndex((d) => !d);
    const targetFocus = nextEmptyIndex === -1 ? PIN_LENGTH - 1 : nextEmptyIndex;
    inputRefs.current[targetFocus]?.focus();

    if (newDigits.join('') === '482910') {
      setIsVerified(true);
    }
  };

  const handleClear = () => {
    setDigits(Array(PIN_LENGTH).fill(''));
    setIsVerified(false);
    setErrorMsg('');
    inputRefs.current[0]?.focus();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Multi-Field OTP / PIN Security Input</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Demonstrates direct DOM manipulation via <code>useRef</code> arrays (auto-advancing focus, backspace navigation, paste handling) without triggering re-render cascades.
        </p>
      </div>

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
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: '16px', color: 'var(--primary)', marginBottom: '4px' }}>
            Two-Factor Authentication
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Enter your 6-digit confirmation code. <em>(Hint: use <strong>482910</strong> or paste any 6 digits)</em>
          </p>
        </div>

        {/* 6 Digit Input Group */}
        <div style={{ display: 'flex', gap: '10px' }} onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: '44px',
                height: '52px',
                textAlign: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                borderRadius: '8px',
                border: `2px solid ${
                  isVerified
                    ? 'var(--success)'
                    : digit
                    ? 'var(--primary)'
                    : 'var(--border-color)'
                }`,
                background: 'rgba(255,255,255,0.04)',
                color: '#fff',
              }}
            />
          ))}
        </div>

        {/* Status Messages */}
        {isVerified && (
          <div
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              color: 'var(--success)',
              fontWeight: 'bold',
              fontSize: '13px',
            }}
          >
            ✓ PIN Verified Successfully! Access Granted.
          </div>
        )}

        {errorMsg && (
          <div style={{ color: 'var(--danger)', fontSize: '12px', fontWeight: 'bold' }}>
            {errorMsg}
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => {
              const demo = '482910'.split('');
              setDigits(demo);
              setIsVerified(true);
              setErrorMsg('');
              inputRefs.current[5]?.focus();
            }}
            style={{ fontSize: '12px', padding: '6px 14px' }}
          >
            Fill Demo PIN
          </button>
          <button
            onClick={handleClear}
            style={{
              fontSize: '12px',
              padding: '6px 14px',
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
            }}
          >
            Clear Fields
          </button>
        </div>

        {/* Explanation Card */}
        <div
          style={{
            width: '100%',
            maxWidth: '480px',
            marginTop: '8px',
            padding: '12px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Active Focus Control: <strong>inputRefs.current[i]</strong></span>
          <span>Last Verified PIN in Ref: <strong>{prevPinRef.current || 'none'}</strong></span>
        </div>
      </div>
    </div>
  );
}
