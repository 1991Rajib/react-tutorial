import { useState } from 'react';
import { HOOK_COMPARISONS } from './comparisonsData';

export default function ComparisonViewer() {
  const [selectedId, setSelectedId] = useState(HOOK_COMPARISONS[0].id);
  const current = HOOK_COMPARISONS.find((c) => c.id === selectedId) || HOOK_COMPARISONS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--text-main)' }}>
          ⚖️ Head-to-Head Hook Comparisons
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          Side-by-side breakdowns of the most commonly confused hooks and concepts in React.
        </p>

        {/* Comparison Selector Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
          {HOOK_COMPARISONS.map((comp) => {
            const isSelected = comp.id === selectedId;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedId(comp.id)}
                style={{
                  background: isSelected ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: isSelected ? '#0f172a' : 'var(--text-main)',
                  border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  fontSize: '13px',
                }}
              >
                {comp.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Comparison Card */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '20px', color: 'var(--primary)' }}>{current.title}</h3>
          <p style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: '500', marginTop: '2px' }}>
            {current.tagline}
          </p>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {/* Left Column */}
          <div
            style={{
              background: '#0b1120',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h4 style={{ color: 'var(--text-main)', fontSize: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              {current.whenToUse.left.name}
            </h4>

            <div>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '6px' }}>
                BEST USED WHEN:
              </p>
              <ul style={{ paddingLeft: '16px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {current.whenToUse.left.bestFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>CODE SIGNATURE:</p>
              <pre className="code-box" style={{ fontSize: '12px' }}>
                {current.whenToUse.left.codeSnippet}
              </pre>
            </div>
          </div>

          {/* Right Column */}
          <div
            style={{
              background: '#0b1120',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h4 style={{ color: 'var(--primary)', fontSize: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
              {current.whenToUse.right.name}
            </h4>

            <div>
              <p style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '6px' }}>
                BEST USED WHEN:
              </p>
              <ul style={{ paddingLeft: '16px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {current.whenToUse.right.bestFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>CODE SIGNATURE:</p>
              <pre className="code-box" style={{ fontSize: '12px' }}>
                {current.whenToUse.right.codeSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* Golden Rule of Thumb */}
        <div
          style={{
            background: 'rgba(56, 189, 248, 0.08)',
            borderLeft: '4px solid var(--primary)',
            padding: '12px 16px',
            borderRadius: '4px',
          }}
        >
          <h5 style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>
            💡 Golden Rule of Thumb
          </h5>
          <p style={{ fontSize: '13px', color: '#e2e8f0' }}>{current.ruleOfThumb}</p>
        </div>
      </div>
    </div>
  );
}
