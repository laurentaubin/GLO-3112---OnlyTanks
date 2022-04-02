import Comment from "./Comment";
import UserTag from "./UserTag";

interface Post {
  author: string;
  caption: string;
  comments: Comment[];
  hashtags: string[];
  id: string;
  imageUrl: string;
  likes: string[];
  userTags: UserTag[];
  createdAt?: number;
}

export default Post;
