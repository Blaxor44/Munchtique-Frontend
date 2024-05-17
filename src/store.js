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
    }
  },
  getters: {
    cartItems: state => state.cart,
    totalPrice: state => {
        return state.cart.reduce((total, item) => total + item.price, 0);
  }
}});
