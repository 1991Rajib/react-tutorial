import { useState, useEffect } from 'react';

// Simulated external WebSocket/Chat server
function createChatConnection(channelId) {
  let isConnected = false;
  return {
    connect(onMessage, onStatusChange) {
      isConnected = true;
      onStatusChange('Connecting to WebSocket server...');

      // Simulated network handshake delay
      const handshakeTimer = setTimeout(() => {
        if (!isConnected) return;
        onStatusChange(`Connected to #${channelId} (live) 🟢`);
        onMessage({
          id: `sys_${Date.now()}`,
          sender: 'System Bot',
          text: `Welcome to #${channelId}. Listening for live channel broadcasts.`,
          time: new Date().toLocaleTimeString(),
          isSystem: true,
        });
      }, 600);

      // Periodic broadcast emitter
      const broadcastTimer = setInterval(() => {
        if (isConnected) {
          const sampleMessages = [
            `Deployment pipeline for #${channelId} completed successfully.`,
            `Health check ping responded in 14ms across all regions.`,
            `New pull request approved by frontend review team.`,
          ];
          const randomText = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
          onMessage({
            id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            sender: 'Channel Broadcast',
            text: randomText,
            time: new Date().toLocaleTimeString(),
            isSystem: false,
          });
        }
      }, 4500);

      return { handshakeTimer, broadcastTimer };
    },
    disconnect(timers) {
      isConnected = false;
      clearTimeout(timers.handshakeTimer);
      clearInterval(timers.broadcastTimer);
    },
  };
}

export default function AdvancedExample() {
  const [selectedChannel, setSelectedChannel] = useState('react-core');
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected ⚪');
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [userDraft, setUserDraft] = useState('');

  // EFFECT: Synchronizing with external chat service
  useEffect(() => {
    if (isManualPaused) {
      setConnectionStatus('Paused by user ⏸');
      return;
    }

    const connection = createChatConnection(selectedChannel);

    // Clear previous channel messages on channel switch
    setMessages([]);

    const timers = connection.connect(
      (newMsg) => setMessages((prev) => [newMsg, ...prev.slice(0, 6)]),
      (status) => setConnectionStatus(status)
    );

    // CRITICAL: Cleanup runs before re-running with a new channel OR when unmounting
    return () => {
      connection.disconnect(timers);
      setConnectionStatus('Disconnected ⚪');
    };
  }, [selectedChannel, isManualPaused]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userDraft.trim()) return;

    const newMsg = {
      id: `usr_${Date.now()}`,
      sender: 'You',
      text: userDraft.trim(),
      time: new Date().toLocaleTimeString(),
      isSystem: false,
    };
    setMessages((prev) => [newMsg, ...prev]);
    setUserDraft('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>Real-Time Channel Synchronizer</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Demonstrates parameter-dependent connection lifecycles, graceful teardown on channel switch, and StrictMode safe cleanups.
        </p>
      </div>

      {/* Connection & Channel Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: '#0b1120',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
        }}
      >
        <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Active Channel:</label>
        <select
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
          disabled={isManualPaused}
          style={{ width: '160px', padding: '6px 10px', fontSize: '13px' }}
        >
          <option value="react-core"># react-core</option>
          <option value="architecture"># architecture</option>
          <option value="devops-alerts"># devops-alerts</option>
        </select>

        <button
          onClick={() => setIsManualPaused((p) => !p)}
          style={{
            fontSize: '12px',
            padding: '6px 12px',
            background: isManualPaused ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
            color: isManualPaused ? '#0f172a' : 'var(--text-main)',
            fontWeight: isManualPaused ? 'bold' : 'normal',
          }}
        >
          {isManualPaused ? '▶ Reconnect' : '⏸ Disconnect & Clean Up'}
        </button>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          Status: <strong>{connectionStatus}</strong>
        </span>
      </div>

      {/* Chat Messages Feed */}
      <div
        style={{
          background: '#0b1120',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '14px', color: 'var(--accent)' }}>
            Live Stream for #{selectedChannel}
          </h4>
          <button
            onClick={() => setMessages([])}
            style={{ fontSize: '11px', background: 'transparent', border: '1px solid var(--border-color)', padding: '2px 8px' }}
          >
            Clear Feed
          </button>
        </div>

        <div style={{ minHeight: '160px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {messages.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No messages yet in #{selectedChannel}. Waiting for broadcasts...
            </div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: m.sender === 'You' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255,255,255,0.04)',
                  borderLeft: `3px solid ${m.sender === 'You' ? 'var(--primary)' : m.isSystem ? 'var(--accent)' : 'var(--border-color)'}`,
                  fontSize: '13px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px', fontSize: '11px' }}>
                  <strong style={{ color: m.sender === 'You' ? 'var(--primary)' : 'var(--text-main)' }}>
                    {m.sender}
                  </strong>
                  <span style={{ color: 'var(--text-muted)' }}>{m.time}</span>
                </div>
                <div style={{ color: m.isSystem ? 'var(--accent)' : 'var(--text-main)' }}>{m.text}</div>
              </div>
            ))
          )}
        </div>

        {/* Message Sender Form */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
          <input
            type="text"
            placeholder={`Send message to #${selectedChannel}...`}
            value={userDraft}
            onChange={(e) => setUserDraft(e.target.value)}
            disabled={isManualPaused}
            style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
          />
          <button
            type="submit"
            disabled={isManualPaused || !userDraft.trim()}
            style={{
              padding: '8px 16px',
              background: 'var(--primary)',
              color: '#0f172a',
              fontWeight: 'bold',
              fontSize: '13px',
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
