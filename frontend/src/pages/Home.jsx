import React, { useState, useRef } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import CategorySection from '../components/CategorySection.jsx';
import FoodSection from '../components/FoodSection.jsx';
import RestaurantSection from '../components/RestaurantSection.jsx';
import OffersSection from '../components/OffersSection.jsx';

/**
 * Premium Home Page Component
 * 
 * Follows exact user layout structure:
 *  1. Large Hero Section (55-65% viewport) with bold text, search, & food composition
 *  2. Explore Categories (Horizontal carousel of 6 categories)
 *  3. Popular Food (Horizontal responsive food cards)
 *  4. Popular Restaurants (3-4 restaurant cards)
 *  5. Today's Offers (Promotional coupons: FIRST50, COUPON-10, etc.)
 */
function Home({
  categories = [],
  restaurants = [],
  foods = [],
  coupons = [],
  onAddToCart,
  cartItems = [],
  searchQuery,
  setSearchQuery,
  onApplyCoupon,
  onNavigate,
  searchInputRef,
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Category selection handler (implements GET /api/foods/category/{categoryId} flow)
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setSelectedRestaurant(null);
    setSearchQuery('');
    // Smooth scroll down to popular food
    const el = document.getElementById('popular-food-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Restaurant selection handler
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedCategory('ALL');
    setSearchQuery('');
    // Smooth scroll down to popular food
    const el = document.getElementById('popular-food-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Reset all filters
  const handleClearFilters = () => {
    setSelectedCategory('ALL');
    setSelectedRestaurant(null);
    setSearchQuery('');
  };

  // Filter foods based on category, restaurant, or search query
  const filteredFoods = foods.filter((food) => {
    // 1. Category match
    const matchesCategory =
      selectedCategory === 'ALL' || food.categoryId === selectedCategory;

    // 2. Restaurant match
    const matchesRestaurant =
      !selectedRestaurant ||
      food.restaurantId === selectedRestaurant.id ||
      (food.restaurantName &&
        food.restaurantName.toLowerCase().includes(selectedRestaurant.name.toLowerCase()));

    // 3. Search keyword match
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      (food.name && food.name.toLowerCase().includes(q)) ||
      (food.description && food.description.toLowerCase().includes(q)) ||
      (food.categoryName && food.categoryName.toLowerCase().includes(q)) ||
      (food.restaurantName && food.restaurantName.toLowerCase().includes(q));

    return matchesCategory && matchesRestaurant && matchesSearch;
  });

  // Calculate descriptive filter title
  let activeFilterLabel = '';
  if (selectedRestaurant) {
    activeFilterLabel = `Restaurant: ${selectedRestaurant.name}`;
  } else if (selectedCategory !== 'ALL') {
    const catObj = categories.find((c) => c.id === selectedCategory);
    activeFilterLabel = `Category: ${catObj ? catObj.name : selectedCategory}`;
  } else if (searchQuery.trim() !== '') {
    activeFilterLabel = `"${searchQuery}"`;
  }

  return (
    <div className="home-page-root">
      {/* 1. Large Hero Section */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => setSelectedCategory('ALL')}
        onQuickFilter={(tag) => {
          setSearchQuery(tag);
          setSelectedCategory('ALL');
          setSelectedRestaurant(null);
        }}
        searchInputRef={searchInputRef}
      />

      {/* 2. Explore Categories */}
      <CategorySection
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Popular Food */}
      <FoodSection
        foods={filteredFoods}
        onAddToCart={onAddToCart}
        cartItems={cartItems}
        activeFilterText={activeFilterLabel}
        onClearFilter={handleClearFilters}
      />

      {/* 4. Popular Restaurants */}
      <RestaurantSection
        restaurants={restaurants}
        onSelectRestaurant={handleSelectRestaurant}
      />

      {/* 5. Today's Offers */}
      <OffersSection
        coupons={coupons}
        onApplyCoupon={(code) => {
          if (onApplyCoupon) onApplyCoupon(code);
          // Navigate to cart to see discount in action
          onNavigate('cart');
        }}
      />
    </div>
  );
}

export default Home;
