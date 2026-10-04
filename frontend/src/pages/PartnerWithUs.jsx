import React, { useState } from 'react';

/**
 * Partner With Us Page Component
 * Professional Restaurant Onboarding & Partnership Portal.
 * 
 * Features:
 * - High-impact startup merchant hero
 * - 4 Key partnership value propositions
 * - Interactive Restaurant Onboarding Application Form
 * - Sample Owner: "Sharanabasava D K" with safe dummy contact details
 * - Interactive Application Confirmation receipt state
 * - 3-step onboarding roadmap
 * - Partner testimonial spotlight
 */
function PartnerWithUs({ onNavigate }) {
  // Sample initial form data with Sharanabasava D K and strictly dummy contact details
  const [formData, setFormData] = useState({
    ownerName: 'Sharanabasava D K',
    phone: '+91 98000 12345', // Safe dummy phone number
    email: 'sharanabasava.dk@partner-demo.example.com', // Safe dummy email
    restaurantName: 'D K Heritage Spices & Kitchen',
    cuisineType: 'South Indian & Tandoor',
    city: 'Bengaluru (MG Road / Indiranagar)',
    address: 'Plot 42, Heritage Food Boulevard, Indiranagar',
    fssaiNumber: '11223344556677',
    dailyCapacity: '100 - 250 orders/day',
    pureVeg: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.ownerName.trim() || !formData.restaurantName.trim() || !formData.phone.trim()) {
      alert('Please fill in the required fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedApplication({
        referenceId: 'DK-PARTNER-' + Math.floor(100000 + Math.random() * 900000),
        submissionDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        ...formData,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="partner-page-root">
      
      {/* 1. Hero Section */}
      <section className="partner-hero-section">
        <div className="partner-hero-container">
          <div className="partner-hero-left">
            <button
              type="button"
              className="checkout-back-link"
              style={{ color: '#d1d5db', marginBottom: '1.25rem' }}
              onClick={() => onNavigate('home')}
            >
              ← Back to Food Menu
            </button>
            <span className="partner-hero-pill">
              <span className="partner-pulse-dot"></span>
              Join 1,200+ Partner Kitchens
            </span>
            <h1 className="partner-hero-title">
              Partner With <span className="partner-hero-accent">Dakshin Eats</span> & Grow Your Restaurant
            </h1>
            <p className="partner-hero-subtitle">
              Expand your customer base, receive high-volume daily orders, and leverage our superfast delivery fleet to scale your culinary brand.
            </p>

            <div className="partner-stats-grid">
              <div className="partner-stat-card">
                <strong>2.8x</strong>
                <span>Average Online Order Growth</span>
              </div>
              <div className="partner-stat-card">
                <strong>0%</strong>
                <span>Onboarding Fee (First 30 Days)</span>
              </div>
              <div className="partner-stat-card">
                <strong>24-48 hrs</strong>
                <span>Express Kitchen Verification</span>
              </div>
            </div>
          </div>

          <div className="partner-hero-right">
            <div className="partner-floating-preview-card">
              <div className="preview-card-header">
                <span className="preview-status-dot"></span>
                <span className="preview-header-tag">Official Partner Portal</span>
              </div>
              <h3 className="preview-card-title">Why Restaurants Choose Us</h3>
              <ul className="preview-benefit-list">
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Instant next-day automated bank payouts</span>
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Dedicated delivery rider dispatch under 10 minutes</span>
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Real-time admin dashboard for menu & sales tracking</span>
                </li>
                <li>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Free marketing promotions & custom coupon support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Onboarding Section */}
      <section className="partner-form-section">
        <div className="partner-form-container">
          
          {submittedApplication ? (
            /* Application Success State */
            <div className="partner-success-card">
              <div className="partner-success-icon-wrap">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <span className="success-badge-pill">Application Received</span>
              <h2 className="success-card-title">Thank You, {submittedApplication.ownerName}!</h2>
              <p className="success-card-desc">
                Your partnership application for <strong>{submittedApplication.restaurantName}</strong> has been logged in our partner onboarding system.
              </p>

              <div className="success-details-box">
                <div className="success-detail-row">
                  <span className="detail-label">Application Reference ID:</span>
                  <span className="detail-value mono-highlight">{submittedApplication.referenceId}</span>
                </div>
                <div className="success-detail-row">
                  <span className="detail-label">Registered Owner:</span>
                  <span className="detail-value">{submittedApplication.ownerName}</span>
                </div>
                <div className="success-detail-row">
                  <span className="detail-label">Contact Phone (Dummy):</span>
                  <span className="detail-value">{submittedApplication.phone}</span>
                </div>
                <div className="success-detail-row">
                  <span className="detail-label">City / Location:</span>
                  <span className="detail-value">{submittedApplication.city}</span>
                </div>
                <div className="success-detail-row">
                  <span className="detail-label">Verification Status:</span>
                  <span className="detail-value status-review-tag">DOCUMENT REVIEW • IN PROGRESS</span>
                </div>
              </div>

              <div className="success-action-buttons">
                <button
                  type="button"
                  className="btn-partner-cta"
                  onClick={() => setSubmittedApplication(null)}
                >
                  Edit / Submit Another Restaurant
                </button>
                <button
                  type="button"
                  className="btn-partner-secondary"
                  onClick={() => onNavigate('home')}
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* Onboarding Form */
            <div className="partner-form-card">
              <div className="partner-form-header">
                <span className="partner-step-pill">Step 1 of 2</span>
                <h2 className="partner-section-title">Register Your Restaurant</h2>
                <p className="partner-section-desc">
                  Fill in your kitchen and contact information. Our restaurant operations team will connect within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="partner-grid-form">
                
                {/* Section A: Owner Information */}
                <div className="form-subheading-row">
                  <span className="subheading-number">A</span>
                  <h3>Owner & Primary Contact Details</h3>
                </div>

                <div className="partner-input-group">
                  <label className="partner-label">Owner / Representative Full Name *</label>
                  <input
                    type="text"
                    required
                    className="partner-input"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder="e.g. Sharanabasava D K"
                  />
                  <small className="partner-field-tip">Registered business owner name</small>
                </div>

                <div className="partner-input-group">
                  <label className="partner-label">Contact Phone Number (Dummy) *</label>
                  <input
                    type="tel"
                    required
                    className="partner-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                  />
                  <small className="partner-field-tip">Sample dummy contact number</small>
                </div>

                <div className="partner-input-group span-2">
                  <label className="partner-label">Contact Email Address (Dummy) *</label>
                  <input
                    type="email"
                    required
                    className="partner-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="owner@partner-demo.example.com"
                  />
                  <small className="partner-field-tip">Sample dummy email address for demonstration</small>
                </div>

                {/* Section B: Restaurant & Kitchen Details */}
                <div className="form-subheading-row span-2">
                  <span className="subheading-number">B</span>
                  <h3>Restaurant & Kitchen Details</h3>
                </div>

                <div className="partner-input-group">
                  <label className="partner-label">Restaurant / Outlet Name *</label>
                  <input
                    type="text"
                    required
                    className="partner-input"
                    value={formData.restaurantName}
                    onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                    placeholder="e.g. D K Heritage Spices"
                  />
                </div>

                <div className="partner-input-group">
                  <label className="partner-label">Primary Cuisine / Food Speciality *</label>
                  <input
                    type="text"
                    required
                    className="partner-input"
                    value={formData.cuisineType}
                    onChange={(e) => setFormData({ ...formData, cuisineType: e.target.value })}
                    placeholder="e.g. South Indian, Biryani, Tandoor"
                  />
                </div>

                <div className="partner-input-group">
                  <label className="partner-label">City & Operational Zone *</label>
                  <input
                    type="text"
                    required
                    className="partner-input"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Bengaluru Central"
                  />
                </div>

                <div className="partner-input-group">
                  <label className="partner-label">FSSAI Food License Number</label>
                  <input
                    type="text"
                    className="partner-input mono-font"
                    value={formData.fssaiNumber}
                    onChange={(e) => setFormData({ ...formData, fssaiNumber: e.target.value })}
                    placeholder="14-digit FSSAI Number"
                  />
                </div>

                <div className="partner-input-group span-2">
                  <label className="partner-label">Kitchen Street Address *</label>
                  <textarea
                    rows="2"
                    required
                    className="partner-input partner-textarea"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Full kitchen address, landmark, pin code"
                  />
                </div>

                <div className="partner-input-group">
                  <label className="partner-label">Estimated Daily Order Capacity</label>
                  <select
                    className="partner-input"
                    value={formData.dailyCapacity}
                    onChange={(e) => setFormData({ ...formData, dailyCapacity: e.target.value })}
                  >
                    <option value="50 - 100 orders/day">50 - 100 orders/day (Small Kitchen)</option>
                    <option value="100 - 250 orders/day">100 - 250 orders/day (Standard Restaurant)</option>
                    <option value="250 - 500+ orders/day">250 - 500+ orders/day (High-Volume Hub)</option>
                  </select>
                </div>

                <div className="partner-input-group checkbox-group">
                  <label className="partner-checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.pureVeg}
                      onChange={(e) => setFormData({ ...formData, pureVeg: e.target.checked })}
                    />
                    <span>This outlet is 100% Pure Vegetarian</span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="partner-form-actions span-2">
                  <button
                    type="submit"
                    className="btn-partner-cta"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Partnership Application →'}
                  </button>
                  <p className="partner-legal-notice">
                    By submitting, you agree to Dakshin Eats Merchant Onboarding Guidelines. No credit card or upfront fee required.
                  </p>
                </div>

              </form>
            </div>
          )}

        </div>
      </section>

      {/* 3. Partner Spotlight / Testimonial */}
      <section className="partner-testimonial-section">
        <div className="partner-testimonial-container">
          <div className="partner-quote-card">
            <div className="quote-mark">“</div>
            <p className="quote-text">
              Partnering with Dakshin Eats boosted our kitchen's order volume by over 240% within the first month alone. The automated order dispatch, on-time delivery fleet, and straightforward daily payouts have made operations effortless.
            </p>
            <div className="quote-author-block">
              <div className="author-avatar-circle">SD</div>
              <div>
                <strong className="author-name">Sharanabasava D K</strong>
                <span className="author-role">Founder & Managing Restaurateur • D K Heritage Spices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Three-Step Roadmap */}
      <section className="partner-steps-section">
        <div className="partner-steps-container">
          <div className="steps-header">
            <span className="steps-sub">Simple Process</span>
            <h2 className="steps-title">Start Delivering in 3 Easy Steps</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-num">01</span>
              <h3 className="step-name">Submit Details Online</h3>
              <p className="step-desc">Fill out your restaurant and cuisine details with sample menu items in under 3 minutes.</p>
            </div>

            <div className="step-card">
              <span className="step-num">02</span>
              <h3 className="step-name">Quick Verification</h3>
              <p className="step-desc">Our onboarding team reviews FSSAI details and sets up your digital menu catalog.</p>
            </div>

            <div className="step-card">
              <span className="step-num">03</span>
              <h3 className="step-name">Go Live & Deliver</h3>
              <p className="step-desc">Start receiving live customer food orders with our high-speed doorstep dispatch.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default PartnerWithUs;
