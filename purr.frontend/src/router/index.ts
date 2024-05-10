import { authCheckGuard } from '@/guards/authCheck'
import { redirectIfAuthenticatedGuard } from '@/guards/redirectIfAuthenticated'
import { redirectIfUnauthenticatedGuard } from '@/guards/redirectIfUnauthenticated'
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
          path: 'explore',
          name: 'app-explore',
          component: () => import('@/views/app/explore/IndexView.vue'),
        },
        {
          path: 'maps',
          name: 'app-maps',
          component: () => null,
        },
        {
          path: 'create',
          name: 'app-posts-create',
          component: () => import('@/views/app/posts/CreateView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'posts/:id(\\d+)',
          name: 'app-posts-detail',
          component: () => import('@/views/app/posts/DetailView.vue'),
        },
        {
          path: 'cats/create',
          name: 'app-cats-create',
          component: () => import('@/views/app/cats/CreateView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'cats/:catname([\\w\\d\\.-]+)',
          name: 'app-cats-profile',
          component: () => import('@/views/app/cats/ProfileView.vue'),
        },
        {
          path: 'settings',
          name: 'app-settings',
          component: () => import('@/views/app/settings/IndexView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'entity/create',
          name: 'app-entity-create',
          component: () => import('@/views/app/entity/CreateView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'posts/likes',
          name: 'app-posts-likes',
          component: () => import('@/views/app/posts/LikesView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'posts/saved',
          name: 'app-posts-saved',
          component: () => import('@/views/app/posts/SavedView.vue'),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      name: 'auth-login',
      component: () => import('@/views/auth/AuthenticationView.vue'),
      meta: { noAuth: true },
      props: { mode: 'login' },
    },
    {
      path: '/register',
      name: 'auth-register',
      component: () => import('@/views/auth/AuthenticationView.vue'),
      meta: { noAuth: true },
      props: { mode: 'register' },
    },
  ],
})

router.beforeEach(authCheckGuard)
router.beforeEach(redirectIfAuthenticatedGuard)
router.beforeEach(redirectIfUnauthenticatedGuard)

export default router
