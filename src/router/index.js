import { createRouter, createWebHistory } from 'vue-router';
import Transaction from '@/components/Transaction.vue';

const routes = [
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
