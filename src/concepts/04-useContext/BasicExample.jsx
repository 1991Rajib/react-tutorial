import { createContext, useContext, useState } from 'react';

// 1. Create the Context with sensible default values
const StoreConfigContext = createContext({
  currency: 'USD',
  symbol: '$',
  rate: 1.0,
  taxRate: 0.08,
  setCurrency: () => {},
});

// CURRENCY RATES TABLE
const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  JPY: { symbol: '¥', rate: 154.0 },
};

// CHILD WIDGET 1: Header Store Navigator
function StoreHeader() {
  const { currency, setCurrency } = useContext(StoreConfigContext);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
      }}
    >
      <div>
        <strong style={{ color: 'var(--primary)', fontSize: '14px' }}>Global Tech Storefront</strong>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Context-driven multi-currency pricing</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Currency:</span>
        {Object.keys(CURRENCIES).map((curr) => (
          <button
            key={curr}
            onClick={() => setCurrency(curr)}
            style={{
              padding: '4px 8px',
              fontSize: '11px',
              background: currency === curr ? 'var(--primary)' : 'transparent',
              color: currency === curr ? '#0f172a' : 'var(--text-main)',
              border: '1px solid var(--border-color)',
            }}
          >
            {curr}
          </button>
        ))}
      </div>
    </div>
  );
}

// CHILD WIDGET 2: Catalog Item Card (Formats price via Context)
function ProductCatalogCard({ product }) {
  const { currency, symbol, rate } = useContext(StoreConfigContext);
  const convertedPrice = Math.round(product.baseUsdPrice * rate);

  return (
    <div
      style={{
        padding: '14px',
        background: '#0b1120',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <div style={{ fontSize: '11px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          {product.category}
        </div>
        <h4 style={{ fontSize: '14px', margin: '4px 0 8px 0' }}>{product.name}</h4>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '10px' }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>
          {symbol}{convertedPrice.toLocaleString()} {currency}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          Base: ${product.baseUsdPrice} USD
        </span>
      </div>
    </div>
  );
}

// CHILD WIDGET 3: Checkout Estimation Widget
function CheckoutSummary() {
  const { currency, symbol, rate, taxRate } = useContext(StoreConfigContext);

  const subtotalUsd = 129 + 89;
  const convertedSubtotal = subtotalUsd * rate;
  const taxAmount = convertedSubtotal * taxRate;
  const grandTotal = convertedSubtotal + taxAmount;

  return (
    <div
      style={{
        padding: '14px',
        background: 'rgba(56, 189, 248, 0.05)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        borderRadius: '6px',
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}
    >
      <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
        Cart Estimate (2 items)
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Subtotal:</span>
        <span>{symbol}{convertedSubtotal.toFixed(2)}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
        <span>Estimated Tax ({(taxRate * 100).toFixed(0)}%):</span>
        <span>{symbol}{taxAmount.toFixed(2)}</span>
      </div>
      <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px' }}>
        <span>Total:</span>
        <span style={{ color: 'var(--primary)' }}>{symbol}{grandTotal.toFixed(2)} {currency}</span>
      </div>
    </div>
  );
}

export default function BasicExample() {
  const [currency, setCurrency] = useState('USD');

  const contextValue = {
    currency,
    symbol: CURRENCIES[currency].symbol,
    rate: CURRENCIES[currency].rate,
    taxRate: 0.08,
    setCurrency,
  };

  const sampleProducts = [
    { id: 1, name: 'Ultra-Wide Mechanical Keyboard', category: 'Hardware', baseUsdPrice: 129 },
    { id: 2, name: 'Ergonomic Precision Mouse', category: 'Peripherals', baseUsdPrice: 89 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>React 19 Direct Context Provider</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          Notice: In React 19, we write <code>&lt;StoreConfigContext value=...&gt;</code> without needing <code>.Provider</code>!
          Every decoupled widget across the tree reads the shared store settings.
        </p>
      </div>

      {/* React 19 Direct Context Provider */}
      <StoreConfigContext value={contextValue}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <StoreHeader />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {sampleProducts.map((p) => (
              <ProductCatalogCard key={p.id} product={p} />
            ))}
          </div>

          <CheckoutSummary />
        </div>
      </StoreConfigContext>
    </div>
  );
}
