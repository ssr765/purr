import type { Cat } from '@/models/Cat'
import type { Entity } from '@/models/Entity'

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
  entity?: Entity
}
