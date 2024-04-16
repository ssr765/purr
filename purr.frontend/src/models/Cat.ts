import type { Post } from '@/models/Post'

export class Cat {
  constructor(
    public id: number,
    public name: string,
    public catname: string,
    public followers: number,
    public updatedAt: string,
    public createdAt: string,
    public breed?: string,
    public color?: string,
    public avatar?: string,
    public biography?: string,
    public birthday?: string,
    public deathdate?: string,
    public posts?: Post[],
  ) {}
}
