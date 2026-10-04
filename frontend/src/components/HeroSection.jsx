import React from 'react';

/**
 * HeroSection Component
 * 
 * Occupies 55-65% of viewport with warm cream/coral background.
 * Left Side:
 *  - Badge: "Fresh Food • Fast Delivery"
 *  - Headline: "Delicious food, delivered to your door."
 *  - Subtitle: "Discover delicious food from your favourite restaurants and order easily."
 *  - Search Bar + Helper text: "Try biryani, pizza, burger or dosa"
 *  - 3 Benefits: Fast Delivery, Great Restaurants, Great Offers
 * 
 * Right Side:
 *  - Artistic food composition: Biryani bowl, Pizza, Burger, Dosa
 *  - Floating rating & discount badges, subtle decorative shadows
 */
function HeroSection({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onQuickFilter,
  searchInputRef,
}) {
  const quickTags = ['biryani', 'pizza', 'burger', 'dosa'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
    // Smooth scroll down to popular food
    const el = document.getElementById('popular-food-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="hero-background-glow"></div>
      <div className="hero-container">
        
        {/* LEFT COLUMN: Content & Search */}
        <div className="hero-left">
          {/* Fresh Badge */}
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span className="badge-text">Fresh Food • Fast Delivery</span>
          </div>

          {/* Large Bold Headline */}
          <h1 className="hero-title">
            Delicious food,<br />
            <span className="hero-title-accent">delivered to your door.</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Discover delicious food from your favourite restaurants and order easily.
          </p>

          {/* Large Search Bar */}
          <form className="hero-search-form" onSubmit={handleSubmit}>
            <div className="hero-search-wrapper">
              <span className="search-icon" style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                ref={searchInputRef}
                id="hero-search-input"
                type="text"
                className="hero-search-input"
                placeholder="Search food, restaurant or category..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              <button type="submit" className="hero-search-btn">
                Search
              </button>
            </div>
          </form>

          {/* Quick Helper Text / Tags */}
          <div className="hero-helper-tags">
            <span className="helper-label">Try:</span>
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className="helper-chip"
                onClick={() => {
                  onSearchChange(tag);
                  if (onQuickFilter) onQuickFilter(tag);
                  const el = document.getElementById('popular-food-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* 3 Core Benefits */}
          <div className="hero-benefits-grid">
            <div className="hero-benefit-item">
              <div className="benefit-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="5.5" cy="17.5" r="3.5"></circle>
                  <circle cx="18.5" cy="17.5" r="3.5"></circle>
                  <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L8 12H5"></path>
                  <path d="M12 17.5V14l3.5-3 2.5 3"></path>
                </svg>
              </div>
              <div className="benefit-text">
                <span className="benefit-title">Fast Delivery</span>
                <span className="benefit-desc">Delivered to your doorstep</span>
              </div>
            </div>

            <div className="hero-benefit-item">
              <div className="benefit-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                  <path d="M7 2v20"></path>
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"></path>
                </svg>
              </div>
              <div className="benefit-text">
                <span className="benefit-title">Great Restaurants</span>
                <span className="benefit-desc">Choose from delicious food</span>
              </div>
            </div>

            <div className="hero-benefit-item">
              <div className="benefit-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <div className="benefit-text">
                <span className="benefit-title">Great Offers</span>
                <span className="benefit-desc">Save on your order</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Artistic Food Composition */}
        <div className="hero-right">
          <div className="food-composition-wrapper">
            
            {/* Subtle Abstract Decorative Circles */}
            <div className="decor-circle decor-circle-1"></div>
            <div className="decor-circle decor-circle-2"></div>
            
            {/* 1. Main Large Biryani Bowl (Center Top) */}
            <div className="food-element food-biryani">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&auto=format&fit=crop&q=80"
                alt="Aromatic Hyderabadi Biryani"
                className="food-img"
                loading="eager"
              />
              <span className="food-pill-tag">Authentic Biryani</span>
            </div>

            {/* 2. Cheesy Handcrafted Pizza (Right Bottom) */}
            <div className="food-element food-pizza">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80"
                alt="Wood-Fired Pizza"
                className="food-img"
                loading="eager"
              />
              <span className="food-pill-tag">Wood-Fired Pizza</span>
            </div>

            {/* 3. Gourmet Juicy Burger (Left Bottom) */}
            <div className="food-element food-burger">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
                alt="Crispy Gourmet Burger"
                className="food-img"
                loading="eager"
              />
              <span className="food-pill-tag">Gourmet Burgers</span>
            </div>

            {/* 4. Golden Crispy Dosa (Floating Top-Left Accent) */}
            <div className="food-element food-dosa">
              <img
                src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80"
                alt="Crispy Masala Dosa"
                className="food-img"
                loading="eager"
              />
              <span className="food-pill-tag">Crispy Dosa</span>
            </div>

            {/* Floating Info Badge 1: Top Rated */}
            <div className="floating-badge badge-top-rated">
              <span className="floating-badge-icon" style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </span>
              <div>
                <strong>4.9 / 5.0</strong>
                <small>Top Rated Dishes</small>
              </div>
            </div>

            {/* Floating Info Badge 2: Delivery Speed */}
            <div className="floating-badge badge-speed">
              <span className="floating-badge-icon" style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </span>
              <div>
                <strong>25 Mins</strong>
                <small>Average Delivery</small>
              </div>
            </div>

            {/* Floating Info Badge 3: Discount Promo */}
            <div className="floating-badge badge-discount">
              <span className="floating-badge-icon" style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2c1 3 4 5 4 9a6 6 0 0 1-12 0c0-4 3-6 4-9 1 2 2 3 4 0z"></path>
                </svg>
              </span>
              <div>
                <strong>50% OFF</strong>
                <small>Code: FIRST50</small>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
