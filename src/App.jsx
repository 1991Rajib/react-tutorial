import { useState } from 'react';
import { TOPICS } from './topicsRegistry';
import { TOPIC_DOCS } from './topicDocs';
import ComparisonViewer from './comparisons/ComparisonViewer';
import QaViewer from './qa/QaViewer';

export default function App() {
  const [viewMode, setViewMode] = useState('concepts'); // 'concepts' | 'comparisons' | 'qa'
  const [selectedTopicId, setSelectedTopicId] = useState('01-useState');
  const [activeTab, setActiveTab] = useState('doc'); // 'doc' | 'basic' | 'advanced'
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [searchFilter, setSearchFilter] = useState('');

  const currentTopicIndex = TOPICS.findIndex((t) => t.id === selectedTopicId);
  const currentTopic = TOPICS[currentTopicIndex] || TOPICS[0];
  const currentDoc = TOPIC_DOCS[currentTopic.id] || {};

  const toggleCompleted = (id) => {
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const goToNext = () => {
    if (currentTopicIndex < TOPICS.length - 1) {
      setSelectedTopicId(TOPICS[currentTopicIndex + 1].id);
    }
  };

  const goToPrev = () => {
    if (currentTopicIndex > 0) {
      setSelectedTopicId(TOPICS[currentTopicIndex - 1].id);
    }
  };

  const filteredTopics = TOPICS.filter(
    (t) =>
      t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const categories = [
    'Foundations (Modernized)',
    'Concurrency & Utilities',
    'React 19 Breakthroughs',
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
      {/* Sidebar Navigation */}
      <aside
        style={{
          width: '320px',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* App Title & Master Mode Toggles */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚛️</span> React 16 ➔ 19 Lab
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', marginTop: '14px' }}>
            <button
              onClick={() => setViewMode('concepts')}
              style={{
                background: viewMode === 'concepts' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: viewMode === 'concepts' ? '#0f172a' : 'var(--text-main)',
                fontSize: '13px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>📚</span> All {TOPICS.length} Concepts & Hooks
            </button>
            <button
              onClick={() => setViewMode('comparisons')}
              style={{
                background: viewMode === 'comparisons' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: viewMode === 'comparisons' ? '#0f172a' : 'var(--text-main)',
                fontSize: '13px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>⚖️</span> Hook Comparisons (Head-to-Head)
            </button>
            <button
              onClick={() => setViewMode('qa')}
              style={{
                background: viewMode === 'qa' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: viewMode === 'qa' ? '#0f172a' : 'var(--text-main)',
                fontSize: '13px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🎯</span> Interview Q&A Flashcards
            </button>
          </div>
        </div>

        {/* Sidebar Concepts List */}
        {viewMode === 'concepts' ? (
          <>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  Concepts ({completedTopics.size}/{TOPICS.length} Done)
                </span>
              </div>
              <input
                type="text"
                placeholder="Filter topics..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
              {categories.map((cat) => {
                const catTopics = filteredTopics.filter((t) => t.category === cat);
                if (catTopics.length === 0) return null;

                return (
                  <div key={cat} style={{ marginBottom: '16px' }}>
                    <p
                      style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        fontWeight: 'bold',
                        padding: '4px 12px',
                      }}
                    >
                      {cat}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px' }}>
                      {catTopics.map((topic) => {
                        const isSelected = topic.id === selectedTopicId;
                        const isDone = completedTopics.has(topic.id);

                        return (
                          <div
                            key={topic.id}
                            onClick={() => setSelectedTopicId(topic.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                              color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                              fontWeight: isSelected ? '600' : 'normal',
                              fontSize: '13px',
                              border: isSelected ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCompleted(topic.id);
                                }}
                                style={{
                                  cursor: 'pointer',
                                  color: isDone ? 'var(--success)' : 'var(--text-muted)',
                                  fontSize: '14px',
                                }}
                                title="Mark as completed"
                              >
                                {isDone ? '✅' : '⚪'}
                              </span>
                              <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                {topic.name}
                              </span>
                            </div>

                            <span
                              className={`badge ${
                                topic.version.includes('19')
                                  ? 'badge-r19'
                                  : topic.version.includes('18')
                                  ? 'badge-r18'
                                  : 'badge-r16'
                              }`}
                            >
                              {topic.version.replace(' 🔥', '')}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div style={{ padding: '20px', flex: 1, color: 'var(--text-muted)', fontSize: '13px' }}>
            <p>
              You are currently viewing <strong>{viewMode === 'comparisons' ? 'Hook Comparisons' : 'Interview Q&A'}</strong>.
            </p>
            <p style={{ marginTop: '8px' }}>
              Click <strong>&quot;All {TOPICS.length} Concepts & Hooks&quot;</strong> above to return to individual hook demos and code playgrounds.
            </p>
          </div>
        )}

        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-muted)' }}>
          Tip: Open <code>src/concepts/</code> in your code editor to edit examples live!
        </div>
      </aside>

      {/* Main Content Stage */}
      <main style={{ flex: 1, padding: '32px 40px', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* VIEW 1: Comparisons */}
        {viewMode === 'comparisons' && <ComparisonViewer />}

        {/* VIEW 2: Q&A */}
        {viewMode === 'qa' && <QaViewer />}

        {/* VIEW 3: Concepts */}
        {viewMode === 'concepts' && (
          <>
            {/* Header */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 'bold' }}>
                  {currentTopic.category}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>/</span>
                <span className="badge badge-r19">{currentTopic.version}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                  {currentTopic.name}
                </h1>

                <button
                  onClick={() => toggleCompleted(currentTopic.id)}
                  style={{
                    background: completedTopics.has(currentTopic.id) ? 'rgba(52, 211, 153, 0.2)' : 'transparent',
                    color: completedTopics.has(currentTopic.id) ? 'var(--success)' : 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                    fontSize: '13px',
                  }}
                >
                  {completedTopics.has(currentTopic.id) ? '✓ Completed' : 'Mark as Done'}
                </button>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
                {currentTopic.summary}
              </p>

              <p style={{ fontSize: '12px', color: 'var(--primary)', marginTop: '4px', fontFamily: 'monospace' }}>
                📁 {currentTopic.folder}
              </p>
            </div>

            {/* Tab Navigation */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <button
                onClick={() => setActiveTab('doc')}
                style={{
                  background: activeTab === 'doc' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'doc' ? '#0f172a' : 'var(--text-muted)',
                }}
              >
                📖 How to Write It & Deep Info
              </button>
              <button
                onClick={() => setActiveTab('basic')}
                style={{
                  background: activeTab === 'basic' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'basic' ? '#0f172a' : 'var(--text-muted)',
                }}
              >
                🟢 Basic Example (Live)
              </button>
              <button
                onClick={() => setActiveTab('advanced')}
                style={{
                  background: activeTab === 'advanced' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'advanced' ? '#0f172a' : 'var(--text-muted)',
                }}
              >
                🚀 Advanced Example (Live)
              </button>
            </div>

            {/* Tab 1: Comprehensive Documentation & How to Write It */}
            {activeTab === 'doc' && (
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Quick Syntax & Import */}
                <div>
                  <h3 style={{ color: 'var(--primary)', fontSize: '18px', marginBottom: '10px' }}>
                    ✍️ How to Import & Call {currentTopic.name}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentDoc.importSnippet && (
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold' }}>IMPORT:</span>
                        <pre className="code-box" style={{ marginTop: '4px' }}>{currentDoc.importSnippet}</pre>
                      </div>
                    )}
                    {currentDoc.signature && (
                      <div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold' }}>SIGNATURE / SKELETON:</span>
                        <pre className="code-box" style={{ marginTop: '4px', color: '#7dd3fc' }}>{currentDoc.signature}</pre>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Step-by-Step Implementation Recipe */}
                {currentDoc.howToWriteSteps && currentDoc.howToWriteSteps.length > 0 && (
                  <div>
                    <h3 style={{ color: 'var(--accent)', fontSize: '17px', marginBottom: '12px' }}>
                      🛠️ Step-by-Step Implementation Recipe
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {currentDoc.howToWriteSteps.map((s) => (
                        <div
                          key={s.step}
                          style={{
                            background: '#0b1120',
                            border: '1px solid var(--border-color)',
                            borderRadius: '8px',
                            padding: '14px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span
                              style={{
                                background: 'var(--accent)',
                                color: '#fff',
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: 'bold',
                              }}
                            >
                              {s.step}
                            </span>
                            <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                              {s.title}
                            </h4>
                          </div>

                          <pre className="code-box" style={{ marginBottom: '8px', fontSize: '12px' }}>
                            {s.code}
                          </pre>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                            ℹ️ {s.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Parameters & Returns Breakdown */}
                {((currentDoc.parameters && currentDoc.parameters.length > 0) || (currentDoc.returns && currentDoc.returns.length > 0)) && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {/* Parameters */}
                    <div style={{ background: '#0b1120', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <h4 style={{ color: 'var(--primary)', fontSize: '15px', marginBottom: '10px' }}>
                        📥 Parameters Accepted
                      </h4>
                      {currentDoc.parameters.length === 0 ? (
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Takes no arguments.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {currentDoc.parameters.map((p, idx) => (
                            <div key={idx} style={{ fontSize: '13px' }}>
                              <p>
                                <strong style={{ color: 'var(--primary)' }}>{p.name}</strong>{' '}
                                <code style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '3px' }}>{p.type}</code>{' '}
                                {p.required && <span style={{ color: 'var(--danger)', fontSize: '11px' }}>*required</span>}
                              </p>
                              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>
                                {p.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Returns */}
                    <div style={{ background: '#0b1120', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <h4 style={{ color: 'var(--success)', fontSize: '15px', marginBottom: '10px' }}>
                        📤 Return Values
                      </h4>
                      {currentDoc.returns.length === 0 ? (
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Returns nothing (void).</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {currentDoc.returns.map((r, idx) => (
                            <div key={idx} style={{ fontSize: '13px' }}>
                              <p>
                                <strong style={{ color: 'var(--success)' }}>{r.name}</strong>{' '}
                                <code style={{ fontSize: '11px', background: 'rgba(255,255,255,0.08)', padding: '1px 5px', borderRadius: '3px' }}>{r.type}</code>
                              </p>
                              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>
                                {r.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. Why it Matters */}
                <div>
                  <h3 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '16px' }}>
                    💡 Why it Matters & Purpose
                  </h3>
                  <p style={{ fontSize: '14px', lineHeight: '1.6' }}>{currentDoc.whyItMatters}</p>
                </div>

                {/* 5. React 16 vs Modern React */}
                <div style={{ background: '#0b1120', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '10px', fontSize: '15px' }}>
                    🔄 React 16 vs Modern React
                  </h4>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '13px', lineHeight: '1.6', color: '#e2e8f0' }}>
                    {currentDoc.react16VsModern}
                  </pre>
                </div>

                {/* 6. Common Mistakes */}
                {currentDoc.commonMistakes && currentDoc.commonMistakes.length > 0 && (
                  <div style={{ background: 'rgba(248, 113, 113, 0.05)', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: '8px', padding: '16px' }}>
                    <h4 style={{ color: 'var(--danger)', fontSize: '15px', marginBottom: '10px' }}>
                      ⚠️ Common Pitfalls & Traps to Avoid
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentDoc.commonMistakes.map((m, idx) => (
                        <div key={idx} style={{ fontSize: '13px' }}>
                          <p style={{ color: '#fca5a5', fontWeight: '500' }}>❌ {m.mistake}</p>
                          <p style={{ color: 'var(--text-muted)', marginLeft: '18px', marginTop: '2px' }}>
                            ✅ <strong>Fix:</strong> {m.solution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Key Takeaway */}
                <div style={{ borderLeft: '4px solid var(--success)', paddingLeft: '14px' }}>
                  <h4 style={{ color: 'var(--success)', marginBottom: '4px', fontSize: '14px' }}>Key Takeaway</h4>
                  <p style={{ fontSize: '13px' }}>{currentDoc.keyTakeaway}</p>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    👉 Test this hook hands-on by switching to the <strong>"Basic Example (Live)"</strong> or <strong>"Advanced Example (Live)"</strong> tab above!
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Basic Example */}
            {activeTab === 'basic' && (
              <div className="card">
                <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h3 style={{ color: 'var(--primary)' }}>Basic Interactive Demo</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Source code: <code>{currentTopic.folder}/BasicExample.jsx</code>
                  </p>
                </div>
                <currentTopic.BasicComponent />
              </div>
            )}

            {/* Tab 3: Advanced Example */}
            {activeTab === 'advanced' && (
              <div className="card">
                <div style={{ marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h3 style={{ color: 'var(--accent)' }}>Advanced Real-World Demo</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Source code: <code>{currentTopic.folder}/AdvancedExample.jsx</code>
                  </p>
                </div>
                <currentTopic.AdvancedComponent />
              </div>
            )}

            {/* Footer Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <button
                onClick={goToPrev}
                disabled={currentTopicIndex === 0}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-color)',
                  color: currentTopicIndex === 0 ? 'var(--text-muted)' : 'var(--text-main)',
                  cursor: currentTopicIndex === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Previous Concept
              </button>

              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Topic {currentTopicIndex + 1} of {TOPICS.length}
              </span>

              <button
                onClick={goToNext}
                disabled={currentTopicIndex === TOPICS.length - 1}
                style={{
                  background: 'var(--primary)',
                  color: '#0f172a',
                  fontWeight: 'bold',
                  cursor: currentTopicIndex === TOPICS.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: currentTopicIndex === TOPICS.length - 1 ? 0.5 : 1,
                }}
              >
                Next Concept →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
