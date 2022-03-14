import { FiHeart } from "react-icons/fi";

interface Props {
  numberOfLikes: number;
  isLiked: boolean;
  onPostReaction: () => void;
  onLikesClick: () => void;
}

const PostReaction = ({ numberOfLikes, isLiked, onPostReaction, onLikesClick }: Props) => {
  return (
    <>
      <button onClick={onPostReaction}>
        <FiHeart className={"h-6 w-6" + `${isLiked ? " fill-red-500 stroke-red-500" : ""}`} />
      </button>
      <div className="text-sm hover:cursor-pointer" onClick={onLikesClick}>
        {numberOfLikes > 0 ? (
          <>
            {numberOfLikes} {numberOfLikes > 1 ? "likes" : "like"}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PostReaction;
