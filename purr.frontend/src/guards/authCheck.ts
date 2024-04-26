import { useAuthStore } from '@/stores/authStore'

export const authCheckGuard = async (to: any, from: any, next: any) => {
  const authStore = useAuthStore()
  if (!to.path.startsWith('/app')) {
    authStore.firstLoad = false
    next()
    await authStore.fetchUser()
  } else if (authStore.firstLoad) {
    await authStore.fetchUser()
    authStore.firstLoad = false
    next()
  } else {
    next()
  }
}
