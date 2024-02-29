// src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import { usePlayerInfoStore } from '@/store/playerinfo';
import Login from '@/views/LoginView.vue';
import UserInfo from '@/views/UserInfo.vue';
import PcWindow from '@/components/PcWindow.vue'; // Import PcWindow component

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user-info',
    name: 'UserInfo',
    component: UserInfo,
    meta: { requiresAuth: true },
  },
  {
    path: '/pc-window',
    name: 'PcWindow',
    component: PcWindow,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = usePlayerInfoStore().isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
