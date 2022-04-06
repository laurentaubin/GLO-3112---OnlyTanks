import UserPreviewResponse from "../user/UserPreviewResponse";

interface CommentResponse {
  id: string;
  author: UserPreviewResponse;
  comment: string;
  createdAt: string;
}

export default CommentResponse;
