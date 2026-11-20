import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

// Child component 1: Contextual Progress Banner reading formData
function FormProgressBanner() {
  const { pending, data } = useFormStatus();

  if (!pending || !data) return null;

  const title = data.get('productTitle') || 'Item';

  return (
    <div
      style={{
        padding: '10px 14px',
        background: 'rgba(56, 189, 248, 0.1)',
        border: '1px solid var(--primary)',
        borderRadius: '6px',
        color: 'var(--primary)',
        fontSize: '13px',
      }}
    >
      ⏳ Uploading <strong>"{title}"</strong> to inventory database...
    </div>
  );
}

// Child component 2: Form-aware input that auto-disables
function SmartInput({ name, label, type = 'text', placeholder }) {
  const { pending } = useFormStatus();

  return (
    <div>
      <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={pending}
        required
        style={{ width: '100%' }}
      />
    </div>
  );
}

// Child component 3: Action Buttons
function ActionButtons() {
  const { pending } = useFormStatus();

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
      <button
        type="submit"
        disabled={pending}
        style={{
          background: pending ? 'var(--border-color)' : 'var(--primary)',
          color: pending ? 'var(--text-muted)' : '#0f172a',
          fontWeight: 'bold',
          flex: 1,
        }}
      >
        {pending ? 'Processing Upload...' : 'Publish Product'}
      </button>
    </div>
  );
}

async function uploadProductAction(prevState, formData) {
  // 2s simulated upload delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const title = formData.get('productTitle');
  const price = formData.get('productPrice');
  return {
    success: true,
    message: `Product "${title}" ($${price}) published successfully!`,
  };
}

export default function AdvancedExample() {
  const [state, formAction] = useActionState(uploadProductAction, null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Deep Child Form Awareness (Reading Form Data)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Multiple child components read the pending state AND the live form data payload without any props passed.
        </p>

        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '440px' }}>
          <FormProgressBanner />

          <SmartInput
            name="productTitle"
            label="Product Title"
            placeholder="e.g. Ergonomic Office Chair"
          />

          <SmartInput
            name="productPrice"
            label="Price ($)"
            type="number"
            placeholder="e.g. 299"
          />

          <ActionButtons />
        </form>

        {state?.success && (
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
            ✓ {state.message}
          </div>
        )}
      </div>
    </div>
  );
}
