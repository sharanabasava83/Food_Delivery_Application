import React, { useState } from 'react';

/**
 * OfferCard Component
 * Displays coupon code, discount percentage, terms, and a 1-click copy button.
 */
function OfferCard({ coupon, onApplyCoupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(coupon.code);
    setCopied(true);
    if (onApplyCoupon) onApplyCoupon(coupon.code);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="offer-card" id={`coupon-card-${coupon.id}`}>
      <div className="offer-badge-pill">
        {coupon.discountPercentage ? `${coupon.discountPercentage}% OFF` : 'DEAL'}
      </div>

      <div className="offer-code-row">
        <span className="offer-code-text">{coupon.code}</span>
        <button
          type="button"
          className={`btn-copy-code ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          title="Click to copy coupon code"
        >
          {copied ? '✓ Copied!' : 'Copy Code'}
        </button>
      </div>

      <p className="offer-description">{coupon.description || 'Special discount on your meal order'}</p>

      <div className="offer-meta">
        {coupon.minOrderAmount ? `Min order: ₹${coupon.minOrderAmount}` : 'No minimum order required'}
      </div>
    </div>
  );
}

export default OfferCard;
