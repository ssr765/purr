import { useAuthStore } from '@/stores/authStore'

export const homeRedirectGuard = async (to: any, from: any, next: any) => {
  const authStore = useAuthStore()
  if (to.path === '/app') {
    if (authStore.isAuthenticated) {
      next({ name: 'app-feed' })
    } else {
      next({ name: 'app-explore' })
    }
  } else {
    next()
  }
}
