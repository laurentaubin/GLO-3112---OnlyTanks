import UserPreviewResponse from "../user/UserPreviewResponse";
import CommentResponse from "../comment/CommentResponse";

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
  commentsPreview: CommentResponse[];
  author: UserPreviewResponse;
  createdAt: number;
  isLiked: boolean;
  numberOfLikes: number;
  numberOfComments: number;
}

export default PostResponse;
