import { useState, useTransition } from 'react';

// Simulated async backend API
async function saveUserProfile(data) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (data.name.toLowerCase() === 'error') {
    throw new Error('Simulated server error: Name "error" is forbidden!');
  }
  return { success: true, savedAt: new Date().toLocaleTimeString() };
}

export default function AdvancedExample() {
  const [profile, setProfile] = useState({ name: 'Alex Johnson', bio: 'Frontend engineer' });
  const [draftName, setDraftName] = useState('Alex Johnson');
  const [errorMsg, setErrorMsg] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);

  // React 19: useTransition supports async actions!
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    setErrorMsg(null);

    // React 19 Async Transition!
    startTransition(async () => {
      try {
        const result = await saveUserProfile({ name: draftName });
        setProfile((prev) => ({ ...prev, name: draftName }));
        setLastSaved(result.savedAt);
      } catch (err) {
        setErrorMsg(err.message);
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>React 19 Async useTransition</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>
          In React 19, <code>startTransition</code> directly accepts <code>async</code> callbacks, automatically tracking <code>isPending</code> during network delays.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
              Full Name (Type "error" to test failure):
            </label>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              disabled={isPending}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handleSave}
              disabled={isPending}
              style={{
                background: isPending ? 'var(--border-color)' : 'var(--primary)',
                color: isPending ? 'var(--text-muted)' : '#0f172a',
                fontWeight: 'bold',
              }}
            >
              {isPending ? 'Saving to Cloud ⏳' : 'Save Profile'}
            </button>

            {isPending && (
              <span style={{ fontSize: '13px', color: 'var(--primary)' }}>
                Syncing with server...
              </span>
            )}
          </div>
        </div>

        {errorMsg && (
          <div
            style={{
              marginTop: '12px',
              padding: '10px 14px',
              background: 'rgba(248, 113, 113, 0.1)',
              border: '1px solid var(--danger)',
              borderRadius: '6px',
              color: 'var(--danger)',
              fontSize: '13px',
            }}
          >
            ❌ {errorMsg}
          </div>
        )}
      </div>

      <div className="card" style={{ background: '#0b1120' }}>
        <h4 style={{ color: 'var(--accent)', marginBottom: '6px' }}>Server Stored Profile</h4>
        <p>Name: <strong>{profile.name}</strong></p>
        <p>Bio: {profile.bio}</p>
        {lastSaved && (
          <p style={{ fontSize: '12px', color: 'var(--success)', marginTop: '6px' }}>
            ✓ Last synced at {lastSaved}
          </p>
        )}
      </div>
    </div>
  );
}
