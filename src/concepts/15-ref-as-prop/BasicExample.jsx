import { useRef } from 'react';

// Notice: NO React.forwardRef wrapper needed! `ref` is a regular prop.
function CustomField({ ref, label, placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label style={{ fontSize: '13px', fontWeight: 'bold' }}>{label}</label>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
          background: '#0b1120',
          color: 'var(--text-main)',
        }}
      />
    </div>
  );
}

export default function BasicExample() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>No More <code>forwardRef</code>!</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          In React 19, functional components accept <code>ref</code> directly as a normal prop.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '380px' }}>
          <CustomField
            ref={firstNameRef}
            label="First Name"
            placeholder="Focus via button..."
          />
          <CustomField
            ref={lastNameRef}
            label="Last Name"
            placeholder="Focus via button..."
          />

          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              onClick={() => firstNameRef.current?.focus()}
              style={{ background: 'var(--primary)', color: '#0f172a' }}
            >
              Focus First Name
            </button>
            <button
              onClick={() => lastNameRef.current?.focus()}
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              Focus Last Name
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
