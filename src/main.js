import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Adjust path as per your project structure
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { VueMaskDirective } from 'v-mask'; // Import VueMaskDirective from v-mask

createApp(App)
  .use(router)
  .use(store)
  .use(VueAxios, axios)
  .directive('mask', VueMaskDirective) // Register VueMaskDirective globally
  .mount('#app');

store.dispatch('loadStoredState'); // Load stored state from localStorage
