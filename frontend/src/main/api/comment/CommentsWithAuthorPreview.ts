import CommentWithAuthorPreviewResponse from "./CommentWithAuthorPreviewResponse";

interface CommentsWithAuthorPreviewResponse {
  count: number;
  comments: CommentWithAuthorPreviewResponse[];
}

export default CommentsWithAuthorPreviewResponse;
