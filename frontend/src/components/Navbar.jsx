import React, { useState, useRef, useEffect } from 'react';

import BrandLogo from './BrandLogo.jsx';

/**
 * Clean & Minimal Startup-Style Header
 * 
 * Left: Professional Logo + Dakshin Eats
 * Center: Home, Restaurants, Categories, My Orders
 * Right: Search icon, Cart (with badge), Admin, Login (👤 Login ⌄)
 */
function Navbar({
  activePage,
  onNavigate,
  cartCount,
  onFocusSearch,
  isBackendConnected,
  currentUser,
  onLogout,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    if (target === 'home') {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'restaurants') {
      if (activePage !== 'home') onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('popular-restaurants-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (target === 'categories') {
      if (activePage !== 'home') onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('explore-categories-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (target === 'orders') {
      onNavigate('orders');
    } else {
      onNavigate(target);
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo */}
        <div className="header-brand" onClick={() => handleNavClick('home')}>
          <BrandLogo size="medium" />
        </div>

        {/* Center Navigation Links */}
        <nav className={`header-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button
            type="button"
            className={`nav-link-btn ${activePage === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => handleNavClick('restaurants')}
          >
            Restaurants
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => handleNavClick('categories')}
          >
            Categories
          </button>
          <button
            type="button"
            className={`nav-link-btn ${activePage === 'orders' ? 'active' : ''}`}
            onClick={() => handleNavClick('orders')}
          >
            My Orders
          </button>
        </nav>

        {/* Right Navigation Actions */}
        <div className="header-actions">
          {/* Search Icon */}
          <button
            type="button"
            className="header-action-btn search-toggle"
            title="Search food, restaurants..."
            onClick={() => {
              if (activePage !== 'home') onNavigate('home');
              if (onFocusSearch) onFocusSearch();
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Cart Button with Count Badge */}
          <button
            type="button"
            className={`header-cart-btn ${activePage === 'cart' || activePage === 'checkout' ? 'active' : ''}`}
            onClick={() => onNavigate('cart')}
            title="View Shopping Cart"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="cart-vector-icon">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="cart-label">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Admin Portal Button */}
          <button
            type="button"
            className={`header-action-btn admin-toggle ${activePage === 'admin' ? 'active' : ''}`}
            onClick={() => onNavigate('admin')}
            title="Admin Dashboard"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="admin-vector-icon">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span className="admin-text">Admin</span>
          </button>

          {/* User Account / Login Button matching requested (👤) Login ⌄ design */}
          <div
            className="header-user-menu-container"
            ref={userMenuRef}
            onMouseEnter={() => {
              if (currentUser) setUserMenuOpen(true);
            }}
            onMouseLeave={() => {
              if (currentUser) setUserMenuOpen(false);
            }}
          >
            <button
              type="button"
              className={`header-login-menu-btn ${userMenuOpen ? 'open' : ''} ${activePage === 'orders' ? 'active' : ''}`}
              onClick={(e) => {
                if (currentUser) {
                  onNavigate('orders');
                  setUserMenuOpen(false);
                } else {
                  onNavigate('login');
                }
              }}
              aria-expanded={userMenuOpen}
              title={currentUser ? `Click to view Order History for ${currentUser.name}` : 'Login'}
            >
              {/* Circular User Icon matching requested (👤) */}
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="nav-user-avatar-icon"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="9.5" r="3.2" />
                <path d="M6.2 18.2c1.2-2.3 3.4-3.5 5.8-3.5s4.6 1.2 5.8 3.5" />
              </svg>

              <span className="login-btn-text">
                {currentUser ? (currentUser.name ? currentUser.name.split(' ')[0] : 'Account') : 'Login'}
              </span>

              {/* Downward Chevron Icon ⌄ */}
              <span
                className="nav-chevron-hitbox"
                onClick={(e) => {
                  if (currentUser) {
                    e.stopPropagation();
                    setUserMenuOpen((prev) => !prev);
                  }
                }}
                title="Account menu"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '2px' }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`nav-chevron-down ${userMenuOpen ? 'rotated' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {/* Dropdown Menu */}
            {userMenuOpen && (
              <div className="nav-user-dropdown-card">
                {currentUser ? (
                  <>
                    <div className="nav-dropdown-header">
                      <p className="nav-dropdown-user-name">Hello, {currentUser.name}</p>
                      <p className="nav-dropdown-user-email">{currentUser.email}</p>
                    </div>
                    <button
                      type="button"
                      className="nav-dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onNavigate('orders');
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span>Order History</span>
                    </button>
                    <button
                      type="button"
                      className="nav-dropdown-item logout-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="nav-dropdown-header">
                      <div className="nav-dropdown-header-top">
                        <span>New customer?</span>
                        <button
                          type="button"
                          className="nav-dropdown-signup-link"
                          onClick={() => {
                            setUserMenuOpen(false);
                            onNavigate('register');
                          }}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="nav-dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onNavigate('login');
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="10" r="3" />
                        <path d="M7 18.5c1.5-2 3-2.5 5-2.5s3.5.5 5 2.5" />
                      </svg>
                      <span>Sign In to Dakshin Eats</span>
                    </button>
                    <button
                      type="button"
                      className="nav-dropdown-item"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onNavigate('cart');
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                      <span>Orders</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
