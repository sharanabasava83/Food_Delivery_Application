import React from 'react';

/**
 * RestaurantCard Component
 * Displays restaurant image, name, cuisine tags, rating, and "View Menu →".
 */
function RestaurantCard({ restaurant, onSelectRestaurant }) {
  const getRestaurantImage = (name = '') => {
    const lower = name.toLowerCase();
    if (lower.includes('spice') || lower.includes('kitchen')) {
      return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80';
    }
    if (lower.includes('biryani') || lower.includes('paradise')) {
      return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80';
    }
    if (lower.includes('domino') || lower.includes('pizza')) {
      return 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop&q=80';
    }
    if (lower.includes('burger') || lower.includes('point')) {
      return 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80';
    }
    return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80';
  };

  const getCuisineTag = (name = '') => {
    const lower = name.toLowerCase();
    if (lower.includes('paradise')) return 'Biryani • Hyderabadi • Mughlai';
    if (lower.includes('domino')) return 'Pizza • Italian • Fast Food';
    if (lower.includes('burger')) return 'Burgers • Shakes • American';
    return 'Biryani • North Indian • Tandoor';
  };

  return (
    <article className="restaurant-card" id={`restaurant-${restaurant.id}`}>
      <div className="restaurant-image-wrapper">
        <img
          src={getRestaurantImage(restaurant.name)}
          alt={restaurant.name}
          className="restaurant-image"
          loading="lazy"
        />
        <span className="restaurant-delivery-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
          25-30 min
        </span>
      </div>

      <div className="restaurant-details">
        <div className="restaurant-top-row">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <span className="restaurant-rating" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            4.5
          </span>
        </div>

        <p className="restaurant-cuisine">{getCuisineTag(restaurant.name)}</p>
        <p className="restaurant-address" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{restaurant.address || 'Central City'}</span>
        </p>

        <button
          type="button"
          className="btn-view-menu"
          onClick={() => onSelectRestaurant(restaurant)}
        >
          View Menu <span className="arrow">→</span>
        </button>
      </div>
    </article>
  );
}

export default RestaurantCard;
