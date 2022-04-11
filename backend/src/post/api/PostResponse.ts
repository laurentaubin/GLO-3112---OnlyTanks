import CommentResponse from "./CommentResponse";
import UserTagsDto from "./dto/UserTagsDto";
import UserPreviewResponse from "./UserPreviewResponse";

interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  comments: CommentResponse[];
  hashtags: string[];
  userTags: UserTagsDto[];
  author: UserPreviewResponse;
  commentsPreview: CommentResponse[];
  createdAt: number;
  isLiked: boolean;
  numberOfLikes: number;
  numberOfComments: number;
}

export default PostResponse;
