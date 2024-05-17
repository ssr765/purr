import type { Cat } from '@/models/Cat'
import type { Entity } from '@/models/Entity'
import type { Settings } from '@/models/Settings'

export interface User {
  id: number
  name: string
  email: string
  username: string
  following_count: number
  createdAt: string
  updatedAt: string
  admin: boolean
  avatar?: string
  biography?: string
  cats?: Cat[]
  settings?: Settings
  entity?: Entity
}
