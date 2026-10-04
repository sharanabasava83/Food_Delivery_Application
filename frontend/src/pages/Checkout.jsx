import React, { useState, useEffect } from 'react';
import api from '../services/api.js';

/**
 * Checkout Page Component
 * Professional, clean, startup-grade checkout experience.
 * Features:
 * - 2-Column responsive split layout (Delivery Info + Order Breakdown)
 * - Automatic cart synchronization with backend
 * - Coupon validation engine with instant 1-click helper chips
 * - Clean order placement flow
 */
function Checkout({
  cartItems = [],
  onPlaceOrder,
  onNavigate,
  availableCoupons = [],
  initialCoupon = '',
}) {
  // Customer details form state (Auto-filled with Bengaluru location)
  const [customer, setCustomer] = useState({
    name: 'Sharanabasava D K',
    email: 'sharanabasava.dk@partner-demo.example.com',
    phone: '9876543210',
    shippingAddress: 'Flat 402, Green Valley Apartments, 12th Main, Indiranagar, Bengaluru, Karnataka 560038',
  });

  const [couponCode, setCouponCode] = useState(initialCoupon || '');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState({ text: '', isError: false });
  const [isApplying, setIsApplying] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Free delivery above ₹500, otherwise ₹40
  const deliveryFee = subtotal >= 500 ? 0 : (subtotal > 0 ? 40 : 0);

  // Auto-populate initial coupon if passed from Offers section
  useEffect(() => {
    if (initialCoupon && !couponCode) {
      setCouponCode(initialCoupon);
      applyCouponByCode(initialCoupon);
    }
  }, [initialCoupon]);

  // Core coupon application logic
  const applyCouponByCode = async (codeToApply) => {
    const cleanCode = (codeToApply || couponCode).trim().toUpperCase();

    if (!cleanCode) {
      setCouponMessage({ text: 'Please enter a coupon code', isError: true });
      return;
    }

    if (cartItems.length === 0) {
      setCouponMessage({ text: 'Your cart is empty. Add food items before applying a coupon.', isError: true });
      return;
    }

    setIsApplying(true);

    // 1. Sync cart items to backend cart for Customer ID 1 so Spring Boot backend is aware of the items
    try {
      await api.clearCart(1).catch(() => null);
      for (const item of cartItems) {
        if (item.foodId) {
          await api.addToCart(1, item.foodId, item.quantity || 1).catch(() => null);
        }
      }
    } catch {
      // Continue even if backend cart sync encountered network issue
    }

    // 2. Attempt backend validation
    try {
      const result = await api.validateCoupon(cleanCode, 1);
      if (result && (result.valid || result.discountAmount !== undefined)) {
        const discountAmt = Number(result.discountAmount) || 0;
        setAppliedCoupon({
          code: cleanCode,
          amount: discountAmt,
        });
        setCouponMessage({
          text: result.message || `Success! Coupon "${cleanCode}" applied! You saved ₹${discountAmt.toFixed(2)}`,
          isError: false,
        });
        setIsApplying(false);
        return;
      }
    } catch (apiError) {
      console.info('Backend coupon validation returned note, applying local rule engine:', apiError.message);
    }

    // 3. Fallback: Local rule evaluation matching standard business logic
    let discountPct = 0;
    let maxDiscount = Infinity;
    let minOrder = 0;

    // Check available coupons list from backend/app
    const matchedCoupon = availableCoupons.find(
      (cp) => cp.code.toUpperCase() === cleanCode
    );

    if (matchedCoupon) {
      discountPct = Number(matchedCoupon.discountPercentage) || 0;
      maxDiscount = matchedCoupon.maxDiscountAmount ? Number(matchedCoupon.maxDiscountAmount) : Infinity;
      minOrder = matchedCoupon.minOrderAmount ? Number(matchedCoupon.minOrderAmount) : 0;
    } else if (cleanCode === 'FIRST50') {
      discountPct = 50;
      maxDiscount = 150;
      minOrder = 150;
    } else if (cleanCode === 'COUPON-10') {
      discountPct = 10;
      minOrder = 100;
    } else if (cleanCode === 'COUPON-25') {
      discountPct = 25;
      minOrder = 200;
    } else if (cleanCode === 'COUPON-30') {
      discountPct = 30;
      minOrder = 300;
    } else {
      setCouponMessage({ text: `Invalid coupon code "${cleanCode}". Try FIRST50, COUPON-10, or COUPON-25`, isError: true });
      setAppliedCoupon(null);
      setIsApplying(false);
      return;
    }

    if (subtotal < minOrder) {
      setCouponMessage({
        text: `Coupon "${cleanCode}" requires a minimum order of ₹${minOrder}. Your subtotal is ₹${subtotal.toFixed(0)}.`,
        isError: true,
      });
      setAppliedCoupon(null);
      setIsApplying(false);
      return;
    }

    let calculatedDiscount = (subtotal * discountPct) / 100;
    if (calculatedDiscount > maxDiscount) {
      calculatedDiscount = maxDiscount;
    }

    setAppliedCoupon({
      code: cleanCode,
      percentage: discountPct,
      amount: calculatedDiscount,
    });
    setCouponMessage({
      text: `Success! Coupon "${cleanCode}" applied — ${discountPct}% OFF (Saved ₹${calculatedDiscount.toFixed(2)})`,
      isError: false,
    });
    setIsApplying(false);
  };

  const handleApplyCoupon = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    applyCouponByCode(couponCode);
  };

  const discountAmount = appliedCoupon ? appliedCoupon.amount : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim() || !customer.shippingAddress.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setIsPlacingOrder(true);

    const orderData = {
      orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customer,
      items: cartItems,
      subtotal,
      discountAmount,
      deliveryFee,
      totalAmount: finalTotal,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      status: 'CONFIRMED',
      date: new Date().toLocaleDateString(),
    };

    setTimeout(() => {
      onPlaceOrder(orderData);
      setIsPlacingOrder(false);
    }, 400);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty-container">
        <div className="checkout-empty-card">
          <div className="empty-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h2>Your Cart is Empty</h2>
          <p>Please select some delicious food from our menu before proceeding to checkout.</p>
          <button
            type="button"
            className="btn-return-menu"
            onClick={() => onNavigate('home')}
          >
            ← Explore Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-root">
      {/* 1. Header Bar */}
      <div className="checkout-top-header">
        <div>
          <button
            type="button"
            className="checkout-back-link"
            onClick={() => onNavigate('cart')}
          >
            ← Back to Cart
          </button>
          <h1 className="checkout-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '0.6rem' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Checkout & Order Summary</span>
          </h1>
          <p className="checkout-subtitle">
            Provide delivery details, apply coupon codes, and confirm your meal order.
          </p>
        </div>
      </div>

      {/* 2. Responsive Split Grid */}
      <form onSubmit={handleSubmitOrder} className="checkout-grid-layout">
        
        {/* LEFT COLUMN: Delivery Information Card */}
        <div className="checkout-card delivery-details-card">
          <div className="card-section-header">
            <span className="step-circle">1</span>
            <div>
              <h2 className="card-title">Delivery Information</h2>
              <p className="card-subtitle">Where should we deliver your hot food?</p>
            </div>
          </div>

          <div className="form-fields-grid">
            {/* Full Name */}
            <div className="checkout-form-group">
              <label className="checkout-label">Full Name *</label>
              <input
                className="checkout-input"
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
            </div>

            {/* Phone Number */}
            <div className="checkout-form-group">
              <label className="checkout-label">Phone Number *</label>
              <input
                className="checkout-input"
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              />
            </div>

            {/* Email Address */}
            <div className="checkout-form-group span-2">
              <label className="checkout-label">Email Address *</label>
              <input
                className="checkout-input"
                type="email"
                required
                placeholder="e.g. name@example.com"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              />
            </div>

            {/* Delivery Address */}
            <div className="checkout-form-group span-2">
              <label className="checkout-label">Delivery Address *</label>
              <textarea
                className="checkout-input textarea-address"
                rows="3"
                required
                placeholder="House / Flat No., Building Name, Street, Landmark, Area"
                value={customer.shippingAddress}
                onChange={(e) => setCustomer({ ...customer, shippingAddress: e.target.value })}
              />
            </div>
          </div>

          {/* Delivery Trust Badge */}
          <div className="delivery-eta-banner">
            <span className="eta-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </span>
            <div>
              <strong>Superfast Doorstep Delivery</strong>
              <small>Prepared fresh & delivered in approximately 25–30 minutes</small>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Breakdown & Payment */}
        <div className="checkout-card order-breakdown-card">
          <div className="card-section-header">
            <span className="step-circle">2</span>
            <div>
              <h2 className="card-title">Order Breakdown</h2>
              <p className="card-subtitle">{cartItems.length} dish{cartItems.length > 1 ? 'es' : ''} in your order</p>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="checkout-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item-row">
                <div className="item-left-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty-pill">Qty: {item.quantity}</span>
                </div>
                <strong className="item-subtotal">
                  ₹{(item.price * item.quantity).toFixed(0)}
                </strong>
              </div>
            ))}
          </div>

          {/* Promotional Coupon Box */}
          <div className="checkout-coupon-box">
            <label className="coupon-box-label">Have a Discount Coupon?</label>
            <div className="coupon-input-row">
              <input
                type="text"
                className="coupon-text-field"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              />
              <button
                type="button"
                className="btn-apply-coupon"
                disabled={isApplying}
                onClick={handleApplyCoupon}
              >
                {isApplying ? 'Applying...' : 'Apply'}
              </button>
            </div>

            {/* Quick Helper Suggestion Chips */}
            <div className="coupon-quick-chips">
              <span className="chip-label">Quick Apply:</span>
              <button
                type="button"
                className="coupon-chip"
                onClick={() => {
                  setCouponCode('FIRST50');
                  applyCouponByCode('FIRST50');
                }}
              >
                FIRST50 (50% OFF)
              </button>
              <button
                type="button"
                className="coupon-chip"
                onClick={() => {
                  setCouponCode('COUPON-25');
                  applyCouponByCode('COUPON-25');
                }}
              >
                COUPON-25 (25% OFF)
              </button>
            </div>

            {/* Coupon Result Message Banner */}
            {couponMessage.text && (
              <div className={`coupon-feedback-banner ${couponMessage.isError ? 'error' : 'success'}`}>
                {couponMessage.text}
              </div>
            )}
          </div>

          {/* Bill Calculation Details */}
          <div className="checkout-bill-details">
            <div className="bill-row">
              <span>Item Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="bill-row">
              <span>Delivery Fee:</span>
              <span>
                {deliveryFee === 0 ? (
                  <strong className="free-tag">FREE</strong>
                ) : (
                  `₹${deliveryFee.toFixed(2)}`
                )}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="bill-row discount-highlight">
                <span>Coupon Savings ({appliedCoupon?.code}):</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="bill-row total-row">
              <span>Total Payable:</span>
              <span className="final-price-tag">₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Primary CTA Submit Button */}
          <button
            type="submit"
            className="btn-place-order-cta"
            disabled={isPlacingOrder}
          >
            {isPlacingOrder ? 'Confirming Order...' : `Confirm & Place Order • ₹${finalTotal.toFixed(2)}`}
          </button>

          <p className="checkout-secure-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '0.35rem' }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            100% Safe & Secure Food Order Confirmation
          </p>
        </div>

      </form>
    </div>
  );
}

export default Checkout;
