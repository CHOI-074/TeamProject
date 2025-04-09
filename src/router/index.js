import { createRouter, createWebHistory } from 'vue-router';
import Filter from '@/views/Filter.vue';
import DashboardView from '../views/DashboardView.vue';
import SumboardView from '../views/SumboardView.vue';
import Top5Chart from '../components/charts/Top5Chart.vue'; // Top5Chart 컴포넌트 import
import AnalyzeView from '../views/AnalyzeView.vue'; // AnalyzeView 임포트

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
  {
    path: '/top5',
    name: 'top5',
    component: Top5Chart, // 홈 라우트에 Top5Chart 연결
  },
  {
    path: '/analyze', // AnalyzeView 라우트 추가
    name: 'Analyze',
    component: AnalyzeView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
