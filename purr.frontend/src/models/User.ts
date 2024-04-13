export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public username: string,
    public following: number,
    public createdAt: string,
    public avatar?: string,
    public biography?: string
  ) {}
}
