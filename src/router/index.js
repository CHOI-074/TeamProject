import { createRouter, createWebHistory } from 'vue-router';
import Filter from '@/views/Filter.vue';
import DashboardView from '../views/DashboardView.vue';
import SumboardView from '../views/SumboardView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Filter,
  },
  {
    path: '/dash', // "/dash" 경로로 이동 시 DashboardView를 보여줌
    name: 'Dashboard',
    component: DashboardView,
  },
  {
    path: '/sum', // "/sum" 경로로 이동 시 SumboardView를 보여줌
    name: 'Sumboard',
    component: SumboardView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
