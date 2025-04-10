import CreateWrapperPage from '@/views/CreateWrapperPage.vue';
import EditWrapperPage from '@/views/EditWrapperPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

// 라우터 인스턴스 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

export default router;
