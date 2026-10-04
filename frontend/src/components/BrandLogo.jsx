import React from 'react';

/**
 * Professional Company Brand Logo Component
 * 
 * Inspired by top food-tech startups (Swiggy, DoorDash, Toast, Zomato)
 * Name: Dakshin (South Indian culinary heritage brand)
 * Features a custom modern vector SVG emblem:
 * - Rounded squircle app icon
 * - Golden-coral gradient
 * - Stylized hot cloche / South Indian leaf-steam aroma motif
 */
function BrandLogo({ size = 'medium', showTagline = false, theme = 'default' }) {
  const isLarge = size === 'large';
  const iconSize = isLarge ? 42 : (size === 'banner' ? 38 : 34);
  const isWhite = theme === 'white';

  return (
    <div className={`company-logo-wrap ${isLarge ? 'large' : ''} ${isWhite ? 'theme-white' : ''}`}>
      {/* Real Startup Vector Logo Emblem */}
      <div className="company-logo-emblem" style={{ width: iconSize, height: iconSize }}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="emblem-svg"
        >
          <defs>
            {/* Main Gradient */}
            <linearGradient id="dakshinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B4A" />
              <stop offset="100%" stopColor="#E23E1D" />
            </linearGradient>
            
            {/* Gold Steam Glow */}
            <linearGradient id="steamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFD166" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Soft Shadow */}
            <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={isWhite ? "#000000" : "#E23E1D"} floodOpacity={isWhite ? "0.3" : "0.35"} />
            </filter>
          </defs>

          {/* Squircle Badge Container */}
          <rect
            x="6"
            y="6"
            width="88"
            height="88"
            rx="24"
            fill="url(#dakshinGrad)"
            filter="url(#logoShadow)"
            stroke={isWhite ? "rgba(255, 255, 255, 0.45)" : "none"}
            strokeWidth={isWhite ? "3" : "0"}
          />

          {/* Subtle Inner Highlight */}
          <rect
            x="7"
            y="7"
            width="86"
            height="43"
            rx="23"
            fill="white"
            fillOpacity="0.12"
          />

          {/* Stylized Modern Cloche / Hot Bowl */}
          <path
            d="M26 64C26 62.5 27.5 61 29 61H71C72.5 61 74 62.5 74 64C74 72 63.5 76 50 76C36.5 76 26 72 26 64Z"
            fill="#FFFFFF"
          />

          {/* Cloche Dome / Dosa-Bowl Curve */}
          <path
            d="M27 57C27 44 37 36 50 36C63 36 73 44 73 57H27Z"
            fill="#FFFFFF"
          />

          {/* Cloche Handle */}
          <ellipse cx="50" cy="32" rx="5" ry="3.5" fill="#FFFFFF" />

          {/* Double Dynamic Aroma Steam / Curry Leaf motif */}
          <path
            d="M44 26C42 22 45 18 47 16"
            stroke="url(#steamGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M53 25C56 21 53 17 55 14"
            stroke="url(#steamGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Golden Spice Accent Dot */}
          <circle cx="50" cy="48" r="3.5" fill="#FFD166" />
        </svg>
      </div>

      {/* Typography: Dakshin Eats */}
      <div className="brand-text-block">
        <div className="brand-title-row">
          <span
            className="brand-primary-name"
            style={isWhite ? { color: '#FFFFFF', textShadow: '0 2px 4px rgba(0,0,0,0.15)' } : undefined}
          >
            Dakshin
          </span>
          <span
            className="brand-accent-tag"
            style={isWhite ? { background: '#FFFFFF', color: '#E23E1D', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' } : undefined}
          >
            EATS
          </span>
        </div>
        {showTagline && (
          <span
            className="brand-tagline-text"
            style={isWhite ? { color: 'rgba(255,255,255,0.9)' } : undefined}
          >
            Authentic South Indian & More
          </span>
        )}
      </div>
    </div>
  );
}

export default BrandLogo;
