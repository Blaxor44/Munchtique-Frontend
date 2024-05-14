import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Menu from "../views/Menu.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import PizzaView from "../views/PizzaView.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/menu", name: "Menu", component: Menu },
  { path: "/login", name: "Login", component: Login },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/pizza", name: "Pizza", component: PizzaView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
