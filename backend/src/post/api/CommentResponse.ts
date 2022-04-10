import UserPreviewResponse from "./UserPreviewResponse";

interface CommentResponse {
  id: string;
  author: UserPreviewResponse | string;
  comment: string;
}

export default CommentResponse;
