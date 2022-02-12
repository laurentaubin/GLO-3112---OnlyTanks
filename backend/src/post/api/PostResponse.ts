export interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  hashtags: string[];
  author: string;
  createdAt: number;
}

export default PostResponse;
