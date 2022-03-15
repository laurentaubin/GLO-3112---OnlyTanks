import { useEffect, useState } from "react";
import UserPreview from "../../../domain/user/UserPreview";
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
  const [userPreviews, setUserPreviews] = useState<UserPreview[]>([]);
  const { postLikes } = usePostLikes(postId);

  useEffect(() => {
    setUserPreviews(postLikes);
  }, [postLikes]);

  return (
    <Modal open={open} setOpen={setOpen}>
      <PostLikesModalHeader setOpen={setOpen} />
      <PostLikes userPreviews={userPreviews} />
    </Modal>
  );
};

export default PostLikesModal;
