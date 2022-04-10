import Link from "next/link";
import Comment from "../../domain/Comment";

interface Props {
  comment: Comment;
}

const PostCommentPreview = ({ comment }: Props) => {
  return (
    <div key={comment.id} className="flex flex-row align-middle">
      <Link key={comment.author} href={`/${comment.author}`} passHref>
        <span className="hover:cursor-pointer hover:underline font-bold mr-1">{comment.author}</span>
      </Link>

      <p className="truncate w-90">{comment.comment}</p>
    </div>
  );
};

export default PostCommentPreview;
