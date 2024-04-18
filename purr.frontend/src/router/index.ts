import { authCheckGuard } from '@/guards/authCheck'
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
          component: () => import('@/views/landing/HomeView.vue'),
        },
      ],
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('@/layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          name: 'app-home',
          component: () => import('@/views/app/HomeView.vue'),
        },
        {
          path: 'maps/vets',
          name: 'app-maps-vets',
          component: () => import('@/views/app/maps/VeterinariesView.vue'),
        },
        {
          path: 'create',
          name: 'app-posts-create',
          component: () => import('@/views/app/posts/CreateView.vue'),
        },
        {
          path: 'posts/:id(\\d+)',
          name: 'app-posts-detail',
          component: () => import('@/views/app/posts/DetailView.vue'),
        },
        {
          path: 'cats/:catname([\\w\\d\\.-]+)',
          name: 'app-cats-profile',
          component: () => import('@/views/app/cats/ProfileView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'auth-login',
      component: () => import('@/views/auth/AuthenticationView.vue'),
      props: { mode: 'login' },
    },
    {
      path: '/register',
      name: 'auth-register',
      component: () => import('@/views/auth/AuthenticationView.vue'),
      props: { mode: 'register' },
    },
  ],
})

router.beforeEach(authCheckGuard)

export default router
