interface UserTag {
  username: string;
  position: [number, number];
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  comment: string;
}

interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  comments: Comment[];
  hashtags: string[];
  userTags?: UserTag[];
  author: { username: string; imageUrl: string };
  createdAt: number;
  isLiked: boolean;
  numberOfLikes: number;
}

export default PostResponse;
