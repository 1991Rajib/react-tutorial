import { useRef } from 'react';

// COMPONENT 1: Search Input receiving `ref` directly as a regular prop
function SearchInput({ ref, placeholder, onSearch }) {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: '8px 12px',
          borderRadius: '6px',
          background: '#0b1120',
          border: '1px solid var(--border-color)',
          fontSize: '13px',
        }}
      />
      <button
        onClick={onSearch}
        style={{ background: 'var(--primary)', color: '#0f172a', fontWeight: 'bold', fontSize: '12px', padding: '8px 14px' }}
      >
        Search
      </button>
    </div>
  );
}

// COMPONENT 2: Auto-Expanding Textarea receiving `ref` directly as a regular prop
function AutoExpandingTextarea({ ref, placeholder }) {
  const handleInput = (e) => {
    // Auto-adjust height based on content scrollHeight
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <textarea
      ref={ref}
      rows={3}
      onInput={handleInput}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px 12px',
        borderRadius: '6px',
        background: '#0b1120',
        border: '1px solid var(--border-color)',
        color: '#f8fafc',
        fontSize: '13px',
        lineHeight: '1.5',
        resize: 'none',
      }}
    />
  );
}

export default function BasicExample() {
  // Plain refs pointing to child component inputs without forwardRef!
  const searchInputRef = useRef(null);
  const textareaRef = useRef(null);

  const focusSearch = () => {
    searchInputRef.current?.focus();
    searchInputRef.current?.select();
  };

  const focusAndAppendText = () => {
    if (!textareaRef.current) return;
    textareaRef.current.focus();
    textareaRef.current.value += (textareaRef.current.value ? '\n' : '') + '- Appended audit note from parent button';
    // Trigger height expansion
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Ref as a Regular Prop (No forwardRef Needed)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          In React 19, functional components accept <code>ref</code> directly like any standard prop.
          The legacy <code>React.forwardRef</code> wrapper is officially obsolete!
        </p>
      </div>

      <div
        style={{
          background: '#0b1120',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          maxWidth: '540px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
            Custom Search Field (receives <code>ref</code> directly):
          </label>
          <SearchInput
            ref={searchInputRef}
            placeholder="Type query or focus via button..."
            onSearch={() => alert(`Search query: ${searchInputRef.current?.value || 'empty'}`)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
            Custom Auto-Expanding Textarea (receives <code>ref</code> directly):
          </label>
          <AutoExpandingTextarea
            ref={textareaRef}
            placeholder="Type long multi-line notes or click the append button below..."
          />
        </div>

        {/* Parent Imperative Control Actions */}
        <div style={{ display: 'flex', gap: '10px', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={focusSearch}
            style={{ fontSize: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.06)' }}
          >
            🎯 Focus Search Bar
          </button>
          <button
            onClick={focusAndAppendText}
            style={{ fontSize: '12px', padding: '6px 14px', background: 'rgba(255,255,255,0.06)' }}
          >
            ✍ Append Note to Textarea
          </button>
        </div>
      </div>
    </div>
  );
}
