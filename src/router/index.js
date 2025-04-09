import { createRouter, createWebHistory } from 'vue-router';
import Filter from '@/components/Filter.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Filter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
