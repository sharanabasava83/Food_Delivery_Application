import React from 'react';
import BrandLogo from './BrandLogo.jsx';

/**
 * 100% Authentic Food-Delivery Startup Footer Component
 * Clean, customer-facing, free of developer tech-stack badges.
 */
function Footer({ onNavigate }) {
  const scrollTo = (id) => {
    onNavigate('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* 1. Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-brand" onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <BrandLogo size="medium" />
          </div>
          <p className="footer-tagline">
            Authentic South Indian & multi-cuisine delicacies from your favorite local kitchens, freshly prepared and delivered right to your door.
          </p>
          <div className="footer-trust-pills">
            <span className="trust-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              30-Min Fast Delivery
            </span>
            <span className="trust-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              100% Hygienic Kitchens
            </span>
            <span className="trust-pill">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem' }}>
                <path d="M2 22s2.5-3.5 6-4.5c4-1 6-4 6-9 0-3-2-4.5-4-4.5-3 0-5 2-6 5-.5 1.5-.5 3.5 0 5L2 22z"></path>
                <path d="M12 13.5c2 1 4 1.5 6 1.5 3 0 4-1 4-1s-1 3-3 4.5c-2.5 2-6 2-7 1.5"></path>
              </svg>
              Fresh Ingredients
            </span>
          </div>
        </div>

        {/* 2. Quick Navigation Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Discover</h4>
          <ul className="footer-links">
            <li><button type="button" onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</button></li>
            <li><button type="button" onClick={() => scrollTo('explore-categories-section')}>Explore Categories</button></li>
            <li><button type="button" onClick={() => scrollTo('popular-food-section')}>Popular Dishes</button></li>
            <li><button type="button" onClick={() => scrollTo('popular-restaurants-section')}>Featured Restaurants</button></li>
            <li><button type="button" onClick={() => scrollTo('todays-offers-section')}>Today's Offers & Deals</button></li>
          </ul>
        </div>

        {/* 3. Popular Cuisines Column (Clean Text, No Unwanted Emojis) */}
        <div className="footer-col">
          <h4 className="footer-heading">Popular Cuisines</h4>
          <ul className="footer-links">
            <li><button type="button" onClick={() => scrollTo('popular-food-section')}>Hyderabadi Dum Biryani</button></li>
            <li><button type="button" onClick={() => scrollTo('popular-food-section')}>Handcrafted Artisan Pizza</button></li>
            <li><button type="button" onClick={() => scrollTo('popular-food-section')}>Gourmet Burgers & Fries</button></li>
            <li><button type="button" onClick={() => scrollTo('popular-food-section')}>Crispy Butter Masala Dosa</button></li>
            <li><button type="button" onClick={() => scrollTo('popular-food-section')}>Traditional Indian Meals</button></li>
            <li><button type="button" onClick={() => scrollTo('popular-food-section')}>Cold Coffees & Shakes</button></li>
          </ul>
        </div>

        {/* 4. Customer & Restaurant Support (Customer-focused, No developer links) */}
        <div className="footer-col">
          <h4 className="footer-heading">Customer Care</h4>
          <ul className="footer-links">
            <li><button type="button" onClick={() => onNavigate('cart')}>My Cart</button></li>
            <li><button type="button" onClick={() => { onNavigate('orders'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>My Orders & Tracking</button></li>
            <li><button type="button" onClick={() => onNavigate('admin')}>Restaurant & Kitchen Portal</button></li>
            <li><button type="button" onClick={() => { onNavigate('support'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Help & Support</button></li>
            <li><button type="button" onClick={() => { onNavigate('partner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Partner With Us</button></li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 Dakshin Eats. All rights reserved.</p>
          <p className="footer-safe-text">Fresh Food Delivery • Safe & Contactless Delivery</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
