import PostComment from "./PostComment";
import CommentWithAuthorPreview from "../../domain/CommentWithAuthorPreview";

interface Props {
  comments: CommentWithAuthorPreview[];
}

const PostCommentList = ({ comments }: Props) => {
  console.warn(comments);
  return (
    <div>
      <h2 className="text-center font-bold">Comments ({comments.length})</h2>
      <div className="mt-3 overflow-auto h-80">
        {comments.map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default PostCommentList;
