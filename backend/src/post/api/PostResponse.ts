import UserTagsDto from "./dto/UserTagsDto";
import UserPreviewResponse from "./UserPreviewResponse";

interface CommentResponse {
  id: string;
  author: string;
  comment: string;
}

interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  comments: CommentResponse[];
  hashtags: string[];
  userTags: UserTagsDto[];
  author: UserPreviewResponse;
  createdAt: number;
  isLiked: boolean;
  numberOfLikes: number;
  numberOfComments: number;
}

export default PostResponse;
