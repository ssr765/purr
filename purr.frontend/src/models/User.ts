import type { Cat } from '@/models/Cat'

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public username: string,
    public following: number,
    public createdAt: string,
    public updatedAt: string,
    public avatar?: string,
    public biography?: string,
    public cats?: Cat[],
  ) {}
}
