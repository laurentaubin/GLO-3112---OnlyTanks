interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  hashtags: string[];
  author: { username: string; imageUrl: string };
  createdAt: number;
}

export default PostResponse;
