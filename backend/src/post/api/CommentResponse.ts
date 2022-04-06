import UserPreviewResponse from "./UserPreviewResponse";

interface CommentResponse {
  id: string;
  author: UserPreviewResponse;
  comment: string;
}

export default CommentResponse;
