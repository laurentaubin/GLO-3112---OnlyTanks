interface Post {
  imageUrl: string;
  hashtags: string[];
  author: string;
  caption: string;
  id: string;
  createdAt?: number;
}

export default Post;
