import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Menu from "../views/Menu.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Cart from "../views/Cart.vue";
import MyProfile from "../views/MyProfile.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: '/menu/:category?', name: 'Menu', component: Menu},
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/profile", name: "MyProfile", component: MyProfile },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
