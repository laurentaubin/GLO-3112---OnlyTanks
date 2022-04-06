import PostComment from "./PostComment";
import Comment from "../../domain/Comment";

interface Props {
  comments: Comment[];
}

const PostComments = ({ comments }: Props) => {
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

export default PostComments;
