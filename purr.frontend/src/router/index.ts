import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/landing/HomeView.vue')
    },
    {
      path: '/app',
      name: 'app-home',
      component: () => import('../layouts/GlobalInterface.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/app/HomeView.vue')
        }
      ]
    }
  ]
})

export default router
