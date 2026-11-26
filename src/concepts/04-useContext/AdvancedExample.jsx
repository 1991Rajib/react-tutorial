import { createContext, useContext, useState } from 'react';

// 1. RBAC Authentication Context
const AuthContext = createContext(null);

const ROLES = {
  admin: { label: 'Platform Administrator', tier: 'Superuser', color: 'var(--danger)' },
  editor: { label: 'Content Architect', tier: 'Staff Member', color: 'var(--primary)' },
  viewer: { label: 'Guest Read-Only', tier: 'Observer', color: 'var(--text-muted)' },
};

function UserProfileHeader() {
  const { user, logout, switchRole } = useContext(AuthContext);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '14px 18px',
        background: '#0b1120',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: '#0f172a',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {user.name[0]}
        </div>
        <div>
          <strong style={{ fontSize: '14px' }}>{user.name}</strong>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Role: <span style={{ color: ROLES[user.role].color, fontWeight: 'bold' }}>{ROLES[user.role].label}</span>
          </div>
        </div>
      </div>

      {/* Role Impersonation Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Impersonate Role:</span>
        <select
          value={user.role}
          onChange={(e) => switchRole(e.target.value)}
          style={{ padding: '6px 10px', fontSize: '12px' }}
        >
          <option value="admin">Administrator (Full Access)</option>
          <option value="editor">Editor (Can Publish/Edit)</option>
          <option value="viewer">Viewer (Read-Only)</option>
        </select>
        <button
          onClick={logout}
          style={{ fontSize: '12px', padding: '6px 10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--danger)' }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

// RESTRICTED COMPONENT 1: Admin Database Management (Admin only)
function AdminDatabaseConsole() {
  const { user, recordAuditLog } = useContext(AuthContext);
  const isAdmin = user.role === 'admin';

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        background: isAdmin ? 'rgba(248, 113, 113, 0.05)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${isAdmin ? 'rgba(248, 113, 113, 0.3)' : 'var(--border-color)'}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ fontSize: '14px', color: isAdmin ? 'var(--danger)' : 'var(--text-muted)' }}>
          🔒 Cloud Cluster Infrastructure (Admin Only)
        </h4>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Required: &apos;admin&apos;</span>
      </div>

      {isAdmin ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Active Database Nodes: <strong>3/3 Healthy</strong> (Region: us-east-1)
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => recordAuditLog('Triggered automated database backup snapshot')}
              style={{ background: 'var(--danger)', color: '#fff', fontSize: '12px', padding: '6px 12px' }}
            >
              Trigger Database Backup
            </button>
            <button
              onClick={() => recordAuditLog('Rotated Cloudflare SSL API certificates')}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '12px', padding: '6px 12px' }}
            >
              Rotate Secret Keys
            </button>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          ⛔ Access Restricted: Your role (<code>{user.role}</code>) does not have administrative infrastructure permissions.
        </div>
      )}
    </div>
  );
}

// RESTRICTED COMPONENT 2: Content Publishing Suite (Admin or Editor)
function ContentPublishingSuite() {
  const { user, recordAuditLog } = useContext(AuthContext);
  const canPublish = user.role === 'admin' || user.role === 'editor';

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        background: canPublish ? 'rgba(56, 189, 248, 0.05)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${canPublish ? 'rgba(56, 189, 248, 0.3)' : 'var(--border-color)'}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h4 style={{ fontSize: '14px', color: canPublish ? 'var(--primary)' : 'var(--text-muted)' }}>
          ✍ Article Publishing Suite (Admin &amp; Editor)
        </h4>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Required: &apos;admin&apos; | &apos;editor&apos;</span>
      </div>

      {canPublish ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
            Release Draft: <em>&quot;React 19 Hooks Architecture Playbook&quot;</em>
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => recordAuditLog('Published new release article to production blog')}
              style={{ background: 'var(--primary)', color: '#0f172a', fontWeight: 'bold', fontSize: '12px', padding: '6px 12px' }}
            >
              Publish to Production
            </button>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          👁 Read-Only Mode: Viewers can read published docs, but cannot create or publish drafts.
        </div>
      )}
    </div>
  );
}

export default function AdvancedExample() {
  const [currentUser, setCurrentUser] = useState({
    name: 'Rajib Architect',
    role: 'admin',
  });
  const [auditLogs, setAuditLogs] = useState([]);

  const recordAuditLog = (action) => {
    const time = new Date().toLocaleTimeString();
    setAuditLogs((prev) => [`[${time}] ${currentUser.name} (${currentUser.role}): ${action}`, ...prev.slice(0, 5)]);
  };

  const switchRole = (newRole) => {
    setCurrentUser((prev) => ({ ...prev, role: newRole }));
    recordAuditLog(`Switched active role to '${newRole}'`);
  };

  const logout = () => {
    setCurrentUser((prev) => ({ ...prev, role: 'viewer', name: 'Anonymous Guest' }));
    recordAuditLog('User logged out');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Enterprise Role-Based Access Control (RBAC)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Demonstrates global authentication context, permission-based component gating, and live role switching.
        </p>
      </div>

      <AuthContext value={{ user: currentUser, switchRole, logout, recordAuditLog }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <UserProfileHeader />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <AdminDatabaseConsole />
            <ContentPublishingSuite />
          </div>

          {/* Audit Logs */}
          <div
            style={{
              padding: '14px',
              borderRadius: '8px',
              background: '#0b1120',
              border: '1px solid var(--border-color)',
            }}
          >
            <h4 style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              RBAC Context Action Audit Trail:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontFamily: 'monospace', fontSize: '11px' }}>
              {auditLogs.length === 0 ? (
                <span style={{ color: 'var(--text-muted)' }}>Click an action above or switch roles to populate the audit log.</span>
              ) : (
                auditLogs.map((log, i) => (
                  <div key={i} style={{ color: 'var(--accent)', background: 'rgba(255,255,255,0.03)', padding: '4px 8px', borderRadius: '4px' }}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </AuthContext>
    </div>
  );
}
