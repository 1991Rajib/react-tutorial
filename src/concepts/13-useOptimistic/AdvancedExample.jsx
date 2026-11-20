import { useState, useOptimistic, useActionState, useRef } from 'react';

// Simulated chat API
async function sendChatMessage(text) {
  await new Promise((resolve) => setTimeout(resolve, 1600));
  return {
    id: `msg-${Date.now()}`,
    text,
    status: 'delivered',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

export default function AdvancedExample() {
  const formRef = useRef(null);

  const [messages, setMessages] = useState([
    { id: '1', text: 'Hey there! Welcome to React 19.', status: 'delivered', time: '10:00 AM' },
    { id: '2', text: 'Try sending a message below.', status: 'delivered', time: '10:01 AM' },
  ]);

  // Optimistic overlay for messages list
  const [optimisticMessages, setOptimisticMessages] = useOptimistic(
    messages,
    (currentMessages, newDraftText) => [
      ...currentMessages,
      {
        id: `temp-${Date.now()}`,
        text: newDraftText,
        status: 'sending',
        time: 'Just now',
      },
    ]
  );

  const [formState, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const text = formData.get('message')?.toString().trim();
      if (!text) return null;

      // 1. Instant optimistic message in UI!
      setOptimisticMessages(text);
      formRef.current?.reset();

      // 2. Background server delivery
      const deliveredMessage = await sendChatMessage(text);

      // 3. Update real verified state
      setMessages((prev) => [...prev, deliveredMessage]);
      return deliveredMessage;
    },
    null
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Instant Messaging Feed (Slack/WhatsApp Pattern)</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          When you press Send, the message appears immediately with an optimistic <code>⏳ sending</code> badge before the server even responds.
        </p>

        {/* Chat Stream */}
        <div
          className="card"
          style={{
            maxHeight: '260px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: '#0b1120',
            marginBottom: '12px',
          }}
        >
          {optimisticMessages.map((msg) => {
            const isSending = msg.status === 'sending';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: 'flex-end',
                  maxWidth: '80%',
                  background: isSending ? 'rgba(56, 189, 248, 0.2)' : 'var(--primary)',
                  color: isSending ? 'var(--text-main)' : '#0f172a',
                  padding: '8px 12px',
                  borderRadius: '12px 12px 2px 12px',
                  border: isSending ? '1px dashed var(--primary)' : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                <p style={{ fontSize: '14px', fontWeight: '500' }}>{msg.text}</p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    opacity: 0.8,
                    marginTop: '4px',
                  }}
                >
                  <span>{msg.time}</span>
                  <span>{isSending ? '⏳' : '✓✓'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Form */}
        <form ref={formRef} action={formAction} style={{ display: 'flex', gap: '8px' }}>
          <input
            name="message"
            placeholder="Type a message and press Enter..."
            autoComplete="off"
            required
            style={{ flex: 1 }}
          />
          <button
            type="submit"
            style={{
              background: 'var(--primary)',
              color: '#0f172a',
              fontWeight: 'bold',
            }}
          >
            Send 🚀
          </button>
        </form>
      </div>
    </div>
  );
}
