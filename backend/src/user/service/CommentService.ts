import UserRepository from "../domain/UserRepository";
import Comment from "../../post/domain/Comment";
import CommentWithAuthorPreview from "../../post/domain/CommentWithAuthorPreview";

class CommentService {
  constructor(private userRepository: UserRepository) {}

  public async getCommentsAuthorPreviews(comments: Comment[]): Promise<CommentWithAuthorPreview[]> {
    const commentsWithAuthorPreview = comments.map(async (comment) => {
      const user = await this.userRepository.findByUsername(comment.author);
      return { ...comment, author: { imageUrl: user.imageUrl, username: comment.author } };
    });
    return Promise.all(commentsWithAuthorPreview);
  }
}

export default CommentService;
