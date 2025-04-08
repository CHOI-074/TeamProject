import { createRouter, createWebHistory } from 'vue-router';
import Filter from '@/views/Filter.vue';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Filter,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
