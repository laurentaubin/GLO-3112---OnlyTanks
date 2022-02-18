import UserPreviewResponse from "./UserPreviewResponse";

interface PostResponse {
  imageUrl: string;
  id: string;
  caption: string;
  hashtags: string[];
  author: UserPreviewResponse;
  createdAt: number;
}

export default PostResponse;
