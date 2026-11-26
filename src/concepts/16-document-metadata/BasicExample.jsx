import { useState } from 'react';

const PRODUCTS = {
  macbook: {
    name: 'MacBook Pro 16" (M4 Max)',
    price: '$3,499',
    category: 'Workstations',
    slug: 'macbook-pro-16-m4',
    summary: 'Extreme computing performance with Apple M4 Max, 48GB unified memory, and Liquid Retina XDR display.',
    keywords: 'apple, macbook, m4 max, laptop, workstation',
  },
  headphones: {
    name: 'Bose QuietComfort Ultra Headphones',
    price: '$429',
    category: 'Audio',
    slug: 'bose-qc-ultra',
    summary: 'World-class spatial audio, active noise cancellation, and all-day comfort with 24-hour battery life.',
    keywords: 'bose, noise cancelling, spatial audio, headphones',
  },
  monitor: {
    name: 'Dell UltraSharp 32" 6K Monitor',
    price: '$2,199',
    category: 'Displays',
    slug: 'dell-ultrasharp-32-6k',
    summary: 'Stunning 6K clarity with IPS Black technology, integrated 4K webcam, and 140W Thunderbolt 4 hub.',
    keywords: 'dell, 6k monitor, display, ultrasharp, ips black',
  },
};

export default function BasicExample() {
  const [selectedKey, setSelectedKey] = useState('macbook');
  const product = PRODUCTS[selectedKey];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* ✨ REACT 19 NATIVE HOISTING:
          These tags are declared right here in JSX, but React automatically hoists them to HTML <head>! */}
      <title>{`${product.name} - ${product.price} | Storefront`}</title>
      <meta name="description" content={product.summary} />
      <meta name="keywords" content={product.keywords} />
      <link rel="canonical" href={`https://store.example.com/products/${product.slug}`} />

      <div>
        <h3 style={{ marginBottom: '4px' }}>Native Document Metadata Hoisting (&lt;title&gt;, &lt;meta&gt;)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          In React 19, you can render <code>&lt;title&gt;</code>, <code>&lt;meta&gt;</code>, and <code>&lt;link&gt;</code> tags
          anywhere inside your components. React automatically hoists them into the browser document <code>&lt;head&gt;</code>!
        </p>
      </div>

      {/* Product Switcher Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          background: '#0b1120',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Choose Product:</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.entries(PRODUCTS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => setSelectedKey(key)}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                background: selectedKey === key ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: selectedKey === key ? '#0f172a' : 'var(--text-main)',
                fontWeight: selectedKey === key ? 'bold' : 'normal',
              }}
            >
              {p.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Product Display Card & Metadata Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        {/* Left: Product View */}
        <div
          style={{
            background: '#0b1120',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '11px', color: 'var(--accent)', textTransform: 'uppercase' }}>
            {product.category}
          </span>
          <h4 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>{product.name}</h4>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--primary)' }}>
            {product.price}
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
            {product.summary}
          </p>
        </div>

        {/* Right: Live HTML <head> Hoisting Proof */}
        <div
          style={{
            background: '#0b1120',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <h4 style={{ fontSize: '13px', color: 'var(--primary)', margin: 0 }}>
            Live Document &lt;head&gt; Hoisting Inspector
          </h4>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
            Check your browser tab title above! It matches the live document title below:
          </p>

          <div
            style={{
              padding: '10px',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.03)',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: 'var(--text-main)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div>
              <span style={{ color: 'var(--accent)' }}>&lt;title&gt;</span>
              <span style={{ color: 'var(--primary)' }}>{product.name} - {product.price} | Storefront</span>
              <span style={{ color: 'var(--accent)' }}>&lt;/title&gt;</span>
            </div>

            <div>
              <span style={{ color: 'var(--accent)' }}>&lt;meta </span>
              <span style={{ color: '#fff' }}>name=</span>
              <span style={{ color: 'var(--success)' }}>&quot;description&quot;</span>
              <span style={{ color: '#fff' }}> content=</span>
              <span style={{ color: 'var(--text-muted)' }}>&quot;{product.summary.slice(0, 45)}...&quot;</span>
              <span style={{ color: 'var(--accent)' }}> /&gt;</span>
            </div>

            <div>
              <span style={{ color: 'var(--accent)' }}>&lt;link </span>
              <span style={{ color: '#fff' }}>rel=</span>
              <span style={{ color: 'var(--success)' }}>&quot;canonical&quot;</span>
              <span style={{ color: '#fff' }}> href=</span>
              <span style={{ color: 'var(--text-muted)' }}>&quot;https://store.example.com/products/{product.slug}&quot;</span>
              <span style={{ color: 'var(--accent)' }}> /&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
