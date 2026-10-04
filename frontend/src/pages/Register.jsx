import React, { useState } from 'react';
import { registerCustomer } from '../services/api.js';
import BrandLogo from '../components/BrandLogo.jsx';
import './Register.css';

/**
 * Customer Registration Page
 * Matches Login Page design exactly: colors, typography, spacing, rounded corners, aesthetic.
 */
function Register({ onNavigate }) {
  // Form input state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation & status state
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific field error upon editing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    // 1. Full Name
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Full name must be at least 3 characters';
    }

    // 2. Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // 3. Phone Number (Valid 10-digit Indian mobile number)
    const cleanPhone = formData.phone.trim().replace(/\D/g, '');
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!indianPhoneRegex.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // 4. Password (min 6 characters)
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // 5. Confirm Password (must match)
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // 6. Delivery Address
    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Connect to backend POST /api/customers
      await registerCustomer({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        address: formData.address.trim(),
      });

      setIsSuccess(true);

      // Auto-transition to login after a brief view of the success celebration
      setTimeout(() => {
        if (onNavigate) {
          onNavigate('login');
        }
      }, 2500);

    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-card-container">
        
        {/* LEFT COLUMN: FoodApp Branding & Aesthetic Showcase */}
        <div className="register-left-banner">
          <div className="banner-overlay"></div>
          
          <div className="banner-content">
            {/* FoodApp / Dakshin Eats Brand Header */}
            <div className="banner-brand">
              <BrandLogo size="banner" theme="white" />
            </div>

            {/* Slogan & Value Prop */}
            <div className="banner-text-block">
              <h2 className="banner-heading">Join Dakshin Eats Today</h2>
              <p className="banner-subtitle">
                Create your account and enjoy authentic delicious food delivered to your door.
              </p>
            </div>

            {/* Visual Appetizing Food Image Card */}
            <div className="banner-visual-box">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                alt="Delicious gourmet dishes"
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

        {/* RIGHT COLUMN: White Registration Card & Form */}
        <div className="register-right-card">
          <div className="register-card-inner">
            
            {/* Header Titles */}
            <div className="register-header-group">
              <h1 className="register-title">Create Your Account</h1>
              <p className="register-subtitle">Sign up to start ordering from Dakshin Eats.</p>
            </div>

            {/* Top Alert Messages */}
            {isSuccess ? (
              <div className="register-success-view">
                <div className="alert-box success-alert" role="alert">
                  <span className="alert-icon">✓</span>
                  <span className="alert-text">Account created successfully! 🎉</span>
                </div>
                <p className="redirect-note">Redirecting to login in a moment...</p>
                <button
                  type="button"
                  className="btn-go-to-login"
                  onClick={() => onNavigate && onNavigate('login')}
                >
                  Go to Login
                </button>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className="alert-box error-alert" role="alert">
                    <span className="alert-icon">⚠</span>
                    <span className="alert-text">{errorMessage}</span>
                  </div>
                )}

                {/* The Registration Form */}
                <form className="register-form" onSubmit={handleSubmit} noValidate>
                  
                  {/* 1. Full Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-name">
                      Full Name <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="reg-name"
                        name="name"
                        type="text"
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoComplete="name"
                      />
                    </div>
                    {errors.name && (
                      <p className="field-error-message">{errors.name}</p>
                    )}
                  </div>

                  {/* 2. Email Address */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-email">
                      Email Address <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="reg-email"
                        name="email"
                        type="email"
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <p className="field-error-message">{errors.email}</p>
                    )}
                  </div>

                  {/* 3. Phone Number */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-phone">
                      Phone Number <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="reg-phone"
                        name="phone"
                        type="tel"
                        className={`form-input ${errors.phone ? 'input-error' : ''}`}
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoComplete="tel"
                      />
                    </div>
                    {errors.phone && (
                      <p className="field-error-message">{errors.phone}</p>
                    )}
                  </div>

                  {/* 4. Password */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-password">
                      Password <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="reg-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className={`form-input ${errors.password ? 'input-error' : ''}`}
                        placeholder="Create your password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
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

                  {/* 5. Confirm Password */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-confirm-password">
                      Confirm Password <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="reg-confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                        tabIndex="-1"
                      >
                        {showConfirmPassword ? (
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
                    {errors.confirmPassword && (
                      <p className="field-error-message">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* 6. Delivery Address */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-address">
                      Delivery Address <span className="required-star">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        id="reg-address"
                        name="address"
                        type="text"
                        className={`form-input ${errors.address ? 'input-error' : ''}`}
                        placeholder="Enter your delivery address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoComplete="street-address"
                      />
                    </div>
                    {errors.address && (
                      <p className="field-error-message">{errors.address}</p>
                    )}
                  </div>

                  {/* Create Account Submit Button */}
                  <button
                    type="submit"
                    className="btn-register-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="btn-loading-state">
                        <span className="spinner"></span>
                        <span>Creating Account...</span>
                      </span>
                    ) : (
                      <span>Create Account</span>
                    )}
                  </button>
                </form>

                {/* Already have an account? Login Footer */}
                <div className="register-card-footer">
                  <span className="footer-prompt">Already have an account?</span>
                  <button
                    type="button"
                    className="btn-login-link"
                    onClick={() => onNavigate && onNavigate('login')}
                  >
                    Login
                  </button>
                </div>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
