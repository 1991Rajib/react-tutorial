import { useActionState } from 'react';

// Async action: receives (previousState, formData)
async function newsletterAction(previousState, formData) {
  const email = formData.get('email');

  // Simulate network request delay (1.2s)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  return {
    success: true,
    message: `🎉 Subscribed successfully! A welcome email was sent to ${email}.`,
  };
}

export default function BasicExample() {
  // state: current result
  // formAction: pass to <form action={formAction}>
  // isPending: automatic loading state
  const [state, formAction, isPending] = useActionState(newsletterAction, null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>React 19 Native Form Action</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          No <code>e.preventDefault()</code>, no <code>setIsLoading(true)</code>, no <code>try/catch</code>! React manages it all natively.
        </p>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
              Email Address:
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              disabled={isPending}
              style={{ width: '100%' }}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            style={{
              background: isPending ? 'var(--border-color)' : 'var(--primary)',
              color: isPending ? 'var(--text-muted)' : '#0f172a',
              fontWeight: 'bold',
            }}
          >
            {isPending ? 'Subscribing... ⏳' : 'Subscribe to Newsletter'}
          </button>
        </form>

        {state && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '13px',
              background: state.success ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
              border: `1px solid ${state.success ? 'var(--success)' : 'var(--danger)'}`,
              color: state.success ? 'var(--success)' : 'var(--danger)',
            }}
          >
            {state.message}
          </div>
        )}
      </div>
    </div>
  );
}
