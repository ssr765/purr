import type { Post } from '@/models/Post'

export interface Cat {
  id: number
  name: string
  catname: string
  sex: string
  followers: number
  updatedAt: string
  createdAt: string
  breed?: string
  color?: string
  avatar?: string
  biography?: string
  birthdate?: string
  deathdate?: string
  posts?: Post[]
}
