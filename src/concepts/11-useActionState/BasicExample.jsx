import { useActionState } from 'react';

// Simulated Server Action with validation, delay, and structured response
async function verifyPromoAction(prevState, formData) {
  const promoCode = formData.get('promoCode')?.toString().trim().toUpperCase();

  // Artificial network latency (1.2s)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (!promoCode) {
    return {
      success: false,
      error: 'Please enter a voucher or promo code.',
    };
  }

  // Simulated valid promotional codes database
  const validCoupons = {
    REACT19: { discountPct: 20, description: '20% Off React 19 Early Adopter Plan' },
    ENTERPRISE50: { discountPct: 50, description: '50% Off First 6 Months Enterprise Tier' },
  };

  if (validCoupons[promoCode]) {
    const coupon = validCoupons[promoCode];
    return {
      success: true,
      code: promoCode,
      discountPct: coupon.discountPct,
      description: coupon.description,
      appliedAt: new Date().toLocaleTimeString(),
    };
  }

  return {
    success: false,
    error: `Coupon "${promoCode}" is invalid or expired. (Try "REACT19" or "ENTERPRISE50")`,
  };
}

export default function BasicExample() {
  // 1. state: the latest return value of the action
  // 2. formAction: function passed to <form action={formAction}>
  // 3. isPending: true while the async action is executing
  const [state, formAction, isPending] = useActionState(verifyPromoAction, null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>React 19 Native Form Actions with useActionState</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Eliminates manual <code>e.preventDefault()</code>, <code>isLoading</code> state, and <code>try/catch</code> blocks.
          React manages pending states and server responses automatically.
        </p>
      </div>

      <div
        style={{
          background: '#0b1120',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
              Promotional Voucher Code:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                name="promoCode"
                type="text"
                placeholder="Enter REACT19 or ENTERPRISE50..."
                disabled={isPending}
                required
                style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
              />

              <button
                type="submit"
                disabled={isPending}
                style={{
                  background: isPending ? 'rgba(255,255,255,0.06)' : 'var(--primary)',
                  color: isPending ? 'var(--text-muted)' : '#0f172a',
                  fontWeight: 'bold',
                  padding: '8px 16px',
                  fontSize: '13px',
                  minWidth: '110px',
                }}
              >
                {isPending ? 'Verifying...' : 'Apply Code'}
              </button>
            </div>
          </div>
        </form>

        {/* Feedback Display */}
        {isPending && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              color: '#fbbf24',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>⏳</span>
            <span>Verifying promo code with billing server...</span>
          </div>
        )}

        {state && !isPending && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: '6px',
              background: state.success ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
              border: `1px solid ${state.success ? 'rgba(52, 211, 153, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`,
              fontSize: '13px',
            }}
          >
            {state.success ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <strong style={{ color: 'var(--success)' }}>
                  ✓ Voucher &quot;{state.code}&quot; Applied ({state.discountPct}% OFF)!
                </strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{state.description}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px' }}>
                  Applied timestamp: {state.appliedAt}
                </span>
              </div>
            ) : (
              <div style={{ color: 'var(--danger)', fontWeight: 'bold' }}>
                ⚠ {state.error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
