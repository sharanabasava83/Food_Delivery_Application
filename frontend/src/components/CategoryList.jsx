import React from 'react';

/**
 * CategoryList Component
 * Displays horizontal pill buttons to filter foods by category.
 * 
 * Props:
 * - categories: Array of category objects [{ id, name, description }]
 * - selectedCategory: Currently selected category ID (or 'ALL')
 * - onSelectCategory: Callback function when a user clicks a pill
 */
function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <section className="category-section">
      <h2 className="category-title">Explore Categories</h2>
      <div className="category-list">
        {/* "All" button to clear filter */}
        <button
          className={`category-pill ${selectedCategory === 'ALL' ? 'active' : ''}`}
          onClick={() => onSelectCategory('ALL')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }}>
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          All Items
        </button>

        {/* Dynamic Category Pills */}
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryList;
