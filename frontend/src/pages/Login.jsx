import React, { useState } from 'react';
import { loginCustomer } from '../services/api.js';
import BrandLogo from '../components/BrandLogo.jsx';
import './Login.css';

/**
 * FoodApp Login Page
 * 
 * Features:
 * - Modern food-delivery split layout (branding & appetizing image on left, clean white card on right)
 * - Controlled inputs with React useState
 * - Real-time client-side validation
 * - Password Show/Hide toggle
 * - Remember Me checkbox & Forgot Password UI link
 * - Integration with Spring Boot backend (POST /api/customers/login)
 * - Clear error message on failure ("Invalid email or password") while preserving email
 * - Success banner ("Login successful! 🎉") before redirecting to Home
 */
function Login({ onLoginSuccess, onNavigate }) {
  // Form input state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Validation & feedback state
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validate form fields according to fresher-level requirements
  const validateForm = () => {
    const newErrors = {};

    // 1. Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = 'Please enter a valid email';
      }
    }

    // 2. Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must contain at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Trigger validation
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Send POST /api/customers/login
      const customer = await loginCustomer({
        email: email.trim(),
        password: password,
      });

      // Successful login
      setSuccessMessage('Login successful!');

      // Optional: Store remember-me email in localStorage
      if (rememberMe) {
        localStorage.setItem('foodapp_remembered_email', email.trim());
      } else {
        localStorage.removeItem('foodapp_remembered_email');
      }

      // Notify parent app and navigate to Home after displaying success message
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(customer);
        } else if (onNavigate) {
          onNavigate('home');
        }
      }, 1000);

    } catch (err) {
      // Backend returned error (400 Bad Request with "Invalid email or password")
      setErrorMessage(err.message || 'Invalid email or password');
      // Keep entered email visible
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card-container">
        
        {/* LEFT COLUMN: FoodApp Branding & Aesthetic Showcase */}
        <div className="login-left-banner">
          <div className="banner-overlay"></div>
          
          <div className="banner-content">
            {/* FoodApp / Dakshin Eats Brand Header */}
            <div className="banner-brand">
              <BrandLogo size="banner" theme="white" />
            </div>

            {/* Slogan & Value Prop */}
            <div className="banner-text-block">
              <h2 className="banner-heading">Delicious food, delivered to your door.</h2>
              <p className="banner-subtitle">
                Experience fresh gourmet meals from top restaurants delivered piping hot in under 30 minutes.
              </p>
            </div>

            {/* Visual Appetizing Food Image Card */}
            <div className="banner-visual-box">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                alt="Delicious gourmet food"
                className="banner-food-image"
                loading="lazy"
              />
              <div className="banner-floating-badge">
                <span className="badge-star">★ 4.9</span>
                <span className="badge-caption">Over 10,000+ Happy Foodies</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: White Login Card & Form */}
        <div className="login-right-card">
          <div className="login-card-inner">
            
            {/* Header Titles */}
            <div className="login-header-group">
              <h1 className="login-title">Welcome Back!</h1>
              <p className="login-subtitle">Login to continue to Dakshin Eats</p>
            </div>

            {/* Top Alert Messages */}
            {successMessage && (
              <div className="alert-box success-alert" role="alert">
                <span className="alert-icon">✓</span>
                <span className="alert-text">{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="alert-box error-alert" role="alert">
                <span className="alert-icon">⚠</span>
                <span className="alert-text">{errorMessage}</span>
              </div>
            )}

            {/* The Main Login Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              
              {/* Email Address Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">
                  Email Address <span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="login-email"
                    type="email"
                    className={`form-input ${errors.email ? 'input-error' : ''}`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: '' }));
                      }
                      if (errorMessage) setErrorMessage('');
                    }}
                    autoComplete="email"
                    disabled={isLoading}
                  />
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </span>
                </div>
                {errors.email && (
                  <p className="field-error-message">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label className="form-label" htmlFor="login-password">
                  Password <span className="required-star">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: '' }));
                      }
                      if (errorMessage) setErrorMessage('');
                    }}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  {/* Show / Hide Password Button */}
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <span className="toggle-label-text">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                        <span>Hide</span>
                      </span>
                    ) : (
                      <span className="toggle-label-text">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span>Show</span>
                      </span>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="field-error-message">{errors.password}</p>
                )}
              </div>

              {/* Options Row: Remember Me & Forgot Password */}
              <div className="form-options-row">
                <label className="remember-me-label">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span>Remember Me</span>
                </label>

                {/* Forgot Password Link (UI only as per instructions) */}


              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="btn-login-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="btn-loading-state">
                    <span className="spinner"></span>
                    <span>Logging in...</span>
                  </span>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>

            {/* Create Account Link Footer */}
            <div className="login-card-footer">
              <span className="footer-prompt">Don't have an account?</span>
              <button
                type="button"
                className="btn-create-account-link"
                onClick={() => onNavigate ? onNavigate('register') : null}
              >
                Create Account
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
