import { useId, useState } from 'react';

// Reusable accessible field component
function AccessibleField({ label, hint }) {
  // Generates a unique, stable ID for this instance
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
      <label htmlFor={id} style={{ fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        aria-describedby={hint ? hintId : undefined}
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
      {hint && (
        <span id={hintId} style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          ℹ️ {hint} (aria-describedby linked)
        </span>
      )}
    </div>
  );
}

export default function BasicExample() {
  return (
    <div>
      <h3>Unique Accessible Form Fields</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
        Notice: Even though <code>AccessibleField</code> is rendered twice with no manual ID passed, clicking either label focuses the exact matching input!
      </p>

      <div className="card" style={{ maxWidth: '400px' }}>
        <AccessibleField
          label="Account Username"
          hint="Must be between 4 and 20 alphanumeric characters"
        />
        <AccessibleField
          label="Work Email Address"
          hint="We will send your verification code here"
        />
      </div>
    </div>
  );
}
