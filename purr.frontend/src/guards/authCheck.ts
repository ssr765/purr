import { useAuthStore } from '@/stores/authStore'

export const authCheckGuard = async (to: any, from: any, next: any) => {
  const authStore = useAuthStore()

  // Landing pages that don't require authentication.
  const publicPaths = [
    '/',
    '/faqs',
    '/ai',
    '/features',
    '/privacy-policy',
    '/cookies-policy',
  ]
  if (authStore.firstLoad && publicPaths.includes(to.path)) {
    authStore.firstLoad = false
    next()
    await authStore.fetchUser()
    return
  }

  if (authStore.firstLoad) {
    await authStore.fetchUser()
    authStore.firstLoad = false
  }

  next()
}
