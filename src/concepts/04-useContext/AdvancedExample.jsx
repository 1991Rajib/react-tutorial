import { createContext, useContext, useState } from 'react';

// Auth context with user profile, permissions, and logout
const AuthContext = createContext(null);

function UserBadge() {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return (
      <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
        Status: ⚪ Not logged in
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <p style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
          Welcome back, {auth.user.name}! 🟢
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Role: {auth.user.role} | Security Tier: {auth.user.tier}
        </p>
      </div>
      <button
        onClick={auth.logout}
        style={{
          background: 'var(--danger)',
          color: '#ffffff',
          fontSize: '12px',
          padding: '6px 12px',
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

function AdminPanel() {
  const auth = useContext(AuthContext);

  if (!auth.user || auth.user.role !== 'admin') {
    return (
      <div
        style={{
          padding: '12px',
          background: 'rgba(248, 113, 113, 0.1)',
          border: '1px solid rgba(248, 113, 113, 0.3)',
          borderRadius: '6px',
          color: 'var(--danger)',
          fontSize: '13px',
        }}
      >
        🔒 Admin Restricted Zone: Only users with 'admin' role can view this section.
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '12px',
        background: 'rgba(52, 211, 153, 0.1)',
        border: '1px solid rgba(52, 211, 153, 0.3)',
        borderRadius: '6px',
        color: 'var(--success)',
        fontSize: '13px',
      }}
    >
      🎉 Admin Access Granted! You have superuser permissions to modify database records.
    </div>
  );
}

export default function AdvancedExample() {
  const [user, setUser] = useState(null);

  const loginAsAdmin = () => {
    setUser({ name: 'Alice Walker', role: 'admin', tier: 'Level 3' });
  };

  const loginAsMember = () => {
    setUser({ name: 'Bob Smith', role: 'member', tier: 'Level 1' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Authentication & RBAC Context</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
          Demonstrates global state management, role-based UI access, and clean consumption.
        </p>

        {!user && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button onClick={loginAsAdmin} style={{ background: 'var(--accent)', color: '#fff' }}>
              Sign in as Admin
            </button>
            <button onClick={loginAsMember} style={{ background: 'var(--border-color)', color: '#fff' }}>
              Sign in as Regular Member
            </button>
          </div>
        )}
      </div>

      <AuthContext value={{ user, logout }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <UserBadge />
          <hr style={{ borderColor: 'var(--border-color)' }} />
          <AdminPanel />
        </div>
      </AuthContext>
    </div>
  );
}
