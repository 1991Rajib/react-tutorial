import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

// Decoupled reusable button - knows nothing about the form logic!
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: pending ? 'var(--border-color)' : 'var(--primary)',
        color: pending ? 'var(--text-muted)' : '#0f172a',
        fontWeight: 'bold',
        padding: '8px 16px',
      }}
    >
      {pending ? 'Submitting Form... ⏳' : 'Submit'}
    </button>
  );
}

async function simpleAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return `Successfully saved: ${formData.get('feedback')}`;
}

export default function BasicExample() {
  const [result, formAction] = useActionState(simpleAction, null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Decoupled Submit Button</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Notice: <code>SubmitButton</code> takes zero props. It reads <code>pending</code> automatically from the parent <code>&lt;form&gt;</code>!
        </p>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
          <textarea
            name="feedback"
            placeholder="Type some feedback..."
            rows={3}
            required
            style={{ width: '100%' }}
          />

          <SubmitButton />
        </form>

        {result && (
          <p style={{ color: 'var(--success)', fontSize: '13px', marginTop: '12px' }}>
            ✓ {result}
          </p>
        )}
      </div>
    </div>
  );
}
