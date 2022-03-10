import { FiHeart } from "react-icons/fi";

interface Props {
  numberOfLikes: number;
  isLiked: boolean;
  onPostReaction: () => void;
}

const PostReaction = ({ numberOfLikes, isLiked, onPostReaction }: Props) => {
  return (
    <>
      <button onClick={onPostReaction}>
        <FiHeart className={"h-6 w-6" + `${isLiked ? " fill-red-500 stroke-red-500" : ""}`} />
      </button>
      <div className="text-sm">{numberOfLikes} likes</div>
    </>
  );
};

export default PostReaction;
