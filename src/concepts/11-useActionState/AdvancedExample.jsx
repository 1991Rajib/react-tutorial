import { useActionState } from 'react';

// Simulated server action with complex validation
async function updateAccountAction(prevState, formData) {
  const username = formData.get('username')?.toString().trim();
  const bio = formData.get('bio')?.toString().trim();
  const theme = formData.get('theme')?.toString();

  // Simulate network round-trip (1.5 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const errors = {};
  if (!username || username.length < 3) {
    errors.username = 'Username must be at least 3 characters long.';
  } else if (username.toLowerCase() === 'admin') {
    errors.username = 'Username "admin" is reserved.';
  }

  if (bio && bio.length > 100) {
    errors.bio = 'Bio cannot exceed 100 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      values: { username, bio, theme },
    };
  }

  return {
    success: true,
    errors: {},
    values: { username, bio, theme },
    updatedAt: new Date().toLocaleTimeString(),
  };
}

export default function AdvancedExample() {
  const [state, formAction, isPending] = useActionState(updateAccountAction, {
    success: false,
    errors: {},
    values: { username: 'alex_react', bio: 'Exploring React 19 features', theme: 'system' },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Robust Form Action with Field-Level Server Errors</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Demonstrates server validation error mapping, keeping input state, and handling pending states.
        </p>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
              Username (Try "admin" or &lt; 3 chars for error):
            </label>
            <input
              name="username"
              defaultValue={state.values?.username}
              disabled={isPending}
              style={{
                width: '100%',
                borderColor: state.errors?.username ? 'var(--danger)' : undefined,
              }}
            />
            {state.errors?.username && (
              <p style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>
                {state.errors.username}
              </p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
              Bio Description:
            </label>
            <textarea
              name="bio"
              rows={3}
              defaultValue={state.values?.bio}
              disabled={isPending}
              style={{
                width: '100%',
                borderColor: state.errors?.bio ? 'var(--danger)' : undefined,
              }}
            />
            {state.errors?.bio && (
              <p style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>
                {state.errors.bio}
              </p>
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
              Theme Preference:
            </label>
            <select name="theme" defaultValue={state.values?.theme} disabled={isPending} style={{ width: '100%' }}>
              <option value="system">System Default</option>
              <option value="dark">Dark Theme</option>
              <option value="light">Light Theme</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending}
            style={{
              background: isPending ? 'var(--border-color)' : 'var(--primary)',
              color: isPending ? 'var(--text-muted)' : '#0f172a',
              fontWeight: 'bold',
              padding: '10px 16px',
              marginTop: '4px',
            }}
          >
            {isPending ? 'Validating & Saving... ⏳' : 'Save Changes'}
          </button>
        </form>

        {state.success && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '6px',
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid var(--success)',
              color: 'var(--success)',
              fontSize: '13px',
              maxWidth: '440px',
            }}
          >
            ✓ Profile successfully updated at {state.updatedAt}!
          </div>
        )}
      </div>
    </div>
  );
}
