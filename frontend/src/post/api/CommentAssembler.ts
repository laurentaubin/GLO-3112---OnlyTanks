import dayjs from "dayjs";
import CommentsResponse from "../../main/api/post/CommentsResponse";
import Comment from "../../main/domain/Comment";

class CommentAssembler {
  public assembleToComments(commentsResponse: CommentsResponse): Comment[] {
    return commentsResponse
      ? commentsResponse.comments.map((comment) => ({
          timestamp: { datetime: dayjs(comment.createdAt).toDate() },
          ...comment
        }))
      : [];
  }
}

export default new CommentAssembler();
