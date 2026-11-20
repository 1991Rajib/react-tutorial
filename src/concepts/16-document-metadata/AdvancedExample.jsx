import { useState } from 'react';

const ARTICLES = {
  react19: {
    title: 'What is New in React 19: Complete Guide',
    description: 'Deep dive into useActionState, useOptimistic, useFormStatus, and the use hook.',
    keywords: 'react 19, webdev, javascript, frontend',
    canonical: 'https://example.com/blog/react-19-guide',
  },
  ux: {
    title: 'Applying Jakob Nielsen 10 Heuristics to Modern Web',
    description: 'Designing intuitive, error-preventing user experiences in software.',
    keywords: 'ui, ux, heuristics, design systems',
    canonical: 'https://example.com/blog/ux-heuristics',
  },
};

export default function AdvancedExample() {
  const [selectedArticle, setSelectedArticle] = useState('react19');
  const article = ARTICLES[selectedArticle];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* React 19 automatically hoists all these meta and link tags! */}
      <title>{article.title}</title>
      <meta name="description" content={article.description} />
      <meta name="keywords" content={article.keywords} />
      <link rel="canonical" href={article.canonical} />

      <div>
        <h3>Dynamic Article SEO & Social Meta Hoisting</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Switch between the two articles to see full SEO and canonical metadata hoisted to the document <code>&lt;head&gt;</code>.
        </p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => setSelectedArticle('react19')}
            style={{
              background: selectedArticle === 'react19' ? 'var(--primary)' : 'var(--border-color)',
              color: selectedArticle === 'react19' ? '#0f172a' : '#fff',
            }}
          >
            React 19 Article
          </button>
          <button
            onClick={() => setSelectedArticle('ux')}
            style={{
              background: selectedArticle === 'ux' ? 'var(--primary)' : 'var(--border-color)',
              color: selectedArticle === 'ux' ? '#0f172a' : '#fff',
            }}
          >
            UX Heuristics Article
          </button>
        </div>

        <div className="card">
          <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>{article.title}</h4>
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>{article.description}</p>

          <div
            style={{
              background: '#0b1120',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: 'var(--text-muted)',
            }}
          >
            <p style={{ color: 'var(--accent)', marginBottom: '4px' }}>// Hoisted to &lt;head&gt; by React 19:</p>
            <p>&lt;title&gt;{article.title}&lt;/title&gt;</p>
            <p>&lt;meta name="description" content="{article.description}" /&gt;</p>
            <p>&lt;meta name="keywords" content="{article.keywords}" /&gt;</p>
            <p>&lt;link rel="canonical" href="{article.canonical}" /&gt;</p>
          </div>
        </div>
      </div>
    </div>
  );
}
