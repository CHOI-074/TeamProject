import { createRouter, createWebHistory } from 'vue-router';
import Transaction from '@/components/Transaction.vue';
import TransactionHistory from '@/views/TransactionHistory.vue';

const routes = [
  {
    path: '/transaction-history',
    name: 'TransactionHistory',
    component: TransactionHistory,
  },
  {
    path: '/',
    component: Transaction,
    children: [
      {
        path: 'transactions',
        component: Transaction,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
