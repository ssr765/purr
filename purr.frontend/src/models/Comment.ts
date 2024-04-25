import type { Post } from './Post'
import type { User } from './User'

export interface Comment {
  id: number
  content: string
  user: User
  post?: Post
  liked?: boolean
  likesCount: number
  repliesCount: number
  createdAt: string
  updatedAt: string
}
