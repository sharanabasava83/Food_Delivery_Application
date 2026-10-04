/**
 * API Client Service
 * Bridges React Frontend with the Spring Boot REST Backend on port 8080.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Helper to handle API response and errors
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMsg);
  }

  return data;
}

/**
 * Login Customer API Request
 * Sends POST /api/customers/login
 * Request: { email, password }
 */
export async function loginCustomer(data) {
  return request('/customers/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Register Customer API Request
 * Sends POST /api/customers
 * Request: { name, email, phone, password, address }
 */
export async function registerCustomer(data) {
  return request('/customers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export const api = {
  // --- Health / Status ---
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  // --- Categories ---
  async getCategories() {
    return request('/categories');
  },
  async createCategory(categoryData) {
    return request('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },
  async deleteCategory(id) {
    return request(`/categories/${id}`, { method: 'DELETE' });
  },

  // --- Restaurants ---
  async getRestaurants() {
    return request('/restaurants');
  },
  async searchRestaurants(keyword) {
    return request(`/restaurants/search?keyword=${encodeURIComponent(keyword || '')}`);
  },
  async createRestaurant(restaurantData) {
    return request('/restaurants', {
      method: 'POST',
      body: JSON.stringify(restaurantData),
    });
  },
  async deleteRestaurant(id) {
    return request(`/restaurants/${id}`, { method: 'DELETE' });
  },

  // --- Foods ---
  async getFoods() {
    return request('/foods');
  },
  async getFoodsByCategory(categoryId) {
    return request(`/foods/category/${categoryId}`);
  },
  async searchFoods(keyword) {
    return request(`/foods/search?keyword=${encodeURIComponent(keyword || '')}`);
  },
  async createFood(foodData) {
    return request('/foods', {
      method: 'POST',
      body: JSON.stringify(foodData),
    });
  },
  async deleteFood(id) {
    return request(`/foods/${id}`, { method: 'DELETE' });
  },

  // --- Coupons ---
  async getCoupons() {
    return request('/coupons');
  },
  async validateCoupon(code, customerId = 1) {
    return request(`/coupons/validate?code=${encodeURIComponent(code)}&customerId=${customerId}`, {
      method: 'POST',
    });
  },
  async createCoupon(couponData) {
    return request('/coupons', {
      method: 'POST',
      body: JSON.stringify(couponData),
    });
  },
  async deleteCoupon(id) {
    return request(`/coupons/${id}`, { method: 'DELETE' });
  },

  // --- Customers ---
  async loginCustomer(loginData) {
    return loginCustomer(loginData);
  },
  async getCustomers() {
    return request('/customers');
  },
  async createCustomer(customerData) {
    return request('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData),
    });
  },

  // --- Cart ---
  async getCart(customerId = 1) {
    return request(`/cart/${customerId}`);
  },
  async addToCart(customerId = 1, foodId, quantity = 1) {
    return request(`/cart/${customerId}/items`, {
      method: 'POST',
      body: JSON.stringify({ foodId, quantity }),
    });
  },
  async updateCartItem(customerId = 1, cartItemId, quantity) {
    return request(`/cart/${customerId}/items/${cartItemId}?quantity=${quantity}`, {
      method: 'PUT',
    });
  },
  async removeCartItem(customerId = 1, cartItemId) {
    return request(`/cart/${customerId}/items/${cartItemId}`, {
      method: 'DELETE',
    });
  },
  async clearCart(customerId = 1) {
    return request(`/cart/${customerId}`, { method: 'DELETE' });
  },

  // --- Orders ---
  async placeOrder(orderPayload) {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderPayload),
    });
  },
  async getOrderById(orderId) {
    return request(`/orders/${orderId}`);
  },
  async getOrderByNumber(orderNumber) {
    return request(`/orders/number/${orderNumber}`);
  },
  async getCustomerOrders(customerId = 1) {
    return request(`/orders/customer/${customerId}`);
  },
  async getAllOrders() {
    return request('/orders');
  },
};

export default api;
