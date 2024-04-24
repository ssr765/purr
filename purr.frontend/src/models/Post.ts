import type { Cat } from '@/models/Cat'
import type { Comment } from '@/models/Comment'

export interface Post {
  id: number
  url: string
  type: string
  likeCount: number
  commentCount: number
  updatedAt: string
  createdAt: string
  cat?: Cat
  caption?: string
  comments?: Comment[]
}

export interface PostInput {
  file: File
  cat_id?: number
  caption?: string
}
