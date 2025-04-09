import { createRouter, createWebHistory } from 'vue-router';
import Filter from '@/views/Filter.vue';
import MyPage from '@/views/MyPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Filter,
  },
  {
    path: '/MyPage',
    name: 'MyPage',
    component: MyPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
