import CommentResponse from "./CommentResponse";
import UserTagsDto from "./dto/UserTagsDto";
import UserPreviewResponse from "./UserPreviewResponse";

interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  hashtags: string[];
  userTags: UserTagsDto[];
  author: UserPreviewResponse;
  commentsPreview: CommentResponse[];
  numberOfComments: number;
  createdAt: number;
  isLiked: boolean;
  numberOfLikes: number;
}

export default PostResponse;
