import type { Cat } from '@/models/Cat'

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
}

export interface PostInput {
  file: File
  cat_id?: number
  caption?: string
}
