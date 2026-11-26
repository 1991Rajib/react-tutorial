import { useState, useMemo } from 'react';

// Generates 1,200 simulated asset records
const GENERATED_PORTFOLIO = Array.from({ length: 1200 }, (_, i) => {
  const categories = ['Tech Equity', 'Commodity', 'Crypto Asset', 'Govt Bond'];
  const cat = categories[i % categories.length];
  const baseValue = Math.floor(Math.sin(i) * 5000 + 7500);
  const changePct = Number(((Math.cos(i) * 14)).toFixed(2));
  return {
    id: i + 1,
    ticker: `${cat.slice(0, 3).toUpperCase()}-${(100 + i).toString()}`,
    category: cat,
    valueUsd: baseValue,
    changePct,
    riskScore: (i % 10) + 1,
  };
});

// Heavy statistical computation (e.g. weighted variance, beta coefficient)
function computeHeavyPortfolioMetrics(items) {
  const startTime = performance.now();
  // Intentionally heavy iterative calculation
  let sumWeightedReturn = 0;
  for (let cycle = 0; cycle < 150000; cycle++) {
    sumWeightedReturn += Math.sqrt(cycle % 100);
  }

  const totalValue = items.reduce((acc, curr) => acc + curr.valueUsd, 0);
  const avgChange = items.length ? (items.reduce((acc, curr) => acc + curr.changePct, 0) / items.length).toFixed(2) : 0;
  const durationMs = (performance.now() - startTime).toFixed(1);

  return { totalValue, avgChange, durationMs };
}

export default function BasicExample() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [minRisk, setMinRisk] = useState(1);
  const [unrelatedNote, setUnrelatedNote] = useState('');
  const [useMemoActive, setUseMemoActive] = useState(true);

  // Filter list based on user selections
  const filteredAssets = GENERATED_PORTFOLIO.filter((asset) => {
    const matchesCat = selectedCategory === 'ALL' || asset.category === selectedCategory;
    const matchesRisk = asset.riskScore >= minRisk;
    return matchesCat && matchesRisk;
  });

  // WITH useMemo: Metrics recalculate ONLY when filteredAssets change
  const memoizedMetrics = useMemo(() => {
    return computeHeavyPortfolioMetrics(filteredAssets);
  }, [filteredAssets]);

  // If user disables useMemo, recalculate on EVERY render (including every keystroke in unrelatedNote!)
  const activeMetrics = useMemoActive
    ? memoizedMetrics
    : computeHeavyPortfolioMetrics(filteredAssets);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Expensive Calculation Caching</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          <code>useMemo</code> caches the return value of an expensive calculation. Without it, typing in unrelated inputs forces heavy recomputations on every frame.
        </p>
      </div>

      {/* Control Configuration Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: '#0b1120',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Asset Class:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '6px 10px', fontSize: '12px' }}
          >
            <option value="ALL">All Categories (1,200 Assets)</option>
            <option value="Tech Equity">Tech Equities</option>
            <option value="Crypto Asset">Crypto Assets</option>
            <option value="Commodity">Commodities</option>
            <option value="Govt Bond">Government Bonds</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Min Risk (1-10):</span>
          <input
            type="range"
            min="1"
            max="10"
            value={minRisk}
            onChange={(e) => setMinRisk(Number(e.target.value))}
            style={{ width: '100px' }}
          />
          <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 'bold' }}>{minRisk}+</span>
        </div>

        <button
          onClick={() => setUseMemoActive((m) => !m)}
          style={{
            marginLeft: 'auto',
            fontSize: '12px',
            padding: '6px 12px',
            background: useMemoActive ? 'rgba(52, 211, 153, 0.15)' : 'rgba(248, 113, 113, 0.15)',
            color: useMemoActive ? 'var(--success)' : 'var(--danger)',
            border: `1px solid ${useMemoActive ? 'rgba(52, 211, 153, 0.4)' : 'rgba(248, 113, 113, 0.4)'}`,
          }}
        >
          {useMemoActive ? '⚡ useMemo: ENABLED (Fast)' : '⚠ useMemo: DISABLED (Recalculates every render)'}
        </button>
      </div>

      {/* Metrics Dashboard Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          background: '#0b1120',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Filtered Assets</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>
            {filteredAssets.length.toLocaleString()}
          </div>
        </div>

        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Total Portfolio Value</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)' }}>
            ${activeMetrics.totalValue.toLocaleString()}
          </div>
        </div>

        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Avg 24h Change</span>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: activeMetrics.avgChange >= 0 ? 'var(--success)' : 'var(--danger)',
            }}
          >
            {activeMetrics.avgChange}%
          </div>
        </div>

        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Calculation Time</span>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent)' }}>
            {activeMetrics.durationMs}ms
          </div>
        </div>
      </div>

      {/* Interactive Unrelated Keystroke Test */}
      <div
        style={{
          padding: '16px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <label style={{ fontSize: '13px', fontWeight: 'bold' }}>
          Unrelated Input Typing Test (Observe Keystroke Responsiveness):
        </label>
        <input
          type="text"
          placeholder="Type here rapidly... If useMemo is disabled, each letter recalculates the metrics!"
          value={unrelatedNote}
          onChange={(e) => setUnrelatedNote(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }}
        />
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          {useMemoActive
            ? '✓ With useMemo active, typing above incurs 0ms computation overhead!'
            : '⚠ With useMemo disabled, each keystroke triggers computeHeavyPortfolioMetrics().'}
        </span>
      </div>
    </div>
  );
}
