import UserPreviewResponse from "../user/UserPreviewResponse";

interface CommentWithAuthorPreviewResponse {
  id: string;
  author: UserPreviewResponse;
  comment: string;
  createdAt: string;
}

export default CommentWithAuthorPreviewResponse;
