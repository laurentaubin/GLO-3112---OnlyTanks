import UUIDGenerator from "../../utils/UUIDGenerator";
import PostCommentRequest from "../api/PostCommentRequest";
import Comment from "./Comment";

export default class CommentFactory {
  public create(author: string, postCommentRequest: PostCommentRequest): Comment {
    return {
      id: UUIDGenerator.generate(),
      author: author,
      comment: postCommentRequest.comment,
      createdAt: Date.now()
    };
  }
}
