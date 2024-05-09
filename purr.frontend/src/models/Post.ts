import type { Cat } from '@/models/Cat'
import type { Comment } from '@/models/Comment'

export interface Post {
  id: number
  url: string
  type: string
  likesData: {
    count: number
    isLiked: boolean
  }
  savesData: {
    count: number
    isSaved: boolean
  }
  commentsCount: number
  updatedAt: string
  createdAt: string
  comments: Comment[]
  cat?: Cat
  caption?: string
  detected: boolean
}

export interface PostInput {
  file: File
  cat_id?: string
  caption?: string
}
