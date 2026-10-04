import React from 'react';
import FoodCard from './FoodCard.jsx';

/**
 * FoodSection Component
 * Displays "Popular Food" in a horizontal responsive layout.
 */
function FoodSection({ foods, onAddToCart, cartItems = [], activeFilterText, onClearFilter }) {
  return (
    <section className="food-section" id="popular-food-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="section-tag">Chef's Specials</span>
            <h2 className="section-title">Popular Food</h2>
            {activeFilterText && (
              <p className="section-filter-sub">
                Showing results for <strong>"{activeFilterText}"</strong>
              </p>
            )}
          </div>

          {activeFilterText && (
            <button
              type="button"
              className="section-action-btn"
              onClick={onClearFilter}
            >
              Reset Filter ✕
            </button>
          )}
        </div>

        {/* Responsive Food Cards Grid */}
        {foods && foods.length > 0 ? (
          <div className="food-cards-grid">
            {foods.map((food) => {
              const cartItem = cartItems.find((ci) => ci.foodId === food.id);
              return (
                <FoodCard
                  key={food.id}
                  food={food}
                  onAddToCart={onAddToCart}
                  cartItem={cartItem}
                />
              );
            })}
          </div>
        ) : (
          <div className="empty-catalog-state">
            <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.85 }}>
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <h3>No dishes match your filter</h3>
            <p>Try searching for a different dish, category, or clear your filters.</p>
            <button
              type="button"
              className="btn-retry"
              onClick={onClearFilter}
            >
              View All Dishes
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default FoodSection;
