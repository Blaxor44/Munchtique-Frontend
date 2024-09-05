import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    discountCode: null,
    checkoutAddress: '',
    checkoutCity: '',
    checkoutPostalCode: '',
    paymentMethod: 'cash', // default payment method
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    totalPrice: 0 // Initialize totalPrice
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    addToCart(state, item) {
      state.cart.push(item);
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    clearCart(state) {
      state.cart = [];
    },
    setDiscountCode(state, code) {
      state.discountCode = code;
    },
    setCheckoutAddress(state, address) {
      state.checkoutAddress = address;
    },
    setCheckoutCity(state, city) {
      state.checkoutCity = city;
    },
    setCheckoutPostalCode(state, postalCode) {
      state.checkoutPostalCode = postalCode;
    },
    setPaymentMethod(state, method) {
      state.paymentMethod = method;
    },
    setCardNumber(state, number) {
      state.cardNumber = number;
    },
    setExpiryDate(state, date) {
      state.expiryDate = date;
    },
    setCVV(state, cvv) {
      state.cvv = cvv;
    },
    setTotalPrice(state, price) {
      state.totalPrice = price;
    },
  },
  actions: {
    addToCart({ commit, state }, item) {
      commit('addToCart', item);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart({ commit, state }, index) {
      commit('removeFromCart', index);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    applyDiscount({ commit, state }, code) {
      if (code === 'Munch') {
        if (state.discountCode === code) {
          return false; // Code has already been applied
        } else {
          commit('setDiscountCode', code);
          return true; // Code successfully applied
        }
      } else {
        return false; // Invalid code
      }
    },
    logout({ commit }) {
      commit('clearUser');
      commit('clearCart');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('cart');
      console.log('User state cleared and token removed from local storage');
    },
    setUser({ commit }, user) {
      commit('setUser', user);
      localStorage.setItem('user', JSON.stringify(user));
    },
    loadStoredState({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        commit('setUser', user);
      }
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (cart) {
        commit('setCart', cart);
      }
    },
    initializeApp({ dispatch }) {
      dispatch('loadStoredState');
    },

    async checkout({ state, commit }) {
      const token = localStorage.getItem('token');
      
      // Construct the payload
      const payload = {
        fullName: state.user.fullName,
        email: state.user.email,
        phone: state.user.phone,
        address: state.checkoutAddress,
        city: state.checkoutCity,
        postalCode: state.checkoutPostalCode,
        paymentMethod: state.paymentMethod,
        cardDetails: state.paymentMethod === 'card' ? {
          cardNumber: state.cardNumber,
          expiryDate: state.expiryDate,
          cvv: state.cvv
        } : null,
        items: state.cart,
        totalPrice: state.totalPrice
      };
  
      try {
        const response = await axios.post('http://localhost:5000/api/checkout', payload, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.status === 200) {
          // Handle successful checkout
          commit('clearCart');
          alert('Order placed successfully!');
        } else {
          alert('Error placing order. Please try again.');
        }
      } catch (error) {
        console.error('Error placing order:', error);
        alert('Error placing order. Please try again.');
      }
    },
  },
  getters: {
    cartItems: state => state.cart,
    totalPrice: state => {
      const total = state.cart.reduce((total, item) => total + item.price, 0);
      // Apply discount if code is valid
      if (state.discountCode === 'Munch') {
        return total * 0.85; // 15% off
      }
      return total;
    },
    isAuthenticated: state => !!state.user,
    getUser: state => state.user,
  },
});
