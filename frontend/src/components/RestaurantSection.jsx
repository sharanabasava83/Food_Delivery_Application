import React from 'react';
import RestaurantCard from './RestaurantCard.jsx';

/**
 * RestaurantSection Component
 * Displays "Popular Restaurants" with 3-4 restaurant cards.
 */
function RestaurantSection({ restaurants, onSelectRestaurant }) {
  return (
    <section className="restaurant-section" id="popular-restaurants-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="section-tag">Top Partners</span>
            <h2 className="section-title">Popular Restaurants</h2>
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="restaurants-grid">
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSelectRestaurant={onSelectRestaurant}
              />
            ))
          ) : (
            <p className="loading-text">Loading partner restaurants...</p>
          )}
        </div>

      </div>
    </section>
  );
}

export default RestaurantSection;
