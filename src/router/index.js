import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Transaction from '@/views/Transaction.vue';

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'transactions',
        component: Transaction
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;