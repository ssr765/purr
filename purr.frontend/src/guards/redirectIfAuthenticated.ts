import { useAuthStore } from '@/stores/authStore'

export const redirectIfAuthenticatedGuard = async (
  to: any,
  from: any,
  next: any,
) => {
  const authStore = useAuthStore()
  if (to.meta.noAuth) {
    if (!authStore.isAuthenticated) {
      next()
    } else {
      next({ name: 'app-home' })
    }
  } else {
    next()
  }
}
