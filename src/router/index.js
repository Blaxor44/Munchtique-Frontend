import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Menu from '../views/Menu.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Cart from '../views/Cart.vue';
import MyProfile from '../views/MyProfile.vue';
import Checkout from '@/views/Checkout.vue';
import ThankYou from '@/views/ThankYou.vue';

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/menu/:category?', name: 'Menu', component: Menu , meta: { requiresAuth: true }},
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/profile', name: 'MyProfile', component: MyProfile, meta: { requiresAuth: true } },
  { path: '/checkout', name: 'Checkout', component: Checkout, meta: { requiresAuth: true } },
  { path: '/thankyou', name: 'ThankYou', component: ThankYou, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Allow access to route
  }
});

export default router;
