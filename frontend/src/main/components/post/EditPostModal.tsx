import { useEffect, useRef, useState } from "react";
import { ChosenPicture } from "../../../post/components/ChosenPicture";
import HashtagInput from "../../../post/components/HashtagInput";
import UserTag from "../../domain/UserTag";
import useUpdatePost from "../../hooks/useUpdatePost";
import HashtagsFormatter from "../../utils/HashtagsFormatter";
import InputWithLabel from "../InputWithLabel";
import Modal from "../Modal";
import Post from "../../domain/post/Post";

interface Props {
  originalPost: Post;
  open: boolean;
  setOpen: (open: boolean) => void;
  onUpdated: (updatedPost: Post) => void;
}

const EditPostModal = ({ originalPost, open, setOpen, onUpdated }: Props) => {
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const cancelButtonRef = useRef(null);
  const { updatePost, updatedPost } = useUpdatePost();

  useEffect(() => {
    setCaption(originalPost.caption);
    setHashtags(HashtagsFormatter.removeHashtagSymbol(originalPost.hashtags));
    setUserTags(originalPost.userTags);
  }, [originalPost]);

  const onConfirm = async () => {
    await updatePost(originalPost.id, caption, hashtags, userTags);
    setOpen(false);
  };

  useEffect(() => {
    if (updatedPost) {
      onUpdated(updatedPost);
    }
  }, [updatedPost]);

  const onUserTagged = (userTag: UserTag) => {
    setUserTags((current) => [...current, userTag]);
  };

  const onTagDelete = (username: string) => {
    setUserTags((current) => current.filter((tag) => tag.username !== username));
  };

  const Footer = () => (
    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-between">
      <button
        type="button"
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-primary text-base font-medium text-white hover:bg-blue-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={onConfirm}
      >
        Confirm
      </button>
      <button
        type="button"
        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={() => setOpen(false)}
        ref={cancelButtonRef}
      >
        Cancel
      </button>
    </div>
  );

  return (
    <Modal open={open} setOpen={setOpen} title="Edit post">
      <ChosenPicture src={originalPost.imageUrl} userTags={userTags} onUserTagged={onUserTagged} onTagDelete={onTagDelete} />
      <InputWithLabel value={caption} label="Caption" onTextChange={setCaption} />
      <HashtagInput hashtags={hashtags} setHashtags={setHashtags} />
      <Footer />
    </Modal>
  );
};

export default EditPostModal;
