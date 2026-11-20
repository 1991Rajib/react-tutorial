import { useReducer, useState } from 'react';

const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', price: 99 },
  { id: 2, name: 'Mechanical Keyboard', price: 120 },
  { id: 3, name: 'Gaming Mouse', price: 59 },
];

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: Math.max(1, action.quantity) }
            : item
        ),
      };

    case 'APPLY_COUPON':
      if (action.code.toUpperCase() === 'REACT19') {
        return { ...state, discountPercent: 20, couponCode: 'REACT19', couponError: null };
      }
      return { ...state, couponError: 'Invalid coupon code. Try "REACT19"!' };

    case 'CLEAR_CART':
      return { items: [], discountPercent: 0, couponCode: '', couponError: null };

    default:
      return state;
  }
}

export default function AdvancedExample() {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [{ id: 1, name: 'Wireless Headphones', price: 99, quantity: 1 }],
    discountPercent: 0,
    couponCode: '',
    couponError: null,
  });

  const [couponInput, setCouponInput] = useState('');

  // Derived totals
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * state.discountPercent) / 100;
  const finalTotal = subtotal - discountAmount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>E-Commerce Cart State Machine</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
          Predictable action dispatching for complex state: adding, quantity updates, discounts, and order totals.
        </p>

        {/* Product Catalog */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {PRODUCTS.map((prod) => (
            <div key={prod.id} className="card" style={{ background: '#0b1120' }}>
              <p style={{ fontWeight: 'bold' }}>{prod.name}</p>
              <p style={{ color: 'var(--primary)', margin: '4px 0' }}>${prod.price}</p>
              <button
                onClick={() => dispatch({ type: 'ADD_ITEM', product: prod })}
                style={{ background: 'var(--primary)', color: '#0f172a', width: '100%', fontSize: '12px' }}
              >
                + Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart View */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h4>Your Cart ({state.items.length} items)</h4>
          {state.items.length > 0 && (
            <button
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
              style={{ background: 'transparent', color: 'var(--danger)', fontSize: '12px', padding: 0 }}
            >
              Clear All
            </button>
          )}
        </div>

        {state.items.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Your cart is empty. Add a product above!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {state.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#0b1120',
                  padding: '10px 14px',
                  borderRadius: '6px',
                }}
              >
                <div>
                  <p style={{ fontWeight: '500' }}>{item.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>${item.price} each</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity - 1 })}
                    style={{ padding: '4px 8px', fontSize: '12px' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                  <button
                    onClick={() => dispatch({ type: 'UPDATE_QUANTITY', id: item.id, quantity: item.quantity + 1 })}
                    style={{ padding: '4px 8px', fontSize: '12px' }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                    style={{ background: 'transparent', color: 'var(--danger)', fontSize: '14px', padding: '4px' }}
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <input
                type="text"
                placeholder="Enter coupon (e.g. REACT19)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                onClick={() => dispatch({ type: 'APPLY_COUPON', code: couponInput })}
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                Apply
              </button>
            </div>
            {state.couponError && (
              <p style={{ color: 'var(--danger)', fontSize: '12px' }}>{state.couponError}</p>
            )}
            {state.discountPercent > 0 && (
              <p style={{ color: 'var(--success)', fontSize: '12px' }}>
                🎉 Coupon {state.couponCode} applied: {state.discountPercent}% OFF!
              </p>
            )}

            {/* Total summary */}
            <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--success)' }}>
                  <span>Discount:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginTop: '8px' }}>
                <span>Order Total:</span>
                <span style={{ color: 'var(--primary)' }}>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
