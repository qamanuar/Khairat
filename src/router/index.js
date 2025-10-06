import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from "../client/supabase"

// Layouts
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

// Views
import Home from '../views/Home.vue'
import Payment from '../views/Payment.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import Unauthorized from '../views/Unauthorized.vue'
import PaymentMethod from '../views/PaymentMethod.vue'


let localUser;

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'payment', component: Payment },
      { path: 'payment-method', component: PaymentMethod },

      // ✨ New pages
      { path: 'balance', component: () => import('../views/Balance.vue') },
      { path: 'history', component: () => import('../views/History.vue') },
      { path: 'receipt', component: () => import('../views/Receipt.vue') },

      {
        path: 'secret',
        component: () => import('../views/Secret.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
      { path: 'forgot-password', component: ForgotPassword },
      { path: 'unauthorized', component: Unauthorized }
    ]
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

// Auth check
async function getUser(next) {
  localUser = await supabase.auth.getSession();
  if (localUser.data.session === null) {
    next("/unauthorized");
  } else {
    next();
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next);
  } else {
    next();
  }
});

export default router
