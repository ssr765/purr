export class Post {
  constructor(
    public id: number,
    public cat_id: number,
    public filename: string,
    public caption: string,
    public type: string,
    public like_count: number,
    public comment_count: number
  ) {}
}
