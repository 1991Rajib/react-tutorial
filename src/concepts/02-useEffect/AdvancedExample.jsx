import { useState, useEffect } from 'react';

// Simulated external chat service
function createChatConnection(roomId) {
  let isConnected = false;
  return {
    connect(onMessage) {
      isConnected = true;
      console.log(`[ChatService] Connected to room: ${roomId}`);
      const timer = setInterval(() => {
        if (isConnected) {
          onMessage(`Message from ${roomId} at ${new Date().toLocaleTimeString()}`);
        }
      }, 3000);
      return timer;
    },
    disconnect(timer) {
      isConnected = false;
      clearInterval(timer);
      console.log(`[ChatService] Disconnected from room: ${roomId}`);
    },
  };
}

export default function AdvancedExample() {
  const [roomId, setRoomId] = useState('general');
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    setStatus('connecting...');
    const connection = createChatConnection(roomId);

    // Clear previous room messages
    setMessages([]);

    const timer = connection.connect((newMsg) => {
      setMessages((prev) => [newMsg, ...prev.slice(0, 4)]);
      setStatus('connected 🟢');
    });

    // CRITICAL: Cleanup function runs when roomId changes or component unmounts
    return () => {
      connection.disconnect(timer);
      setStatus('disconnected ⚪');
    };
  }, [roomId]); // Re-syncs whenever `roomId` changes

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>External Connection Synchronizer</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '12px' }}>
          Demonstrates proper connection lifecycle, parameter changes, and StrictMode safe cleanups.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Choose Room:</label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={{ width: '160px' }}
          >
            <option value="general"># general</option>
            <option value="random"># random</option>
            <option value="tech-chat"># tech-chat</option>
          </select>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Status: <strong>{status}</strong>
          </span>
        </div>
      </div>

      <div className="card" style={{ background: '#0b1120' }}>
        <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>
          Live Room Stream ({roomId})
        </h4>
        {messages.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            Listening for simulated room broadcasts (arrives every 3s)...
          </p>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {messages.map((m, idx) => (
              <li
                key={idx}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                {m}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
