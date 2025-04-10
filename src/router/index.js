import CreateWrapperPage from '@/views/CreateWrapperPage.vue';
import EditWrapperPage from '@/views/EditWrapperPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';
import MyPage from '@/views/MyPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import TransactionHistory from '@/views/TransactionHistory.vue';
const routes = [];

// 라우터 인스턴스 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/transaction-history',
      name: 'TransactionHistory',
      component: TransactionHistory,
    },
    {
      path: '/record/create',
      name: 'createWrapperPage',
      component: CreateWrapperPage,
    },
    {
      path: '/record/edit/:id',
      name: 'editWrapperPage',
      component: EditWrapperPage,
    },
    {
      path: '/not-found',
      name: 'NotFoundPage',
      component: NotFoundPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundPage',
      component: NotFoundPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
    },
  ],
});

export default router;
