import { createRouter, createWebHistory } from 'vue-router';
import Filter from '@/views/Filter.vue';
import SignUp from '@/views/SignUp.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Filter,
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
