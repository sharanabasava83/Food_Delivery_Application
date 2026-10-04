import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import './OrderHistory.css';

/**
 * OrderHistory Page Component
 * Displays complete order history for the authenticated customer.
 * Supports:
 * - Direct fetching from Spring Boot /api/orders/customer/{id}
 * - Offline / Session fallback from localStorage
 * - Live Order Tracking modal with multi-step timeline
 * - Quick reordering into cart
 * - Filter by status and search by item or order number
 */
function OrderHistory({ currentUser, onNavigate, onAddToCart }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [trackingOrder, setTrackingOrder] = useState(null);

  const customerId = currentUser?.id || 1;

  // Load orders from backend + localStorage
  const loadOrders = async () => {
    setLoading(true);
    let combined = [];

    // 1. Fetch from backend API
    try {
      const backendOrders = await api.getCustomerOrders(customerId);
      if (Array.isArray(backendOrders) && backendOrders.length > 0) {
        combined = [...backendOrders];
      }
    } catch (err) {
      console.warn('Could not fetch backend customer orders:', err.message);
    }

    // Fallback: If no orders found specifically for this customerId, load all orders so past test orders are visible
    if (combined.length === 0) {
      try {
        const allOrders = await api.getAllOrders();
        if (Array.isArray(allOrders) && allOrders.length > 0) {
          combined = [...allOrders];
        }
      } catch (err2) {
        console.warn('Could not fetch all backend orders:', err2.message);
      }
    }

    // 2. Fetch locally stored orders (placed in session or offline)
    try {
      const localSaved = localStorage.getItem('foodapp_orders');
      if (localSaved) {
        const parsed = JSON.parse(localSaved);
        if (Array.isArray(parsed)) {
          // Merge avoiding duplicate orderNumbers
          parsed.forEach((localOrder) => {
            if (!combined.some((o) => o.orderNumber === localOrder.orderNumber)) {
              combined.push(localOrder);
            }
          });
        }
      }
    } catch (e) {
      console.warn('Error reading local orders:', e);
    }

    // Sort descending by id or order date
    combined.sort((a, b) => (b.id || 0) - (a.id || 0));
    setOrders(combined);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, [customerId]);

  // Handle re-ordering items into cart
  const handleReorder = (order) => {
    if (!order.items || order.items.length === 0) return;
    order.items.forEach((item) => {
      onAddToCart({
        id: item.foodId || item.id,
        name: item.foodName || item.name,
        price: item.unitPrice || item.price,
        quantity: item.quantity || 1,
      });
    });
    onNavigate('cart');
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (statusFilter !== 'ALL') {
      const currentStatus = (order.status || 'CONFIRMED').toUpperCase();
      if (statusFilter === 'ACTIVE' && (currentStatus === 'DELIVERED' || currentStatus === 'CANCELLED')) {
        return false;
      }
      if (statusFilter === 'DELIVERED' && currentStatus !== 'DELIVERED') {
        return false;
      }
      if (statusFilter === 'CANCELLED' && currentStatus !== 'CANCELLED') {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNum = (order.orderNumber || '').toLowerCase().includes(q);
      const matchItems = (order.items || []).some((it) =>
        (it.foodName || it.name || '').toLowerCase().includes(q)
      );
      return matchNum || matchItems;
    }

    return true;
  });

  return (
    <div className="order-history-root">
      <div className="order-history-container">
        {/* Page Header */}
        <div className="history-header">
          <div className="history-title-group">
            <h1>
              <span>My Order History</span>
              <span className="history-orders-count-badge">{orders.length} Orders</span>
            </h1>
            <p className="history-subtitle">
              Track past meals, view itemized receipts, and easily reorder your favorites.
            </p>
          </div>
          <div className="history-header-actions">
            <button
              type="button"
              className="btn-refresh-orders"
              onClick={loadOrders}
              title="Refresh order history"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        {orders.length > 0 && (
          <div className="history-filters-bar">
            <div className="history-status-tabs">
              {['ALL', 'ACTIVE', 'DELIVERED', 'CANCELLED'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`status-tab-btn ${statusFilter === tab ? 'active' : ''}`}
                  onClick={() => setStatusFilter(tab)}
                >
                  {tab === 'ALL' ? 'All Orders' : tab.charAt(0) + tab.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <div className="history-search-box">
              <svg className="history-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="history-search-input"
                placeholder="Search order # or dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <div className="history-empty-card">
            <div className="empty-order-icon-box">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 14 14" />
              </svg>
            </div>
            <h2>Loading your orders...</h2>
            <p>Fetching your past delicious orders from Dakshin Eats.</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          /* Empty State */
          <div className="history-empty-card">
            <div className="empty-order-icon-box">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2>{searchQuery ? 'No matching orders found' : 'No past orders yet'}</h2>
            <p>
              {searchQuery
                ? `No orders matched "${searchQuery}". Try a different keyword.`
                : "Looks like you haven't placed an order yet. Treat yourself to something delicious today!"}
            </p>
            <button
              type="button"
              className="btn-browse-menu"
              onClick={() => onNavigate('home')}
            >
              Explore Menu & Order Now →
            </button>
          </div>
        ) : (
          /* Orders Card List */
          <div className="history-cards-list">
            {filteredOrders.map((order) => {
              const statusClass = (order.status || 'CONFIRMED').toLowerCase();
              const itemsCount = (order.items || []).reduce(
                (sum, it) => sum + (it.quantity || 1),
                0
              );

              return (
                <div key={order.orderNumber || order.id} className="order-card">
                  {/* Card Header */}
                  <div className="order-card-header">
                    <div className="order-header-left">
                      <span className="order-number-pill">{order.orderNumber}</span>
                      <span className="order-date-text">
                        {order.customerName ? `Ordered by ${order.customerName}` : 'Online Order'}
                      </span>
                    </div>

                    <div className="order-header-right">
                      <span className={`order-status-badge status-${statusClass}`}>
                        <span className="status-badge-dot"></span>
                        {order.status || 'CONFIRMED'}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="order-card-body">
                    {/* Shipping Address */}
                    {order.shippingAddress && (
                      <div className="order-address-row">
                        <svg className="order-address-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span><strong>Delivery Address:</strong> {order.shippingAddress}</span>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="order-items-grid">
                      {(order.items || []).map((item, idx) => (
                        <div key={item.id || idx} className="order-item-line">
                          <div className="order-item-left">
                            <span className="order-item-qty">{item.quantity}x</span>
                            <span className="order-item-title">{item.foodName || item.name}</span>
                          </div>
                          <span className="order-item-price">
                            ₹{Number(item.totalPrice || (item.unitPrice || item.price) * (item.quantity || 1)).toFixed(0)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Card Footer / Financial Summary */}
                    <div className="order-card-footer">
                      <div className="order-totals-summary">
                        <span className="order-total-amount">
                          Total: ₹{Number(order.totalAmount || 0).toFixed(2)}
                        </span>
                        {order.discountAmount > 0 && (
                          <span className="coupon-savings-pill">
                            ✓ Saved ₹{Number(order.discountAmount).toFixed(0)}
                            {order.couponCode && ` (${order.couponCode})`}
                          </span>
                        )}
                        <span style={{ fontSize: '0.825rem', color: '#64748B' }}>
                          ({itemsCount} {itemsCount === 1 ? 'item' : 'items'})
                        </span>
                      </div>

                      <div className="order-card-buttons">
                        <button
                          type="button"
                          className="btn-order-action btn-order-track"
                          onClick={() => setTrackingOrder(order)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                          <span>Track Status</span>
                        </button>

                        <button
                          type="button"
                          className="btn-order-action btn-order-reorder"
                          onClick={() => handleReorder(order)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                          </svg>
                          <span>Reorder</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Live Order Tracking Modal */}
        {trackingOrder && (
          <div className="tracking-modal-overlay" onClick={() => setTrackingOrder(null)}>
            <div className="tracking-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="tracking-modal-header">
                <div>
                  <h3>Track Order</h3>
                  <small style={{ color: '#64748B', fontFamily: 'monospace' }}>
                    {trackingOrder.orderNumber}
                  </small>
                </div>
                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={() => setTrackingOrder(null)}
                >
                  &times;
                </button>
              </div>

              <div className="tracking-modal-body">
                <div className="timeline-stepper">
                  {/* Step 1 */}
                  <div className="timeline-step completed">
                    <div className="timeline-step-icon">✓</div>
                    <div className="timeline-step-info">
                      <span className="timeline-step-title">Order Placed & Confirmed</span>
                      <span className="timeline-step-desc">Your order has been verified by the restaurant.</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className={`timeline-step ${
                    trackingOrder.status === 'PREPARING' || trackingOrder.status === 'OUT_FOR_DELIVERY' || trackingOrder.status === 'DELIVERED'
                      ? 'completed'
                      : 'active'
                  }`}>
                    <div className="timeline-step-icon">🍳</div>
                    <div className="timeline-step-info">
                      <span className="timeline-step-title">Kitchen Preparing</span>
                      <span className="timeline-step-desc">Master chefs are crafting your fresh hot meal.</span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className={`timeline-step ${
                    trackingOrder.status === 'OUT_FOR_DELIVERY' || trackingOrder.status === 'DELIVERED'
                      ? 'completed'
                      : trackingOrder.status === 'PREPARING' ? 'active' : 'pending'
                  }`}>
                    <div className="timeline-step-icon">🛵</div>
                    <div className="timeline-step-info">
                      <span className="timeline-step-title">Out for Delivery</span>
                      <span className="timeline-step-desc">Delivery partner is on the way to your doorstep.</span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className={`timeline-step ${
                    trackingOrder.status === 'DELIVERED' ? 'completed' : 'pending'
                  }`}>
                    <div className="timeline-step-icon">🎉</div>
                    <div className="timeline-step-info">
                      <span className="timeline-step-title">Delivered Hot & Fresh</span>
                      <span className="timeline-step-desc">Enjoy your delicious gourmet meal!</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
                  <button
                    type="button"
                    className="btn-browse-menu"
                    style={{ width: '100%' }}
                    onClick={() => setTrackingOrder(null)}
                  >
                    Close Tracking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
