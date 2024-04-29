import { useAuthStore } from '@/stores/authStore'

export const redirectIfUnauthenticatedGuard = async (
  to: any,
  from: any,
  next: any,
) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth) {
    if (authStore.isAuthenticated) {
      next()
    } else {
      next({ name: 'auth-login' })
    }
  } else {
    next()
  }
}
