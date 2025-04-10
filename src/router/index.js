import { createRouter, createWebHistory } from 'vue-router';

import CreateWrapperPage from '@/views/CreateWrapperPage.vue';
import EditWrapperPage from '@/views/EditWrapperPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';
import MyPage from '@/views/MyPage.vue';
import TransactionHistory from '@/views/TransactionHistory.vue';
import AnalyzeView from '@/views/AnalyzeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login,
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
    name: 'EditRecord',
    component: () => import('@/views/EditWrapperPage.vue'),
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: MyPage,
  },
  {
    path: '/analyzeview',
    name: 'analyzeview',
    component: AnalyzeView,
  },
  {
    path: '/not-found',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
