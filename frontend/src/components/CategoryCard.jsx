import React from 'react';

/**
 * CategoryCard Component
 * Displays a single category with a high-resolution food image, name, and active pill.
 */
function CategoryCard({ category, isSelected, onSelect }) {
  // Curated category images
  const getCategoryImage = (name = '') => {
    const lower = name.toLowerCase();
    if (lower.includes('biryani')) return 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=350&auto=format&fit=crop&q=80';
    if (lower.includes('pizza')) return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=350&auto=format&fit=crop&q=80';
    if (lower.includes('burger')) return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=350&auto=format&fit=crop&q=80';
    if (lower.includes('south') || lower.includes('dosa')) return 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=350&auto=format&fit=crop&q=80';
    if (lower.includes('meal') || lower.includes('thali')) return 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=350&auto=format&fit=crop&q=80';
    if (lower.includes('beverage') || lower.includes('drink') || lower.includes('coffee')) return 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=350&auto=format&fit=crop&q=80';
    if (lower.includes('dessert')) return 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=350&auto=format&fit=crop&q=80';
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=350&auto=format&fit=crop&q=80';
  };

  const getCategoryIcon = (name = '') => {
    const lower = name.toLowerCase();
    if (lower.includes('biryani')) {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
        </svg>
      );
    }
    if (lower.includes('pizza')) {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="2" x2="12" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
        </svg>
      );
    }
    if (lower.includes('burger')) {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11a8 8 0 0 1 16 0H4z"></path>
          <line x1="2" y1="14" x2="22" y2="14"></line>
          <rect x="3" y="17" width="18" height="4" rx="2"></rect>
        </svg>
      );
    }
    if (lower.includes('south') || lower.includes('dosa')) {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="10" ry="6"></ellipse>
          <path d="M2 12v3c0 3.3 4.5 6 10 6s10-2.7 10-6v-3"></path>
        </svg>
      );
    }
    if (lower.includes('meal') || lower.includes('thali')) {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"></circle>
          <circle cx="8" cy="9" r="1.5"></circle>
          <circle cx="16" cy="9" r="1.5"></circle>
          <circle cx="12" cy="15" r="1.5"></circle>
        </svg>
      );
    }
    if (lower.includes('beverage') || lower.includes('drink') || lower.includes('coffee')) {
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        </svg>
      );
    }
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
        <path d="M7 2v20"></path>
      </svg>
    );
  };

  return (
    <button
      type="button"
      className={`category-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(category.id)}
      id={`category-item-${category.id}`}
    >
      <div className="category-image-wrap">
        <img
          src={getCategoryImage(category.name)}
          alt={category.name}
          className="category-image"
          loading="lazy"
        />
        <div className="category-icon-badge" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {getCategoryIcon(category.name)}
        </div>
      </div>
      <span className="category-card-name">{category.name}</span>
    </button>
  );
}

export default CategoryCard;
