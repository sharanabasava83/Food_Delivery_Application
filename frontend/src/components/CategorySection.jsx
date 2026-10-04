import React from 'react';
import CategoryCard from './CategoryCard.jsx';

/**
 * CategorySection Component
 * Displays "Explore Categories" with horizontal scrolling / responsive grid.
 */
function CategorySection({ categories, selectedCategory, onSelectCategory }) {
  return (
    <section className="category-section" id="explore-categories-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <span className="section-tag">Delicious Choices</span>
            <h2 className="section-title">Explore Categories</h2>
          </div>
          
          {selectedCategory !== 'ALL' && (
            <button
              type="button"
              className="section-action-btn"
              onClick={() => onSelectCategory('ALL')}
            >
              Show All Categories ✕
            </button>
          )}
        </div>

        {/* Categories Horizontal Carousel / Flex Track */}
        <div className="categories-track">
          {/* "All" Category Pill */}
          <button
            type="button"
            className={`category-card category-all-card ${selectedCategory === 'ALL' ? 'selected' : ''}`}
            onClick={() => onSelectCategory('ALL')}
          >
            <div className="category-all-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
            <span className="category-card-name">All Menus</span>
          </button>

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onSelect={onSelectCategory}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default CategorySection;
