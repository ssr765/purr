import type { Cat } from '@/models/Cat'

export interface User {
  id: number
  name: string
  email: string
  username: string
  following: number
  createdAt: string
  updatedAt: string
  avatar?: string
  biography?: string
  cats?: Cat[]
  settings?: Object
}
