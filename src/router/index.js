import { createRouter, createWebHistory } from 'vue-router';
import Filter from '@/views/Filter.vue';
import MyPage from '@/views/MyPage.vue';
import Login from '@/views/Login.vue';

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
