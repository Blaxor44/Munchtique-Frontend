import { createStore } from 'vuex';

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
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
    logout({ commit }) {
      commit('setUser', null);
      commit('clearCart');
      localStorage.removeItem('token');
      localStorage.removeItem('cart');
      localStorage.removeItem('user');
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
  },
  getters: {
    cartItems: state => state.cart,
    totalPrice: state => {
      return state.cart.reduce((total, item) => total + item.price, 0);
    },
    isAuthenticated: state => !!state.user,
    getUser: state => state.user,
  },
});
