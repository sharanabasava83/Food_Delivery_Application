import React from 'react';
import OfferCard from './OfferCard.jsx';

/**
 * OffersSection Component
 * Displays "Today's Offers" with promotional coupon cards.
 */
function OffersSection({ coupons, onApplyCoupon }) {
  return (
    <section className="offers-section" id="todays-offers-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="section-tag">Save Money</span>
            <h2 className="section-title">Today's Offers</h2>
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="offers-grid">
          {coupons && coupons.length > 0 ? (
            coupons.map((coupon) => (
              <OfferCard
                key={coupon.id}
                coupon={coupon}
                onApplyCoupon={onApplyCoupon}
              />
            ))
          ) : (
            <p className="loading-text">No active coupons at the moment.</p>
          )}
        </div>

      </div>
    </section>
  );
}

export default OffersSection;
