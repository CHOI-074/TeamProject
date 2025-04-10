import { createRouter, createWebHistory } from 'vue-router';

import CreateWrapperPage from '@/views/CreateWrapperPage.vue';
import EditWrapperPage from '@/views/EditWrapperPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';
import MyPage from '@/views/MyPage.vue';
import TransactionHistory from '@/views/TransactionHistory.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login, // 🟡 기본 루트로 진입 시 로그인 페이지
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
  },
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
    path: '/mypage',
    name: 'mypage',
    component: MyPage,
  },
  {
    path: '/not-found',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found', // 잘못된 경로는 not-found로 이동
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
