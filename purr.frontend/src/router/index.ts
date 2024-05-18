import { authCheckGuard } from '@/guards/authCheck'
import { homeRedirectGuard } from '@/guards/homeRedirect'
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
        {
          path: 'privacy-policy',
          name: 'landing-privacy-policy',
          component: () => import('@/views/landing/PrivacyPolicyView.vue'),
        },
        {
          path: 'cookie-policy',
          name: 'landing-cookie-policy',
          component: () => import('@/views/landing/CookiePolicyView.vue'),
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
          component: () => null,
          // Dynamic redirect based on auth state
          // If authenticated, redirect to the posts feed
          // If unauthenticated, redirect to the explore page
        },
        {
          path: 'feed',
          name: 'app-feed',
          component: () => import('@/views/app/feed/IndexView.vue'),
        },
        {
          path: 'explore',
          name: 'app-explore',
          component: () => import('@/views/app/explore/IndexView.vue'),
        },
        {
          path: 'maps',
          name: 'app-maps',
          component: () => import('@/views/app/maps/IndexView.vue'),
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
          path: 'cats/create/add-a-cat',
          name: 'app-cats-create-add-a-cat',
          component: () => import('@/views/app/cats/AddACatView.vue'),
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
router.beforeEach(homeRedirectGuard)

export default router
