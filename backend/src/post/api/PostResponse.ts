import UserTagsDto from "./UserTagsDto";
import UserPreviewResponse from "./UserPreviewResponse";

interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  hashtags: string[];
  userTags: UserTagsDto[];
  author: UserPreviewResponse;
  createdAt: number;
  isLiked: boolean;
  numberOfLikes: number;
}

export default PostResponse;
