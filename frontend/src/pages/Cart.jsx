import React from 'react';
import CartItem from '../components/CartItem.jsx';

/**
 * Cart Page Component
 * Shows shopping cart items, quantities, subtotal, and checkout button.
 */
function Cart({ cartItems, onUpdateQty, onRemoveItem, onClearCart, onNavigate }) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <div className="cart-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Your Shopping Cart</span>
          </h2>
          <button className="btn btn-outline btn-sm" onClick={() => onNavigate('home')}>
            ← Back to Menu
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-state">
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h3>Your cart is empty!</h3>
            <p>Looks like you haven't added any delicious food yet.</p>
            <button
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
              onClick={() => onNavigate('home')}
            >
              Explore Menu
            </button>
          </div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Food Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQty={onUpdateQty}
                    onRemove={onRemoveItem}
                  />
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              <div className="summary-box">
                <div className="summary-row">
                  <span>Items Count:</span>
                  <span>{cartItems.reduce((acc, i) => acc + i.quantity, 0)} items</span>
                </div>
                <div className="summary-row total">
                  <span>Cart Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
                  <button className="btn btn-outline" onClick={onClearCart}>
                    Clear Cart
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => onNavigate('checkout')}
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
