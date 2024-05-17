import { createApp } from "vue";
import VueAxios from 'vue-axios';
import App from "./App.vue";
import router from "@/router/index.js";
import axios from 'axios';
import store from './store';

createApp(App).use(router).use(store).use(VueAxios, axios).mount("#app");
