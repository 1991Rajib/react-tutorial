import { useId, useState } from 'react';

// Reusable accessible input with composite label, hint, and error IDs
function AccessibleInputField({ label, hint, value, onChange, error }) {
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const hintId = `${baseId}-hint`;
  const errorId = `${baseId}-error`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label htmlFor={inputId} style={{ fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
        {label}
      </label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={`${hint ? hintId : ''} ${error ? errorId : ''}`.trim() || undefined}
        aria-invalid={Boolean(error)}
        placeholder={`Enter ${label.toLowerCase()}...`}
        style={{
          padding: '8px 12px',
          fontSize: '13px',
          borderColor: error ? 'var(--danger)' : undefined,
          borderRadius: '6px',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '2px' }}>
        {error ? (
          <span id={errorId} style={{ color: 'var(--danger)', fontWeight: 'bold' }}>
            ⚠ {error}
          </span>
        ) : hint ? (
          <span id={hintId} style={{ color: 'var(--text-muted)' }}>
            ℹ {hint}
          </span>
        ) : null}
        <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
          id: &quot;{inputId}&quot;
        </span>
      </div>
    </div>
  );
}

// Reusable Accessible Radio Group sharing a unified group name
function AccessibleDeliveryRadioGroup({ selectedOption, onSelect }) {
  const radioGroupId = useId();

  const options = [
    { id: 'std', label: 'Standard Shipping (3-5 days)', cost: '$4.99' },
    { id: 'exp', label: 'Express Priority (1-2 days)', cost: '$12.99' },
    { id: 'ovn', label: 'Overnight Air Courier', cost: '$24.99' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
        Select Delivery Tier (Group: <code>{radioGroupId}</code>):
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {options.map((opt) => {
          const itemDomId = `${radioGroupId}-${opt.id}`;
          return (
            <label
              key={opt.id}
              htmlFor={itemDomId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: '6px',
                background: selectedOption === opt.id ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${selectedOption === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  id={itemDomId}
                  type="radio"
                  name={radioGroupId}
                  value={opt.id}
                  checked={selectedOption === opt.id}
                  onChange={() => onSelect(opt.id)}
                />
                <span>{opt.label}</span>
              </div>
              <strong style={{ color: 'var(--primary)' }}>{opt.cost}</strong>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function BasicExample() {
  const [taxId, setTaxId] = useState('');
  const [legalName, setLegalName] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('exp');

  const agreementId = useId();
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Accessible Hydration-Safe Form Identifiers</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          <code>useId</code> generates unique, stable IDs across server-rendered HTML and client hydration.
          It prevents ID collisions when components are rendered multiple times on the same page.
        </p>
      </div>

      <div
        style={{
          background: '#0b1120',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          maxWidth: '560px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <AccessibleInputField
          label="Legal Business Name"
          hint="Must match your official company tax registration"
          value={legalName}
          onChange={setLegalName}
          error={legalName && legalName.length < 3 ? 'Name must be at least 3 characters.' : ''}
        />

        <AccessibleInputField
          label="Corporate Tax ID / VAT Number"
          hint="e.g. US EIN 12-3456789 or EU VAT"
          value={taxId}
          onChange={setTaxId}
          error={taxId && taxId.length < 5 ? 'Invalid tax identifier format.' : ''}
        />

        <AccessibleDeliveryRadioGroup
          selectedOption={deliveryOption}
          onSelect={setDeliveryOption}
        />

        {/* Checkbox linked with useId */}
        <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
          <label htmlFor={agreementId} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
            <input
              id={agreementId}
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>I confirm tax documentation is accurate and agree to terms (id: <code>{agreementId}</code>)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
