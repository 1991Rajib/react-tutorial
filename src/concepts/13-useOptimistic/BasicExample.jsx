import { useState, useOptimistic, useTransition } from 'react';

// Simulated API with optional error toggle
async function likePostApi(newLikes, shouldFail) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (shouldFail) {
    throw new Error('Network error: Server rejected like update!');
  }
  return newLikes;
}

export default function BasicExample() {
  const [likes, setLikes] = useState(42);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPending, startTransition] = useTransition();

  // Optimistic state wrapper around real likes
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (currentLikes, changeAmount) => currentLikes + changeAmount
  );

  const handleLike = () => {
    setErrorMessage(null);

    startTransition(async () => {
      // 1. Instant optimistic update! (Zero latency)
      setOptimisticLikes(1);

      try {
        // 2. Background server sync
        const verifiedLikes = await likePostApi(likes + 1, simulateFailure);
        setLikes(verifiedLikes);
      } catch (err) {
        // 3. On error, React automatically rolls back optimisticLikes to real `likes`!
        setErrorMessage(err.message);
      }
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3>Instant Upvote with Auto-Rollback</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Click "Upvote Post". Notice the count increments immediately (0ms). Toggle "Simulate Server Error" to watch React automatically roll it back!
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <button
            onClick={handleLike}
            disabled={isPending}
            style={{
              background: 'var(--primary)',
              color: '#0f172a',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>❤️ Upvote Post</span>
            <span
              style={{
                background: '#0f172a',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '12px',
              }}
            >
              {optimisticLikes}
            </span>
          </button>

          {isPending && (
            <span style={{ fontSize: '12px', color: 'var(--accent)' }}>
              Syncing with cloud server... ⏳
            </span>
          )}
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => setSimulateFailure(e.target.checked)}
          />
          Simulate Server Error (will test auto-rollback)
        </label>

        {errorMessage && (
          <div
            style={{
              marginTop: '12px',
              padding: '10px',
              background: 'rgba(248, 113, 113, 0.1)',
              border: '1px solid var(--danger)',
              borderRadius: '6px',
              color: 'var(--danger)',
              fontSize: '12px',
            }}
          >
            ❌ {errorMessage} (Count automatically reverted to {likes})
          </div>
        )}
      </div>
    </div>
  );
}
