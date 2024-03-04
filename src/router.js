import { createRouter, createWebHistory } from 'vue-router';
import { usePlayerInfoStore } from '@/store/playerInfo';
import Login from '@/views/LoginView.vue';
import UserInfo from '@/components/UserInfo.vue';
import PcWindow from '@/components/PcWindow.vue'; // Import PcWindow component
import RegionMap from '@/components/RegionMap.vue'; // Import RegionMap component
import ProfessorsLab from '@/components/locations/ProfessorsLab.vue';
import Route from '@/components/locations/RouteLocation.vue';

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
  {
    path: '/region/:regionName',
    name: 'RegionMap',
    props: true, // Correct way to pass params as props
    component: RegionMap,
    meta: { requiresAuth: true },
  },
  {
    path: '/location/prof-lab',
    name: 'Professors Lab',
    component: ProfessorsLab,
    meta: { requiresAuth: true },
  },
  {
    path: '/location/route/:routeNumber',
    name: 'Route',
    props: true,
    component: Route,
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
