import Link from "next/link";
import CommentWithAuthorPreview from "../../domain/CommentWithAuthorPreview";
import formatTimestamp from "../../utils/formatTimestamp";

interface Props {
  comment: CommentWithAuthorPreview;
}

const PostComment = ({ comment }: Props) => {
  return (
    <div className="flex flex-row items-center pb-3 justify-between">
      <div className="flex flex-row items-center">
        <Link key={comment.author.username} href={`/${comment.author.username}`} passHref>
          <img className="rounded-full w-12 h-12 hover:cursor-pointer border border-gray-300" src={comment.author.imageUrl} alt="" />
        </Link>
        <div className="flex flex-col">
          <Link key={comment.author.username} href={`/${comment.author.username}`} passHref>
            <span className="hover:cursor-pointer hover:underline font-bold text-sm pl-2">@{comment.author.username}</span>
          </Link>
          <span className="text-sm pl-2">{comment.comment}</span>
        </div>
      </div>
      <span className="text-gray-500 text-sm whitespace-nowrap my-auto">{formatTimestamp(comment.timestamp)}</span>
    </div>
  );
};

export default PostComment;
