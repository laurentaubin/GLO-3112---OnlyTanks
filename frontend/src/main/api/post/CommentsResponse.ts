import CommentResponse from "./CommentResponse";

interface CommentsResponse {
  count: number;
  comments: CommentResponse[];
}

export default CommentsResponse;
