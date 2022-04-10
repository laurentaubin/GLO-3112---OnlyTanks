import Comment from "../../domain/Comment";
import NumberOfComments from "./NumberOfComments";
import PostCommentPreview from "./PostCommentPreview";

interface Props {
  comments: Comment[];
  numberOfComments: number;
  postId: string;
}

const PostCommentPreviewList = ({ comments, numberOfComments, postId }: Props) => {
  return (
    <div>
      <NumberOfComments numberOfComments={numberOfComments} postId={postId} />
      {comments.map((comment) => (
        <PostCommentPreview key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default PostCommentPreviewList;
