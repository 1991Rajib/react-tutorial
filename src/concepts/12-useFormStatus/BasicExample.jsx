import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

// DECOUPLED CHILD 1: Reusable Submit Button (No props passed!)
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        background: pending ? 'rgba(255,255,255,0.06)' : 'var(--primary)',
        color: pending ? 'var(--text-muted)' : '#0f172a',
        fontWeight: 'bold',
        padding: '10px 18px',
        fontSize: '13px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span>{pending ? 'Submitting Issue...' : 'File Engineering Ticket'}</span>
      {pending && <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>}
    </button>
  );
}

// DECOUPLED CHILD 2: Contextual Status Banner reading in-flight formData
function InFlightPayloadPreview() {
  const { pending, data } = useFormStatus();

  if (!pending || !data) return null;

  const ticketTitle = data.get('title');
  const priority = data.get('priority');

  return (
    <div
      style={{
        padding: '10px 14px',
        borderRadius: '6px',
        background: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        fontSize: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <div style={{ color: '#fbbf24', fontWeight: 'bold' }}>
        ⚡ Transmitting Payload to Jira Service Desk:
      </div>
      <div style={{ color: 'var(--text-main)', fontFamily: 'monospace' }}>
        Title: &quot;{ticketTitle}&quot; | Priority: {priority}
      </div>
    </div>
  );
}

// Simulated server action
async function createTicketAction(prevState, formData) {
  const title = formData.get('title')?.toString().trim();
  const priority = formData.get('priority')?.toString();

  await new Promise((resolve) => setTimeout(resolve, 1400));

  return {
    id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
    title,
    priority,
    createdTime: new Date().toLocaleTimeString(),
  };
}

export default function BasicExample() {
  const [createdTicket, formAction] = useActionState(createTicketAction, null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Child Component Context via useFormStatus</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          <code>useFormStatus</code> lets deeply nested child components read the parent <code>&lt;form&gt;</code> status
          (including <code>pending</code> and active <code>data</code>) without any prop drilling!
        </p>
      </div>

      <div
        style={{
          background: '#0b1120',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          maxWidth: '520px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>
              Ticket Summary:
            </label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Memory leak in high-throughput websocket client"
              required
              style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>
              Urgency Severity:
            </label>
            <select name="priority" style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }}>
              <option value="P1 - Critical Blocker">P1 - Critical Blocker</option>
              <option value="P2 - High Severity">P2 - High Severity</option>
              <option value="P3 - Routine Improvement">P3 - Routine Improvement</option>
            </select>
          </div>

          <InFlightPayloadPreview />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
            <SubmitButton />
          </div>
        </form>

        {createdTicket && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '6px',
              background: 'rgba(52, 211, 153, 0.1)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <strong style={{ color: 'var(--success)' }}>
              ✓ Ticket {createdTicket.id} Created!
            </strong>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
              &quot;{createdTicket.title}&quot; [{createdTicket.priority}] filed at {createdTicket.createdTime}.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
