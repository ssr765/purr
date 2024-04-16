import type { Cat } from '@/models/Cat'

export class Post {
  constructor(
    public id: number,
    public url: string,
    public type: string,
    public likeCount: number,
    public commentCount: number,
    public updatedAt: string,
    public createdAt: string,
    public cat?: Cat,
    public caption?: string,
  ) {}
}

export class PostInput {
  constructor(
    public file: File,
    public cat_id?: number,
    public caption?: string,
  ) {}
}
