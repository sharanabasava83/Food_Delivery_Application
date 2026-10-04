import React, { useState } from 'react';

/**
 * Help & Support Page Component
 * Professional Customer Care & Grievance Redressal Portal
 * Auto-filled with Bengaluru Location & Regional Support Hub details.
 */
function HelpSupport({ onNavigate }) {
  // Support ticket form state pre-filled with Bengaluru location & sample user
  const [ticketData, setTicketData] = useState({
    name: 'Sharanabasava D K',
    email: 'sharanabasava.dk@partner-demo.example.com', // Safe dummy email
    phone: '+91 98000 12345', // Safe dummy phone
    cityLocation: 'Bengaluru, Karnataka (Indiranagar / Koramangala Zone)',
    supportHub: 'Bengaluru Regional Support Hub (Koramangala 4th Block)',
    category: 'Delivery Tracking & ETA',
    subject: 'Order Delivery Assistance in Bengaluru',
    message: 'Hello Support, I would like to inquire about express doorstep delivery status in the Bengaluru zone.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedTicket({
        ticketId: 'TKT-BLR-' + Math.floor(10000 + Math.random() * 90000),
        status: 'ASSIGNED • LIVE ASSISTANCE IN PROGRESS',
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...ticketData,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleResetTicket = () => {
    setSubmittedTicket(null);
  };

  return (
    <div className="help-page-root">
      
      {/* 1. Header Banner */}
      <section className="help-hero-section">
        <div className="help-hero-container">
          <div className="help-hero-content">
            <button
              type="button"
              className="checkout-back-link"
              style={{ color: '#d1d5db', marginBottom: '1.25rem' }}
              onClick={() => onNavigate('home')}
            >
              ← Back to Food Menu
            </button>
            <span className="help-hub-pill">
              <span className="hub-live-dot"></span>
              Auto-Connected: Bengaluru Regional Support Hub
            </span>
            <h1 className="help-hero-title">
              Help & Customer Support
            </h1>
            <p className="help-hero-subtitle">
              We are here to help you 24/7. Auto-localized for Bengaluru city customers with fast resolution for orders, refunds, and delivery queries.
            </p>

            <div className="help-quick-cards-row">
              <div className="help-quick-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div>
                  <strong>Toll-Free Helpline</strong>
                  <span>1800-DAKSHIN (Toll Free)</span>
                </div>
              </div>

              <div className="help-quick-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <strong>Bengaluru Hub Office</strong>
                  <span>Koramangala 4th Block, Bengaluru</span>
                </div>
              </div>

              <div className="help-quick-card">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div>
                  <strong>Support Operating Hours</strong>
                  <span>7:00 AM – 1:00 AM (All 7 Days)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Help Form & Information Layout */}
      <section className="help-main-section">
        <div className="help-main-container">
          
          {submittedTicket ? (
            /* Ticket Confirmation Box */
            <div className="help-ticket-success-card">
              <div className="ticket-success-emblem">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <span className="ticket-status-pill">Ticket Raised Successfully</span>
              <h2 className="ticket-title">Support Ticket: {submittedTicket.ticketId}</h2>
              <p className="ticket-subtitle">
                A Bengaluru customer care executive has been assigned to your inquiry and will assist you shortly.
              </p>

              <div className="ticket-details-grid">
                <div className="ticket-row">
                  <span className="ticket-label">Customer Name:</span>
                  <span className="ticket-value">{submittedTicket.name}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Auto-Filled Location:</span>
                  <span className="ticket-value location-tag">{submittedTicket.cityLocation}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Assigned Regional Hub:</span>
                  <span className="ticket-value">{submittedTicket.supportHub}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Issue Category:</span>
                  <span className="ticket-value">{submittedTicket.category}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Current Status:</span>
                  <span className="ticket-value status-badge">{submittedTicket.status}</span>
                </div>
                <div className="ticket-row">
                  <span className="ticket-label">Submitted Time:</span>
                  <span className="ticket-value">{submittedTicket.submittedAt}</span>
                </div>
              </div>

              <div className="ticket-actions">
                <button
                  type="button"
                  className="btn-help-primary"
                  onClick={handleResetTicket}
                >
                  Create Another Ticket
                </button>
                <button
                  type="button"
                  className="btn-help-outline"
                  onClick={() => onNavigate('home')}
                >
                  Return to Food Menu
                </button>
              </div>
            </div>
          ) : (
            /* Support Contact & Ticket Form */
            <div className="help-grid-layout">
              
              {/* Left Column: Interactive Support Ticket Form */}
              <div className="help-card help-form-card">
                <div className="help-card-header">
                  <span className="help-form-badge">Express Help Ticket</span>
                  <h2 className="help-card-title">Submit a Support Request</h2>
                  <p className="help-card-subtitle">
                    Location is auto-filled for <strong>Bengaluru</strong> to ensure fastest regional routing.
                  </p>
                </div>

                <form onSubmit={handleSubmitTicket} className="help-form-body">
                  
                  {/* Bengaluru Auto-Fill Banner */}
                  <div className="bengaluru-autofill-banner">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div>
                      <strong>Bengaluru City Zone Detected & Auto-Filled</strong>
                      <small>Routing to South Bengaluru Hub (Indiranagar, Koramangala, MG Road, Whitefield)</small>
                    </div>
                  </div>

                  {/* Customer Name */}
                  <div className="help-input-group">
                    <label className="help-label">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      className="help-input"
                      value={ticketData.name}
                      onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                      placeholder="e.g. Sharanabasava D K"
                    />
                  </div>

                  {/* Auto-filled Location Field */}
                  <div className="help-input-group">
                    <label className="help-label">Delivery Location (Auto-Filled) *</label>
                    <input
                      type="text"
                      required
                      className="help-input highlighted-location"
                      value={ticketData.cityLocation}
                      onChange={(e) => setTicketData({ ...ticketData, cityLocation: e.target.value })}
                      placeholder="Bengaluru, Karnataka"
                    />
                    <small className="help-field-tip">Auto-detected regional delivery zone</small>
                  </div>

                  {/* Regional Support Hub */}
                  <div className="help-input-group">
                    <label className="help-label">Assigned Support Hub (Auto-Filled) *</label>
                    <input
                      type="text"
                      readOnly
                      className="help-input readonly-hub"
                      value={ticketData.supportHub}
                    />
                  </div>

                  {/* Dummy Phone */}
                  <div className="help-input-group">
                    <label className="help-label">Contact Phone Number (Dummy) *</label>
                    <input
                      type="tel"
                      required
                      className="help-input"
                      value={ticketData.phone}
                      onChange={(e) => setTicketData({ ...ticketData, phone: e.target.value })}
                      placeholder="+91 98000 12345"
                    />
                  </div>

                  {/* Issue Category */}
                  <div className="help-input-group">
                    <label className="help-label">What do you need help with? *</label>
                    <select
                      className="help-input"
                      value={ticketData.category}
                      onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                    >
                      <option value="Delivery Tracking & ETA">Delivery Tracking & Live ETA in Bengaluru</option>
                      <option value="Order Missing or Wrong Item">Order Item Issue / Food Packaging</option>
                      <option value="Coupon & Payment Refund">Coupon Discount or Payment Inquiry</option>
                      <option value="Restaurant / Partner Feedback">Restaurant Feedback or Special Instructions</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="help-input-group">
                    <label className="help-label">Detailed Message *</label>
                    <textarea
                      rows="3"
                      required
                      className="help-input help-textarea"
                      value={ticketData.message}
                      onChange={(e) => setTicketData({ ...ticketData, message: e.target.value })}
                      placeholder="Please describe your query..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-help-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Routing Ticket...' : 'Submit Support Request to Bengaluru Team →'}
                  </button>

                </form>
              </div>

              {/* Right Column: Bengaluru Coverage & Frequently Asked Questions */}
              <div className="help-sidebar">
                
                {/* Active Bengaluru Delivery Zones */}
                <div className="help-card sidebar-card">
                  <h3 className="sidebar-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand-coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '0.45rem' }}>
                      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                      <polyline points="2 17 12 22 22 17"></polyline>
                      <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                    Bengaluru Delivery Coverage
                  </h3>
                  <p className="sidebar-desc">
                    Our verified delivery fleet operates across all key zones in Bengaluru with average 25–30 min delivery:
                  </p>
                  <ul className="zones-list">
                    <li><span className="zone-dot"></span> <strong>Central:</strong> MG Road, Indiranagar, Brigade Road</li>
                    <li><span className="zone-dot"></span> <strong>South:</strong> Koramangala, HSR Layout, BTM, Jayanagar</li>
                    <li><span className="zone-dot"></span> <strong>East & IT:</strong> Whitefield, Marathahalli, Bellandur</li>
                    <li><span className="zone-dot"></span> <strong>North:</strong> Hebbal, Malleshwaram, Rajajinagar</li>
                  </ul>
                </div>

                {/* Common FAQs */}
                <div className="help-card sidebar-card">
                  <h3 className="sidebar-title">Frequently Asked Questions</h3>
                  
                  <div className="faq-item">
                    <strong>How can I track my food order in Bengaluru?</strong>
                    <p>Go to "My Orders" or "Track Order" in the top bar to see real-time preparation and rider delivery updates.</p>
                  </div>

                  <div className="faq-item">
                    <strong>What if my food is delayed beyond 35 minutes?</strong>
                    <p>Our Bengaluru support hub monitors all live orders. If there is a weather or traffic delay, you receive automatic priority tracking.</p>
                  </div>

                  <div className="faq-item">
                    <strong>How do I apply promotional discount coupons?</strong>
                    <p>Enter coupons like <code>FIRST50</code> or <code>COUPON-25</code> directly on the Cart or Checkout summary screen.</p>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
}

export default HelpSupport;
