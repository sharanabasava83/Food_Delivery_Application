import React from 'react';

/**
 * OrderConfirmation Page Component
 * Professional receipt & order confirmation summary.
 */
function OrderConfirmation({ order, onNavigate }) {
  if (!order) {
    return (
      <div className="container">
        <div className="cart-card empty-state">
          <h3>No order details found</h3>
          <p>Please select your items from the menu to place an order.</p>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
            onClick={() => onNavigate('home')}
          >
            ← Explore Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-root">
      <div className="order-confirmation-card">
        
        {/* Success Vector Emblem */}
        <div className="order-success-emblem">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h1 className="confirmation-title">Order Successfully Placed!</h1>
        <p className="confirmation-subtext">
          Thank you for choosing <strong>Dakshin Eats</strong>. Your meal is being prepared with fresh ingredients.
        </p>

        {/* Order Meta Box */}
        <div className="order-meta-box">
          <div className="meta-row">
            <span className="meta-label">Order Number:</span>
            <span className="meta-value-pill">{order.orderNumber}</span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Status:</span>
            <span className="meta-status-tag">CONFIRMED • PREPARING</span>
          </div>

          <div className="meta-row">
            <span className="meta-label">Customer:</span>
            <strong>{order.customer.name} ({order.customer.phone})</strong>
          </div>

          <div className="meta-row">
            <span className="meta-label">Delivery Address:</span>
            <span className="meta-address-text">{order.customer.shippingAddress}</span>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div className="confirmation-items-block">
          <h3 className="section-mini-heading">Ordered Items ({order.items.length})</h3>
          <div className="confirmation-items-list">
            {order.items.map((item) => (
              <div key={item.id} className="confirm-item-row">
                <div className="item-main-details">
                  <strong className="item-name">{item.name}</strong>
                  <span className="item-qty-tag">Qty: {item.quantity}</span>
                </div>
                <strong className="item-price">
                  ₹{(item.price * item.quantity).toFixed(0)}
                </strong>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="confirmation-bill-block">
          <div className="confirm-bill-row">
            <span>Subtotal:</span>
            <span>₹{order.subtotal.toFixed(2)}</span>
          </div>

          {order.discountAmount > 0 && (
            <div className="confirm-bill-row discount-row">
              <span>Coupon Discount ({order.couponCode}):</span>
              <span>-₹{order.discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="confirm-bill-row">
            <span>Delivery Fee:</span>
            <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee.toFixed(2)}`}</span>
          </div>

          <div className="confirm-bill-row total-paid-row">
            <span>Total Paid:</span>
            <span className="total-amount-tag">₹{order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            type="button"
            className="btn-order-more"
            onClick={() => {
              onNavigate('orders');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ background: '#EA580C', color: '#FFFFFF' }}
          >
            📋 View My Order History & Track →
          </button>

          <button
            type="button"
            className="btn-order-more"
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ background: '#F1F5F9', color: '#334155', border: '1px solid #CBD5E1' }}
          >
            ← Order More Delicious Food
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderConfirmation;
