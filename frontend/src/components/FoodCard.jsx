import React, { useState } from 'react';

/**
 * FoodCard Component
 * 
 * Layout matching exact user specifications:
 * - Large food image
 * - Veg / Non-Veg dot + Restaurant tag
 * - Food name
 * - Short description
 * - Rating (⭐ 4.5)
 * - Price (₹180) & Add button
 */
function FoodCard({ food, onAddToCart, cartItem }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // High-definition food photography selection based on name/category
  const getFoodImage = (food) => {
    const name = (food.name || '').toLowerCase();
    const cat = (food.categoryName || '').toLowerCase();

    if (name.includes('chicken biryani')) {
      return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80';
    }
    if (name.includes('paneer') || (cat.includes('biryani') && name.includes('veg'))) {
      return 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80';
    }
    if (name.includes('pepperoni')) {
      return 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80';
    }
    if (name.includes('pizza') || cat.includes('pizza')) {
      return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80';
    }
    if (name.includes('burger') || cat.includes('burger')) {
      return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80';
    }
    if (name.includes('dosa') || name.includes('idli') || cat.includes('south')) {
      return 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80';
    }
    if (name.includes('thali') || name.includes('meal') || cat.includes('meal')) {
      return 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop&q=80';
    }
    if (name.includes('coffee') || name.includes('tea') || cat.includes('beverage')) {
      return 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80';
    }
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80';
  };

  const isVeg = !(
    food.name.toLowerCase().includes('chicken') ||
    food.name.toLowerCase().includes('pepperoni') ||
    food.name.toLowerCase().includes('meat') ||
    food.name.toLowerCase().includes('mutton')
  );

  const handleAddClick = () => {
    setIsAdding(true);
    onAddToCart(food);
    setTimeout(() => setIsAdding(false), 400);
  };

  return (
    <article className="food-product-card" id={`food-card-${food.id}`}>
      {/* 1. Large Food Image Area */}
      <div className="food-card-media">
        <img
          src={getFoodImage(food)}
          alt={food.name}
          className={`food-product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        
        {/* Diet Indicator (Green veg dot vs Red non-veg) */}
        <div className={`diet-indicator ${isVeg ? 'veg' : 'non-veg'}`} title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}>
          <span className="diet-dot"></span>
        </div>

        {/* Category Pill Overlay */}
        {food.categoryName && (
          <span className="food-category-pill">{food.categoryName}</span>
        )}
      </div>

      {/* 2. Content Info */}
      <div className="food-card-content">
        <div className="food-restaurant-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>{food.restaurantName || 'Featured Kitchen'}</span>
        </div>

        <h3 className="food-item-name">{food.name}</h3>
        <p className="food-item-desc">{food.description}</p>

        {/* Rating Line */}
        <div className="food-rating-row">
          <span className="rating-star" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </span>
          <span className="rating-score">4.5</span>
          <span className="rating-reviews">(120+ orders)</span>
        </div>

        {/* 3. Price & Add Action */}
        <div className="food-card-action-row">
          <div className="price-container">
            <span className="currency-symbol">₹</span>
            <span className="price-amount">{Number(food.price).toFixed(0)}</span>
          </div>

          <button
            type="button"
            className={`btn-add-cart ${isAdding ? 'animating' : ''} ${cartItem ? 'in-cart' : ''}`}
            onClick={handleAddClick}
            aria-label={`Add ${food.name} to cart`}
          >
            {cartItem ? `+ Add (${cartItem.quantity})` : '+ Add'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default FoodCard;
