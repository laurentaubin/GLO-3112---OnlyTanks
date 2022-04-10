import UserPreviewResponse from "../user/UserPreviewResponse";
import CommentResponse from "../comment/CommentResponse";

interface UserTag {
  username: string;
  position: [number, number];
}

interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  hashtags: string[];
  userTags?: UserTag[];
  commentsPreview: CommentResponse[];
  numberOfComments: number;
  author: UserPreviewResponse;
  createdAt: number;
  isLiked: boolean;
  numberOfLikes: number;
}

export default PostResponse;
