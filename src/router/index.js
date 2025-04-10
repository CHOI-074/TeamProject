import { createRouter, createWebHistory } from 'vue-router';
// import Transaction from '@/components/Transaction.vue';
import TransactionHistory from '@/views/TransactionHistory.vue';
import AnalyzeView from '@/views/AnalyzeView.vue'; //  분석 페이지 임포트 추가

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
  {
    path: '/analysis', // 석 탭 라우트 추가
    name: 'Analyze',
    component: AnalyzeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
