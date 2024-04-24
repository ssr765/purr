import type { User } from './User'

export interface Comment {
  id: number
  content: string
  user: User
  likesCount: number
  repliesCount: number
  createdAt: string
  updatedAt: string
}
