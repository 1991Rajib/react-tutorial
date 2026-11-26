import { createContext, use, useState } from 'react';

// Context 1: Base Application Config
const WorkspaceConfigContext = createContext({
  orgName: 'Acme Global Cloud',
  region: 'us-east-1',
});

// Context 2: Premium Analytics Engine (Only consumed by Pro/Enterprise tiers)
const AnalyticsEngineContext = createContext({
  realtimeTrafficMonitoring: true,
  exportToBigQuery: true,
  retentionDays: 90,
});

// Context 3: Enterprise Security & Secrets Vault (Only consumed by Enterprise tier)
const EnterpriseSecurityContext = createContext({
  kmsKeyId: 'kms_arn_0982716298102',
  auditLoggingEnabled: true,
  ipWhitelisting: ['192.168.1.0/24', '10.0.0.0/16'],
});

function DynamicWorkspaceDashboard({ userTier }) {
  // Always read the base workspace context
  const baseConfig = use(WorkspaceConfigContext);

  // ✨ REACT 19 BREAKTHROUGH: Conditional Context Reading with use()!
  // In React 16-18, calling useContext inside an if-statement was a fatal Rules of Hooks violation.
  let analyticsConfig = null;
  if (userTier === 'pro' || userTier === 'enterprise') {
    analyticsConfig = use(AnalyticsEngineContext);
  }

  let securityConfig = null;
  if (userTier === 'enterprise') {
    securityConfig = use(EnterpriseSecurityContext);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Base Organization Card */}
      <div
        style={{
          padding: '14px',
          background: '#0b1120',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Base Workspace Configuration
        </div>
        <strong style={{ fontSize: '15px', color: 'var(--primary)' }}>{baseConfig.orgName}</strong>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Assigned Data Center: <code>{baseConfig.region}</code>
        </div>
      </div>

      {/* Conditional Analytics Card */}
      {analyticsConfig ? (
        <div
          style={{
            padding: '14px',
            background: 'rgba(56, 189, 248, 0.05)',
            borderRadius: '6px',
            border: '1px solid rgba(56, 189, 248, 0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '13px', color: 'var(--primary)' }}>
              ⚡ Advanced Analytics Engine (Conditional Read via use())
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: 'bold' }}>ACTIVE</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', gap: '14px' }}>
            <span>Telemetry: <strong>Active (24/7)</strong></span>
            <span>Data Retention: <strong>{analyticsConfig.retentionDays} Days</strong></span>
            <span>BigQuery Export: <strong>Enabled</strong></span>
          </div>
        </div>
      ) : (
        <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
          ⚪ Analytics context skipped (Available on Pro &amp; Enterprise).
        </div>
      )}

      {/* Conditional Enterprise Security Card */}
      {securityConfig ? (
        <div
          style={{
            padding: '14px',
            background: 'rgba(248, 113, 113, 0.05)',
            borderRadius: '6px',
            border: '1px solid rgba(248, 113, 113, 0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong style={{ fontSize: '13px', color: 'var(--danger)' }}>
              🔒 Enterprise Secrets Vault (Conditional Read via use())
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--danger)', fontWeight: 'bold' }}>GATED</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
            KMS Key ARN: <code>{securityConfig.kmsKeyId}</code>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Subnet Whitelisting: {securityConfig.ipWhitelisting.join(', ')}
          </div>
        </div>
      ) : (
        <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
          ⚪ Enterprise security vault skipped (Requires Enterprise Tier).
        </div>
      )}
    </div>
  );
}

export default function BasicExample() {
  const [tier, setTier] = useState('free'); // 'free' | 'pro' | 'enterprise'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Conditional Context Consumption via use() API</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          React 19&apos;s <code>use()</code> can be invoked inside <code>if</code> statements, loops, and switches.
          This completely removes the historical restriction where hooks had to be top-level unconditionally.
        </p>
      </div>

      {/* Tier Switcher Controls */}
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
        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Simulate User Plan:</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'free', label: 'Starter (Free)' },
            { id: 'pro', label: 'Developer (Pro)' },
            { id: 'enterprise', label: 'Corporate (Enterprise)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTier(t.id)}
              style={{
                fontSize: '12px',
                padding: '6px 12px',
                background: tier === t.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: tier === t.id ? '#0f172a' : 'var(--text-main)',
                fontWeight: tier === t.id ? 'bold' : 'normal',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <DynamicWorkspaceDashboard userTier={tier} />
    </div>
  );
}
