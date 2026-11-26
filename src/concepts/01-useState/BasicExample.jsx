import { useState } from 'react';

const PRODUCT = {
  id: 'hp-pro',
  name: 'Studio Pro ANC Headphones',
  basePrice: 199,
  stock: 6,
  colors: ['Space Gray', 'Midnight Blue', 'Silver'],
};

export default function BasicExample() {
  // 1. Independent state variables
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Space Gray');
  const [hasCarePlan, setHasCarePlan] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  // 2. DERIVED VALUES (Computed on the fly during render - NOT stored in state!)
  const carePlanCost = hasCarePlan ? 29 : 0;
  const itemsSubtotal = PRODUCT.basePrice * quantity;
  const discountRate = isCouponApplied ? 0.15 : 0; // 15% discount
  const discountAmount = Math.round(itemsSubtotal * discountRate);
  const grandTotal = itemsSubtotal + carePlanCost - discountAmount;
  const isMaxStockReached = quantity >= PRODUCT.stock;

  // 3. Functional updates: safe against batched or rapid updates
  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.min(PRODUCT.stock, Math.max(1, prev + delta)));
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'REACT15') {
      setIsCouponApplied(true);
    }
  };

  const removeCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode('');
  };

  const resetAll = () => {
    setQuantity(1);
    setSelectedColor('Space Gray');
    setHasCarePlan(false);
    setIsCouponApplied(false);
    setCouponCode('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '4px' }}>E-Commerce Product Customizer</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Demonstrates primitive state, functional updates, and <strong>derived values computed during render</strong> (never synced in useEffect).
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '20px',
        }}
      >
        {/* Left: Product Controls */}
        <div
          style={{
            background: '#0b1120',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div>
            <h4 style={{ fontSize: '17px', color: 'var(--primary)', marginBottom: '4px' }}>
              {PRODUCT.name}
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Base Price: ${PRODUCT.basePrice} | Stock Available: {PRODUCT.stock} units
            </p>
          </div>

          {/* Color Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
              Color Finish:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {PRODUCT.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{
                    background: selectedColor === c ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    color: selectedColor === c ? '#0f172a' : 'var(--text-main)',
                    fontWeight: selectedColor === c ? 'bold' : 'normal',
                    fontSize: '12px',
                    padding: '6px 12px',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector with functional updates */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>
              Quantity (Functional Update: <code>setQuantity(prev =&gt; prev + delta)</code>):
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                style={{ padding: '6px 14px', fontSize: '16px' }}
              >
                -
              </button>
              <span style={{ fontSize: '16px', fontWeight: 'bold', minWidth: '32px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={isMaxStockReached}
                style={{ padding: '6px 14px', fontSize: '16px' }}
              >
                +
              </button>
              {isMaxStockReached && (
                <span style={{ fontSize: '12px', color: 'var(--danger)' }}>Max stock limit</span>
              )}
            </div>
          </div>

          {/* Addon Protection */}
          <div style={{ padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={hasCarePlan}
                onChange={(e) => setHasCarePlan(e.target.checked)}
              />
              <span>
                Add 2-Year Extended Care Protection Plan (<strong>+$29</strong>)
              </span>
            </label>
          </div>

          {/* Promo Code Input */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>
              Promo Coupon (Try &apos;REACT15&apos;):
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="REACT15"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={isCouponApplied}
                style={{ flex: 1, padding: '6px 10px', fontSize: '13px' }}
              />
              {isCouponApplied ? (
                <button onClick={removeCoupon} style={{ background: 'var(--danger)', color: '#fff', fontSize: '12px' }}>
                  Remove
                </button>
              ) : (
                <button onClick={applyCoupon} style={{ background: 'var(--accent)', color: '#fff', fontSize: '12px' }}>
                  Apply
                </button>
              )}
            </div>
          </div>

          <button
            onClick={resetAll}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              fontSize: '12px',
              padding: '6px',
            }}
          >
            ↺ Reset Configurator
          </button>
        </div>

        {/* Right: Live Order Summary Card */}
        <div
          style={{
            background: '#0b1120',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4 style={{ fontSize: '15px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px' }}>
              Live Order Breakdown
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Selected Finish:</span>
                <strong>{selectedColor}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Units ({quantity}x ${PRODUCT.basePrice}):</span>
                <span>${itemsSubtotal}</span>
              </div>

              {hasCarePlan && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent)' }}>
                  <span>Extended Warranty:</span>
                  <span>+$29</span>
                </div>
              )}

              {isCouponApplied && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                  <span>Discount (15% OFF):</span>
                  <span>-${discountAmount}</span>
                </div>
              )}

              <hr style={{ borderColor: 'var(--border-color)', margin: '4px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
                <span>Grand Total:</span>
                <span style={{ color: 'var(--primary)' }}>${grandTotal}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: '20px',
              padding: '10px',
              borderRadius: '6px',
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              lineHeight: '1.4',
            }}
          >
            💡 <strong>Why this matters:</strong> Notice that <code>grandTotal</code>, <code>itemsSubtotal</code>, and <code>discountAmount</code> are pure derived values. Storing them in separate state would create stale bugs!
          </div>
        </div>
      </div>
    </div>
  );
}
