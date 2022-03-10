import UserTag from "./UserTag";

interface Post {
  imageUrl: string;
  hashtags: string[];
  userTags: UserTag[];
  author: string;
  caption: string;
  id: string;
  createdAt?: number;
  likes: string[];
}

export default Post;
