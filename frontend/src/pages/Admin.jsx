import React, { useState } from 'react';

/**
 * Admin Management Dashboard Component
 * Clean, modern, startup-grade dashboard for managing:
 * - Categories
 * - Restaurants / Kitchens
 * - Food Catalog
 * - Discount Coupons
 */
function Admin({
  categories = [],
  onAddCategory,
  onDeleteCategory,
  restaurants = [],
  onAddRestaurant,
  onDeleteRestaurant,
  foods = [],
  onAddFood,
  onDeleteFood,
  coupons = [],
  onAddCoupon,
  onDeleteCoupon,
}) {
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' | 'restaurants' | 'foods' | 'coupons'

  // Form States
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newRestaurant, setNewRestaurant] = useState({ name: '', address: '', phone: '', description: '' });
  const [newFood, setNewFood] = useState({ name: '', description: '', price: '', categoryId: '', restaurantId: '' });
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    couponType: 'PERCENTAGE',
    discountPercentage: '',
    minOrderAmount: '',
    maxDiscountAmount: '',
  });

  return (
    <div className="admin-page-container">
      {/* 1. Dashboard Header */}
      <div className="admin-header-card">
        <div className="admin-header-text">
          <div className="admin-badge-tag">ADMIN PORTAL</div>
          <h1 className="admin-main-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '0.6rem' }}>
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span>Admin Management Dashboard</span>
          </h1>
          <p className="admin-subtitle">
            Configure food categories, partner kitchens, menu products, and discount promotions in real time.
          </p>
        </div>

        {/* Quick KPI Stat Counter Cards */}
        <div className="admin-kpi-row">
          <div className="admin-kpi-pill">
            <span className="kpi-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </span>
            <div>
              <strong>{categories.length}</strong>
              <small>Categories</small>
            </div>
          </div>

          <div className="admin-kpi-pill">
            <span className="kpi-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </span>
            <div>
              <strong>{restaurants.length}</strong>
              <small>Restaurants</small>
            </div>
          </div>

          <div className="admin-kpi-pill">
            <span className="kpi-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </span>
            <div>
              <strong>{foods.length}</strong>
              <small>Dishes</small>
            </div>
          </div>

          <div className="admin-kpi-pill">
            <span className="kpi-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </span>
            <div>
              <strong>{coupons.length}</strong>
              <small>Coupons</small>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Modern Segmented Tab Bar */}
      <div className="admin-tabs-nav">
        <button
          type="button"
          className={`admin-tab-item ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <span className="tab-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </span>
          <span>Categories</span>
          <span className="tab-count-badge">{categories.length}</span>
        </button>

        <button
          type="button"
          className={`admin-tab-item ${activeTab === 'restaurants' ? 'active' : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          <span className="tab-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </span>
          <span>Restaurants</span>
          <span className="tab-count-badge">{restaurants.length}</span>
        </button>

        <button
          type="button"
          className={`admin-tab-item ${activeTab === 'foods' ? 'active' : ''}`}
          onClick={() => setActiveTab('foods')}
        >
          <span className="tab-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              <line x1="6" y1="1" x2="6" y2="4"></line>
              <line x1="10" y1="1" x2="10" y2="4"></line>
              <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
          </span>
          <span>Food Products</span>
          <span className="tab-count-badge">{foods.length}</span>
        </button>

        <button
          type="button"
          className={`admin-tab-item ${activeTab === 'coupons' ? 'active' : ''}`}
          onClick={() => setActiveTab('coupons')}
        >
          <span className="tab-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
              <line x1="7" y1="7" x2="7.01" y2="7"></line>
            </svg>
          </span>
          <span>Coupons & Offers</span>
          <span className="tab-count-badge">{coupons.length}</span>
        </button>
      </div>

      {/* 3. TAB CONTENT: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="admin-split-grid">
          {/* Form Card */}
          <div className="admin-panel-card form-panel">
            <div className="panel-header">
              <h3>Add New Category</h3>
              <p>Create a new food classification for your menu</p>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCategory.name.trim()) return;
                onAddCategory(newCategory);
                setNewCategory({ name: '', description: '' });
              }}
            >
              <div className="admin-input-group">
                <label className="admin-label">Category Name *</label>
                <input
                  type="text"
                  className="admin-field"
                  required
                  placeholder="e.g. South Indian, Biryani, Tandoor"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Description</label>
                <textarea
                  className="admin-field"
                  rows="3"
                  placeholder="Describe items in this category..."
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-admin-submit">
                <span>+</span> Save Category
              </button>
            </form>
          </div>

          {/* Table Card */}
          <div className="admin-panel-card table-panel">
            <div className="panel-header">
              <h3>Existing Categories ({categories.length})</h3>
              <p>List of all active customer menu categories</p>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td><span className="admin-id-pill">#{c.id}</span></td>
                      <td>
                        <strong className="item-title">{c.name}</strong>
                      </td>
                      <td className="item-desc">{c.description || '—'}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => onDeleteCategory(c.id)}
                          title="Delete Category"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: RESTAURANTS */}
      {activeTab === 'restaurants' && (
        <div className="admin-split-grid">
          {/* Form Card */}
          <div className="admin-panel-card form-panel">
            <div className="panel-header">
              <h3>Add New Restaurant</h3>
              <p>Register a partner kitchen or cloud kitchen</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newRestaurant.name.trim()) return;
                onAddRestaurant(newRestaurant);
                setNewRestaurant({ name: '', address: '', phone: '', description: '' });
              }}
            >
              <div className="admin-input-group">
                <label className="admin-label">Restaurant Name *</label>
                <input
                  type="text"
                  className="admin-field"
                  required
                  placeholder="e.g. Spice Kitchen, Paradise Biryani"
                  value={newRestaurant.name}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Contact Phone</label>
                <input
                  type="tel"
                  className="admin-field"
                  placeholder="e.g. 9876500001"
                  value={newRestaurant.phone}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, phone: e.target.value })}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Location / Address</label>
                <input
                  type="text"
                  className="admin-field"
                  placeholder="e.g. Connaught Place, Central City"
                  value={newRestaurant.address}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Cuisine Description</label>
                <input
                  type="text"
                  className="admin-field"
                  placeholder="e.g. South Indian • Dosa • Filter Coffee"
                  value={newRestaurant.description}
                  onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-admin-submit">
                <span>+</span> Save Restaurant
              </button>
            </form>
          </div>

          {/* Table Card */}
          <div className="admin-panel-card table-panel">
            <div className="panel-header">
              <h3>Registered Restaurants ({restaurants.length})</h3>
              <p>Active partner food vendors on Dakshin Eats</p>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Restaurant</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurants.map((r) => (
                    <tr key={r.id}>
                      <td><span className="admin-id-pill">#{r.id}</span></td>
                      <td>
                        <strong className="item-title">{r.name}</strong>
                        {r.description && <small className="item-sub-tag">{r.description}</small>}
                      </td>
                      <td>{r.phone || '—'}</td>
                      <td>{r.address || '—'}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => onDeleteRestaurant(r.id)}
                          title="Delete Restaurant"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT: FOODS */}
      {activeTab === 'foods' && (
        <div className="admin-split-grid">
          {/* Form Card */}
          <div className="admin-panel-card form-panel">
            <div className="panel-header">
              <h3>Add New Dish</h3>
              <p>Add a delicious food item to the catalog</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newFood.name || !newFood.price || !newFood.categoryId) {
                  alert('Please fill Food Name, Price, and Category');
                  return;
                }
                onAddFood(newFood);
                setNewFood({ name: '', description: '', price: '', categoryId: '', restaurantId: '' });
              }}
            >
              <div className="admin-input-group">
                <label className="admin-label">Dish Name *</label>
                <input
                  type="text"
                  className="admin-field"
                  required
                  placeholder="e.g. Masala Dosa, Chicken Biryani"
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Price (₹) *</label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  className="admin-field"
                  required
                  placeholder="e.g. 199"
                  value={newFood.price}
                  onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Category *</label>
                <select
                  className="admin-field"
                  required
                  value={newFood.categoryId}
                  onChange={(e) => setNewFood({ ...newFood, categoryId: Number(e.target.value) })}
                >
                  <option value="">-- Choose Category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Partner Restaurant</label>
                <select
                  className="admin-field"
                  value={newFood.restaurantId}
                  onChange={(e) => setNewFood({ ...newFood, restaurantId: Number(e.target.value) })}
                >
                  <option value="">-- Choose Restaurant --</option>
                  {restaurants.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Description</label>
                <textarea
                  className="admin-field"
                  rows="2"
                  placeholder="Ingredients, preparation, taste notes..."
                  value={newFood.description}
                  onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-admin-submit">
                <span>+</span> Save Dish
              </button>
            </form>
          </div>

          {/* Table Card */}
          <div className="admin-panel-card table-panel">
            <div className="panel-header">
              <h3>Food Menu Products ({foods.length})</h3>
              <p>Active items displayed in Popular Food catalog</p>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Dish Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((f) => (
                    <tr key={f.id}>
                      <td><span className="admin-id-pill">#{f.id}</span></td>
                      <td>
                        <strong className="item-title">{f.name}</strong>
                        {f.restaurantName && (
                          <small className="item-sub-tag">{f.restaurantName}</small>
                        )}
                      </td>
                      <td>
                        <span className="admin-category-tag">{f.categoryName || 'General'}</span>
                      </td>
                      <td><strong className="price-tag">₹{Number(f.price).toFixed(0)}</strong></td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => onDeleteFood(f.id)}
                          title="Delete Dish"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB CONTENT: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="admin-split-grid">
          {/* Form Card */}
          <div className="admin-panel-card form-panel">
            <div className="panel-header">
              <h3>Add New Coupon</h3>
              <p>Create a discount code for customer orders</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCoupon.code.trim()) return;
                if (Number(newCoupon.discountPercentage) > 50) {
                  alert('Validation Rule: Discount percentage cannot exceed 50%!');
                  return;
                }
                onAddCoupon(newCoupon);
                setNewCoupon({
                  code: '',
                  description: '',
                  couponType: 'PERCENTAGE',
                  discountPercentage: '',
                  minOrderAmount: '',
                  maxDiscountAmount: '',
                });
              }}
            >
              <div className="admin-input-group">
                <label className="admin-label">Coupon Code *</label>
                <input
                  type="text"
                  className="admin-field code-field"
                  required
                  placeholder="e.g. FIRST50, DAKSHIN25"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Discount % (Max 50%) *</label>
                <input
                  type="number"
                  max="50"
                  min="1"
                  className="admin-field"
                  required
                  placeholder="e.g. 10, 25, 50"
                  value={newCoupon.discountPercentage}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountPercentage: e.target.value })}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  min="0"
                  className="admin-field"
                  placeholder="e.g. 150"
                  value={newCoupon.minOrderAmount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minOrderAmount: e.target.value })}
                />
              </div>

              <div className="admin-input-group">
                <label className="admin-label">Description</label>
                <input
                  type="text"
                  className="admin-field"
                  placeholder="e.g. 50% off on your first order"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-admin-submit">
                <span>+</span> Save Coupon
              </button>
            </form>
          </div>

          {/* Table Card */}
          <div className="admin-panel-card table-panel">
            <div className="panel-header">
              <h3>Active Promotional Coupons ({coupons.length})</h3>
              <p>Codes eligible for customer checkout validation</p>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Terms & Description</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((cp) => (
                    <tr key={cp.id}>
                      <td><span className="admin-coupon-badge">{cp.code}</span></td>
                      <td>
                        <strong className="discount-tag">{cp.discountPercentage}% OFF</strong>
                      </td>
                      <td className="item-desc">
                        {cp.description || 'Special meal discount'}
                        {cp.minOrderAmount && (
                          <small className="min-order-pill">Min ₹{cp.minOrderAmount}</small>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => onDeleteCoupon(cp.id)}
                          title="Delete Coupon"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
