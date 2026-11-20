import { createContext, useContext, useState } from 'react';

// 1. Create the Context
const ThemeContext = createContext('dark');

// Deep child component consuming the context
function ThemedCard() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isLight = theme === 'light';

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        background: isLight ? '#f8fafc' : '#0b1120',
        color: isLight ? '#0f172a' : '#f8fafc',
        border: `1px solid ${isLight ? '#cbd5e1' : 'var(--border-color)'}`,
        transition: 'all 0.3s ease',
      }}
    >
      <h4>Deep Child Component</h4>
      <p style={{ margin: '8px 0', fontSize: '14px' }}>
        Current Theme: <strong>{theme.toUpperCase()}</strong>
      </p>
      <button
        onClick={toggleTheme}
        style={{
          background: isLight ? '#0f172a' : 'var(--primary)',
          color: isLight ? '#ffffff' : '#0f172a',
        }}
      >
        Switch to {isLight ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default function BasicExample() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div>
      <h3>React 19 Direct Context Provider</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
        Notice: In React 19, we write <code>&lt;ThemeContext value=...&gt;</code> instead of <code>&lt;ThemeContext.Provider&gt;</code>!
      </p>

      {/* React 19 syntax: Direct Context as Provider */}
      <ThemeContext value={{ theme, toggleTheme }}>
        <ThemedCard />
      </ThemeContext>
    </div>
  );
}
