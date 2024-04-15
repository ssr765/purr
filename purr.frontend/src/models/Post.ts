export class Post {
  constructor(
    public id: number,
    public catId: number,
    public filename: string,
    public caption: string,
    public type: string,
    public likeCount: number,
    public commentCount: number,
    public updatedAt: string,
    public createdAt: string
  ) {}
}
