import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/layouts/LandingLayout.vue'),
      children: [
        {
          path: '',
          name: 'landing-home',
          component: () => import('@/views/landing/HomeView.vue')
        }
      ]
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'app-home',
          component: () => import('@/views/app/HomeView.vue')
        },
        {
          path: 'maps/vets',
          name: 'app-maps-vets',
          component: () => import('@/views/app/maps/VeterinariesView.vue')
        }
      ]
    }
  ]
})

export default router
