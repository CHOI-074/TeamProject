import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/Main.vue'
import NotFoundPage from '../views/NotFoundPage.vue'

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: NotFoundPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
