import { useAuthStore } from '@/stores/authStore'

export const authCheckGuard = async (to: any, from: any, next: any) => {
  const authStore = useAuthStore()

  // Landing pages that don't require authentication.
  const publicPaths = ['/', '/techs']
  if (publicPaths.includes(to.path)) {
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
