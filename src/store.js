import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push(item);
    },
    removeFromCart(state, index) {
      state.cart.splice(index, 1);
    }
  },
  actions: {
    addToCart({ commit }, item) {
      commit('addToCart', item);
    },
    removeFromCart({ commit }, index) {
      commit('removeFromCart', index);
    },
    logout({ commit }) {
      // Clear the user data from the state
      commit('setUser', null);
  
      // Optionally, clear the token from localStorage if it's stored there
      localStorage.removeItem('token');
    }
  },
  getters: {
    cartItems: state => state.cart,
    totalPrice: state => {
      // Calculate total price dynamically based on items in the cart
      return state.cart.reduce((total, item) => total + item.price, 0);
    }
  }
});
