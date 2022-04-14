import CommentResponse from "../../main/api/comment/CommentResponse";
import CommentsWithAuthorPreviewResponse from "../../main/api/comment/CommentsWithAuthorPreview";
import Comment from "../../main/domain/Comment";
import CommentWithAuthorPreview from "../../main/domain/CommentWithAuthorPreview";
import dayjs from "dayjs";

class CommentAssembler {
  public assembleToComment(commentResponse: CommentResponse): Comment {
    return {
      id: commentResponse.id,
      author: commentResponse.author,
      comment: commentResponse.comment,
      timestamp: { datetime: dayjs(commentResponse.createdAt).toDate() }
    };
  }

  public assembleToComments(commentResponses: CommentResponse[]): Comment[] {
    return commentResponses.map((commentResponse) => {
      return this.assembleToComment(commentResponse);
    });
  }

  public assembleToCommentsWithAuthorPreview(commentsResponse: CommentsWithAuthorPreviewResponse): CommentWithAuthorPreview[] {
    return commentsResponse
      ? commentsResponse.comments.map((comment) => ({
          timestamp: { datetime: dayjs(comment.createdAt).toDate() },
          ...comment
        }))
      : [];
  }
}

export default new CommentAssembler();
