import { useReducer, useState } from 'react';

// Initial state for Undo / Redo history machine
const initialEditorState = {
  past: [],
  present: 'Welcome to the React 19 Architectural Document Editor.',
  future: [],
};

function historyReducer(state, action) {
  const { past, present, future } = state;

  switch (action.type) {
    case 'SET_TEXT':
      // If content is identical, do nothing
      if (action.payload === present) return state;
      return {
        past: [...past, present],
        present: action.payload,
        future: [], // New action invalidates future redo branch
      };

    case 'UNDO':
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };

    case 'REDO':
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };

    case 'CLEAR':
      return {
        past: [...past, present],
        present: '',
        future: [],
      };

    default:
      return state;
  }
}

export default function BasicExample() {
  const [editorState, dispatch] = useReducer(historyReducer, initialEditorState);
  const [lastActionTime, setLastActionTime] = useState(null);

  const handleTextChange = (e) => {
    dispatch({ type: 'SET_TEXT', payload: e.target.value });
    setLastActionTime(new Date().toLocaleTimeString());
  };

  const insertSnippet = (snippet) => {
    const updated = editorState.present
      ? `${editorState.present}\n\n${snippet}`
      : snippet;
    dispatch({ type: 'SET_TEXT', payload: updated });
    setLastActionTime(new Date().toLocaleTimeString());
  };

  const canUndo = editorState.past.length > 0;
  const canRedo = editorState.future.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Undo / Redo History State Machine</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          <code>useReducer</code> shines when multiple state branches (past, present, future) must transition atomically in response to single user actions.
        </p>
      </div>

      <div
        style={{
          background: '#0b1120',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        {/* Toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => dispatch({ type: 'UNDO' })}
              disabled={!canUndo}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                background: canUndo ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: canUndo ? '#0f172a' : 'var(--text-muted)',
                fontWeight: 'bold',
              }}
            >
              ↶ Undo ({editorState.past.length})
            </button>

            <button
              onClick={() => dispatch({ type: 'REDO' })}
              disabled={!canRedo}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                background: canRedo ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: canRedo ? '#0f172a' : 'var(--text-muted)',
                fontWeight: 'bold',
              }}
            >
              ↷ Redo ({editorState.future.length})
            </button>

            <button
              onClick={() => dispatch({ type: 'CLEAR' })}
              disabled={!editorState.present}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
              }}
            >
              Clear Editor
            </button>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Characters: <strong>{editorState.present.length}</strong> | Words:{' '}
            <strong>{editorState.present.trim() ? editorState.present.trim().split(/\s+/).length : 0}</strong>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          rows={6}
          value={editorState.present}
          onChange={handleTextChange}
          placeholder="Start typing or use the quick-insert templates below..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            lineHeight: '1.6',
            borderRadius: '6px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-color)',
            color: '#f8fafc',
            fontFamily: 'inherit',
          }}
        />

        {/* Quick Insert Snippets */}
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginRight: '8px' }}>
            Quick Template Inserts:
          </span>
          <div style={{ display: 'inline-flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
            <button
              onClick={() => insertSnippet('## Executive Summary\nAll key deliverables completed ahead of schedule.')}
              style={{ fontSize: '11px', padding: '4px 8px', background: 'rgba(255,255,255,0.05)' }}
            >
              + Executive Summary
            </button>
            <button
              onClick={() => insertSnippet('```typescript\nconst result = await client.query();\n```')}
              style={{ fontSize: '11px', padding: '4px 8px', background: 'rgba(255,255,255,0.05)' }}
            >
              + Code Snippet
            </button>
            <button
              onClick={() => insertSnippet('Signed-off by Engineering Architect on ' + new Date().toLocaleDateString())}
              style={{ fontSize: '11px', padding: '4px 8px', background: 'rgba(255,255,255,0.05)' }}
            >
              + Sign-off Stamp
            </button>
          </div>
        </div>

        {/* History State Machine Diagnostics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            padding: '12px',
            background: 'rgba(255,255,255,0.02)',
            borderRadius: '6px',
            fontSize: '12px',
          }}
        >
          <div>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Past Undo Stack:</span>
            <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
              {editorState.past.length} previous snapshot{editorState.past.length === 1 ? '' : 's'} stored
            </div>
          </div>
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Future Redo Stack:</span>
            <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
              {editorState.future.length} future snapshot{editorState.future.length === 1 ? '' : 's'} available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
