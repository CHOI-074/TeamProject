import { createRouter, createWebHistory } from 'vue-router';
import TransactionHistory from '@/views/TransactionHistory.vue';
const routes = [
  {
    path: '/transaction-history',
    name: 'TransactionHistory',
    component: TransactionHistory,
  },
  {
    path: '/', //메인화면(+가계부)에 필터 포함, TransactionHistory가 나오도록 변경했습니다.
    component: TransactionHistory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
