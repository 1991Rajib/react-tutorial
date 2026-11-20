import { useState } from 'react';
import { REACT_QA_LIST } from './qaData';

export default function QaViewer() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState(new Set([REACT_QA_LIST[0].id]));
  const [testMode, setTestMode] = useState(false);

  const categories = [
    'All',
    'Core Fundamentals',
    'React 18 & 19 Concurrency',
    'MNC & Big 4 Scenario-Based',
    'Enterprise Architecture & System Design',
    'Performance & Optimization',
  ];

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(REACT_QA_LIST.map((q) => q.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const filteredQuestions = REACT_QA_LIST.filter((q) => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--text-main)' }}>
              🎯 MNC & Big 4 / FAANG React Interview Bank
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
              Deep-dive architectural & scenario-based questions asked at Google, Meta, Microsoft, Amazon, Deloitte, PwC, EY, KPMG & Accenture.
            </p>
          </div>
          <span
            style={{
              background: 'rgba(56, 189, 248, 0.15)',
              color: 'var(--primary)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {REACT_QA_LIST.length} Master Questions
          </span>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search keywords (e.g. race condition, bundle size, batching)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ minWidth: '320px', flex: 1 }}
          />

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedCategory === cat ? '#0f172a' : 'var(--text-main)',
                  border: '1px solid var(--border-color)',
                  fontSize: '12px',
                  padding: '6px 12px',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Actions row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={expandAll}
              style={{ fontSize: '12px', padding: '4px 10px', background: 'transparent', border: '1px solid var(--border-color)' }}
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              style={{ fontSize: '12px', padding: '4px 10px', background: 'transparent', border: '1px solid var(--border-color)' }}
            >
              Collapse All
            </button>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={testMode}
              onChange={(e) => {
                setTestMode(e.target.checked);
                if (e.target.checked) collapseAll();
              }}
            />
            <span>💡 <strong>Flashcard / Test Yourself Mode</strong> (Hides answers until clicked)</span>
          </label>
        </div>
      </div>

      {/* Questions Accordion List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredQuestions.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', padding: '20px' }}>
            No matching questions found for "{searchQuery}".
          </p>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedIds.has(q.id);

            return (
              <div
                key={q.id}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  border: isExpanded ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  transition: 'border-color 0.2s ease',
                }}
              >
                {/* Header (Question) */}
                <div
                  onClick={() => toggleExpand(q.id)}
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    background: isExpanded ? 'rgba(56, 189, 248, 0.05)' : 'transparent',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <span
                      style={{
                        fontSize: '11px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        color: q.category.includes('MNC') ? 'var(--warning)' : 'var(--accent)',
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {q.category}
                    </span>
                    <h4 style={{ fontSize: '15px', fontWeight: '600', color: isExpanded ? 'var(--primary)' : 'var(--text-main)', lineHeight: '1.4' }}>
                      {q.question}
                    </h4>
                  </div>

                  <span style={{ fontSize: '18px', color: 'var(--text-muted)', marginLeft: '16px' }}>
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>

                {/* Body (Answer & Explanation) */}
                {isExpanded && (
                  <div
                    style={{
                      padding: '20px',
                      background: '#0b1120',
                      borderTop: '1px solid var(--border-color)',
                    }}
                  >
                    <pre
                      style={{
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'inherit',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#e2e8f0',
                      }}
                    >
                      {q.answer}
                    </pre>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
