import usePostLikes from "../../../hooks/usePostLikes";
import PostLikesModalHeader from "./PostLikesModalHeader";
import PostLikes from "./PostLikes";
import Modal from "../../Modal";

interface Props {
  postId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PostLikesModal = ({ postId, open, setOpen }: Props) => {
  const { postLikes } = usePostLikes(postId);

  return (
    <Modal open={open} setOpen={setOpen}>
      <PostLikesModalHeader setOpen={setOpen} />
      <PostLikes userPreviews={postLikes} />
    </Modal>
  );
};

export default PostLikesModal;
