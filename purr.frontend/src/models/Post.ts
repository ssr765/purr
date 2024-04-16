import type { Cat } from '@/models/Cat'

export class Post {
  constructor(
    public id: number,
    public catId: number,
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
