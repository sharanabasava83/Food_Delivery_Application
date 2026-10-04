import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Admin from './pages/Admin.jsx';
import PartnerWithUs from './pages/PartnerWithUs.jsx';
import HelpSupport from './pages/HelpSupport.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import api from './services/api.js';

// Initial Categories (Matching the 6 requested categories)
const INITIAL_CATEGORIES = [
  { id: 1, name: 'Biryani', description: 'Fragrant seasoned rice with tender spiced chicken or paneer' },
  { id: 2, name: 'Pizza', description: 'Fresh oven-baked mozzarella cheese & artisan crust pizzas' },
  { id: 3, name: 'Burgers', description: 'Juicy handcrafted patties served in warm sesame buns' },
  { id: 4, name: 'South Indian', description: 'Crispy butter dosas, soft idlis, and coconut chutneys' },
  { id: 5, name: 'Meals', description: 'Traditional thalis with curries, dal makhani, and warm rotis' },
  { id: 6, name: 'Beverages', description: 'Chilled cold coffees, fresh shakes, and refreshing sodas' },
];

// Initial Restaurants (Matching 3-4 requested restaurants)
const INITIAL_RESTAURANTS = [
  { id: 1, name: 'Spice Kitchen', phone: '9876500001', address: 'Connaught Place, Central City', description: 'Biryani • North Indian • Tandoor' },
  { id: 2, name: 'Paradise Biryani', phone: '9876500002', address: 'Secunderabad Road', description: 'Famous for authentic Hyderabadi Dum Biryani' },
  { id: 3, name: "Domino's Corner", phone: '9876500003', address: 'MG Road Avenue', description: 'Fresh hot oven-baked Italian pizzas & pastas' },
  { id: 4, name: 'Burger Point', phone: '9876500004', address: 'Park Street Boulevard', description: 'Crispy gourmet burgers and loaded fries' },
];

// Initial Foods (Curated high-quality dishes for all 6 categories)
const INITIAL_FOODS = [
  { id: 1, name: 'Hyderabadi Chicken Biryani', description: 'Aromatic basmati rice cooked with tender spiced chicken, caramelized onions, and saffron.', price: 280, categoryId: 1, categoryName: 'Biryani', restaurantId: 2, restaurantName: 'Paradise Biryani' },
  { id: 2, name: 'Paneer Dum Biryani', description: 'Fresh marinated paneer cubes layered with long-grain fragrant rice and royal herbs.', price: 230, categoryId: 1, categoryName: 'Biryani', restaurantId: 1, restaurantName: 'Spice Kitchen' },
  { id: 3, name: 'Margherita Cheese Pizza', description: 'Classic mozzarella cheese on herb-seasoned Italian tomato sauce and basil leaves.', price: 199, categoryId: 2, categoryName: 'Pizza', restaurantId: 3, restaurantName: "Domino's Corner" },
  { id: 4, name: 'Spicy Pepperoni Pizza', description: 'Loaded with smoky pepperoni slices, melted golden mozzarella, and red pepper flakes.', price: 349, categoryId: 2, categoryName: 'Pizza', restaurantId: 3, restaurantName: "Domino's Corner" },
  { id: 5, name: 'Crispy Veggie Burger', description: 'Crisp vegetable patty with creamy herb mayo, fresh crunchy lettuce, and ripe tomatoes.', price: 129, categoryId: 3, categoryName: 'Burgers', restaurantId: 4, restaurantName: 'Burger Point' },
  { id: 6, name: 'Crispy Masala Dosa', description: 'Golden thin fermented rice crepe stuffed with spiced potato masala, served with coconut chutney.', price: 110, categoryId: 4, categoryName: 'South Indian', restaurantId: 1, restaurantName: 'Spice Kitchen' },
  { id: 7, name: 'Royal Indian Thali', description: 'Wholesome royal platter with shahi paneer, dal tadka, jeera rice, 2 rotis, salad, and gulab jamun.', price: 210, categoryId: 5, categoryName: 'Meals', restaurantId: 1, restaurantName: 'Spice Kitchen' },
  { id: 8, name: 'Classic Cold Coffee', description: 'Rich blended espresso roast with chilled creamy milk, vanilla swirl, and dark chocolate drizzle.', price: 89, categoryId: 6, categoryName: 'Beverages', restaurantId: 4, restaurantName: 'Burger Point' },
];

// Initial Coupons (Matching the requested codes)
const INITIAL_COUPONS = [
  { id: 1, code: 'FIRST50', description: '50% off on your first order', couponType: 'FIRST_ORDER', discountPercentage: 50, minOrderAmount: 150 },
  { id: 2, code: 'COUPON-10', description: '10% discount on entire order', couponType: 'TOTAL_AMOUNT', discountPercentage: 10, minOrderAmount: 100 },
  { id: 3, code: 'COUPON-25', description: '25% discount on order above ₹200', couponType: 'TOTAL_AMOUNT', discountPercentage: 25, minOrderAmount: 200 },
  { id: 4, code: 'COUPON-30', description: '30% discount on order above ₹300', couponType: 'TOTAL_AMOUNT', discountPercentage: 30, minOrderAmount: 300 },
];

function App() {
  // Current Authenticated Customer
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('foodapp_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Navigation & Page State (defaults to 'register' if path is /register, else 'login' or 'home')
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/register') return 'register';
      if (window.location.pathname === '/login') return 'login';
      if (window.location.pathname === '/orders') return 'orders';
    }
    try {
      const saved = localStorage.getItem('foodapp_user');
      return saved ? 'home' : 'login';
    } catch {
      return 'login';
    }
  });

  const handleNavigate = (page) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      if (page === 'register') {
        window.history.pushState(null, '', '/register');
      } else if (page === 'login') {
        window.history.pushState(null, '', '/login');
      } else if (page === 'orders') {
        window.history.pushState(null, '', '/orders');
      } else if (page === 'home') {
        window.history.pushState(null, '', '/');
      }
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState('');

  // Master Data State
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [restaurants, setRestaurants] = useState(INITIAL_RESTAURANTS);
  const [foods, setFoods] = useState(INITIAL_FOODS);
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);

  // Cart & Order State
  const [cart, setCart] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  // Search input ref for header search icon focus
  const searchInputRef = useRef(null);

  const handleFocusSearch = () => {
    if (activePage !== 'home') {
      setActivePage('home');
    }
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
        searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // --- Backend Sync on Mount ---
  useEffect(() => {
    async function syncWithBackend() {
      try {
        const isHealthy = await api.checkHealth();
        if (isHealthy) {
          setIsBackendConnected(true);
          const [catData, restData, foodData, couponData] = await Promise.allSettled([
            api.getCategories(),
            api.getRestaurants(),
            api.getFoods(),
            api.getCoupons(),
          ]);

          // Merge backend categories while preserving requested 6 categories
          if (catData.status === 'fulfilled' && catData.value?.length > 0) {
            const combinedCats = [...catData.value];
            INITIAL_CATEGORIES.forEach((ic) => {
              if (!combinedCats.some((c) => c.name.toLowerCase() === ic.name.toLowerCase())) {
                combinedCats.push(ic);
              }
            });
            setCategories(combinedCats);
          }

          if (restData.status === 'fulfilled' && restData.value?.length > 0) {
            const combinedRests = [...restData.value];
            INITIAL_RESTAURANTS.forEach((ir) => {
              if (!combinedRests.some((r) => r.name.toLowerCase() === ir.name.toLowerCase())) {
                combinedRests.push(ir);
              }
            });
            setRestaurants(combinedRests);
          }

          if (foodData.status === 'fulfilled' && foodData.value?.length > 0) {
            const combinedFoods = [...foodData.value];
            INITIAL_FOODS.forEach((ifood) => {
              if (!combinedFoods.some((f) => f.name.toLowerCase() === ifood.name.toLowerCase())) {
                combinedFoods.push(ifood);
              }
            });
            setFoods(combinedFoods);
          }

          if (couponData.status === 'fulfilled' && couponData.value?.length > 0) {
            setCoupons(couponData.value);
          }
        }
      } catch {
        setIsBackendConnected(false);
      }
    }

    syncWithBackend();
  }, []);

  // --- Cart Operations ---
  const handleAddToCart = async (food) => {
    // 1. Instant optimistic UI update
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.foodId === food.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.foodId === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      const newItem = {
        id: Date.now(),
        foodId: food.id,
        name: food.name,
        price: food.price,
        quantity: 1,
        categoryId: food.categoryId,
        restaurantName: food.restaurantName,
      };
      return [...prevCart, newItem];
    });

    // 2. Synchronize to Spring Boot backend database cart
    if (isBackendConnected && food.id) {
      try {
        await api.addToCart(1, food.id, 1);
      } catch (err) {
        console.warn('Backend cart sync error:', err.message);
      }
    }
  };

  const handleUpdateQty = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleClearCart = async () => {
    setCart([]);
    if (isBackendConnected) {
      try {
        await api.clearCart(1);
      } catch (err) {
        console.warn('Backend clear cart error:', err.message);
      }
    }
  };

  const handleApplyCoupon = (code) => {
    setAppliedCouponCode(code);
  };

  const handlePlaceOrder = async (orderData) => {
    const custId = currentUser?.id || 1;

    if (isBackendConnected) {
      try {
        const payload = {
          customerId: custId,
          shippingAddress: orderData.customer?.shippingAddress || 'Default Address',
          couponCode: orderData.couponCode || null,
        };
        const backendOrder = await api.placeOrder(payload);
        if (backendOrder) {
          const finalOrder = {
            ...orderData,
            id: backendOrder.id,
            orderNumber: backendOrder.orderNumber,
            totalAmount: backendOrder.totalAmount,
            deliveryFee: backendOrder.deliveryFee,
            discountAmount: backendOrder.discountAmount,
            subtotal: backendOrder.subtotal,
            status: backendOrder.status || 'CONFIRMED',
            customerName: backendOrder.customerName || currentUser?.name || 'Customer',
            items: backendOrder.items && backendOrder.items.length > 0 ? backendOrder.items : orderData.items,
          };
          setLastOrder(finalOrder);

          // Persist order in local history cache
          try {
            const existing = JSON.parse(localStorage.getItem('foodapp_orders') || '[]');
            localStorage.setItem('foodapp_orders', JSON.stringify([finalOrder, ...existing]));
          } catch (e) {
            console.warn('Could not cache placed order:', e);
          }

          setCart([]);
          setAppliedCouponCode('');
          setActivePage('confirmation');
          return;
        }
      } catch (err) {
        console.warn('Backend order checkout error, falling back to local snapshot:', err.message);
      }
    }

    // Local checkout fallback
    const localOrder = {
      ...orderData,
      id: Date.now(),
      orderNumber: orderData.orderNumber || `ORD-${Date.now()}`,
      status: 'CONFIRMED',
      customerName: currentUser?.name || orderData.customer?.name || 'Customer',
    };
    setLastOrder(localOrder);

    try {
      const existing = JSON.parse(localStorage.getItem('foodapp_orders') || '[]');
      localStorage.setItem('foodapp_orders', JSON.stringify([localOrder, ...existing]));
    } catch (e) {
      console.warn('Could not cache placed order:', e);
    }

    setCart([]);
    setAppliedCouponCode('');
    setActivePage('confirmation');
  };

  // --- Admin CRUD Operations ---
  const handleAddCategory = async (newCat) => {
    if (isBackendConnected) {
      try {
        const created = await api.createCategory(newCat);
        setCategories([...categories, created]);
        return;
      } catch (err) {
        console.warn('API error, saving locally:', err.message);
      }
    }
    const created = { ...newCat, id: Date.now() };
    setCategories([...categories, created]);
  };

  const handleDeleteCategory = async (id) => {
    if (isBackendConnected) {
      try {
        await api.deleteCategory(id);
      } catch (err) {
        console.warn('API error, deleting locally:', err.message);
      }
    }
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleAddRestaurant = async (newRest) => {
    if (isBackendConnected) {
      try {
        const created = await api.createRestaurant(newRest);
        setRestaurants([...restaurants, created]);
        return;
      } catch (err) {
        console.warn('API error, saving locally:', err.message);
      }
    }
    const created = { ...newRest, id: Date.now() };
    setRestaurants([...restaurants, created]);
  };

  const handleDeleteRestaurant = async (id) => {
    if (isBackendConnected) {
      try {
        await api.deleteRestaurant(id);
      } catch (err) {
        console.warn('API error, deleting locally:', err.message);
      }
    }
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

  const handleAddFood = async (newF) => {
    if (isBackendConnected) {
      try {
        const created = await api.createFood(newF);
        setFoods([...foods, created]);
        return;
      } catch (err) {
        console.warn('API error, saving locally:', err.message);
      }
    }
    const cat = categories.find((c) => c.id === newF.categoryId);
    const rest = restaurants.find((r) => r.id === newF.restaurantId);
    const created = {
      ...newF,
      id: Date.now(),
      categoryName: cat ? cat.name : '',
      restaurantName: rest ? rest.name : '',
    };
    setFoods([...foods, created]);
  };

  const handleDeleteFood = async (id) => {
    if (isBackendConnected) {
      try {
        await api.deleteFood(id);
      } catch (err) {
        console.warn('API error, deleting locally:', err.message);
      }
    }
    setFoods(foods.filter((f) => f.id !== id));
  };

  const handleAddCoupon = async (newCp) => {
    if (isBackendConnected) {
      try {
        const created = await api.createCoupon(newCp);
        setCoupons([...coupons, created]);
        return;
      } catch (err) {
        console.warn('API error, saving locally:', err.message);
      }
    }
    const created = { ...newCp, id: Date.now() };
    setCoupons([...coupons, created]);
  };

  const handleDeleteCoupon = async (id) => {
    if (isBackendConnected) {
      try {
        await api.deleteCoupon(id);
      } catch (err) {
        console.warn('API error, deleting locally:', err.message);
      }
    }
    setCoupons(coupons.filter((cp) => cp.id !== id));
  };

  // --- Authentication Handlers ---
  const handleLoginSuccess = (customer) => {
    setCurrentUser(customer);
    try {
      localStorage.setItem('foodapp_user', JSON.stringify(customer));
    } catch {
      // ignore storage error
    }
    // Navigate to existing Home page
    setActivePage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('foodapp_user');
    } catch {
      // ignore
    }
    setActivePage('login');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-root">
      {/* 1. Header Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onFocusSearch={handleFocusSearch}
        isBackendConnected={isBackendConnected}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* 2. Main Page Views */}
      <main className="main-content">
        {activePage === 'login' && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'register' && (
          <Register
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'home' && (
          <Home
            categories={categories}
            restaurants={restaurants}
            foods={foods}
            coupons={coupons}
            onAddToCart={handleAddToCart}
            cartItems={cart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onApplyCoupon={handleApplyCoupon}
            onNavigate={setActivePage}
            searchInputRef={searchInputRef}
          />
        )}

        {activePage === 'cart' && (
          <Cart
            cartItems={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigate={setActivePage}
            appliedCouponCode={appliedCouponCode}
          />
        )}

        {activePage === 'checkout' && (
          <Checkout
            cartItems={cart}
            onPlaceOrder={handlePlaceOrder}
            onNavigate={setActivePage}
            availableCoupons={coupons}
            initialCoupon={appliedCouponCode}
          />
        )}

        {activePage === 'confirmation' && (
          <OrderConfirmation
            order={lastOrder}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'orders' && (
          <OrderHistory
            currentUser={currentUser}
            onNavigate={setActivePage}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'admin' && (
          <Admin
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={handleDeleteCategory}
            restaurants={restaurants}
            onAddRestaurant={handleAddRestaurant}
            onDeleteRestaurant={handleDeleteRestaurant}
            foods={foods}
            onAddFood={handleAddFood}
            onDeleteFood={handleDeleteFood}
            coupons={coupons}
            onAddCoupon={handleAddCoupon}
            onDeleteCoupon={handleDeleteCoupon}
          />
        )}

        {activePage === 'partner' && (
          <PartnerWithUs onNavigate={setActivePage} />
        )}

        {activePage === 'support' && (
          <HelpSupport onNavigate={setActivePage} />
        )}
      </main>

      {/* 3. Global Startup Footer */}
      <Footer onNavigate={setActivePage} />
    </div>
  );
}

export default App;
