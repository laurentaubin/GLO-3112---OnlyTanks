import { IoCloseOutline } from "react-icons/io5";

interface Props {
  setOpen: (isOpen: false) => void;
}

const PostLikesModalHeader = ({ setOpen }: Props) => {
  return (
    <div className="border-b border-gray-300 text-xl justify-center py-2 flex">
      <div className="w-8" />
      <div className="w-full text-center font-bold">Likes</div>
      <div className="w-8">
        <button onClick={() => setOpen(false)} className="align-middle">
          <IoCloseOutline className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default PostLikesModalHeader;
