import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChosenPicture } from "../../../post/components/ChosenPicture";
import HashtagInput from "../../../post/components/HashtagInput";
import Post from "../../domain/post/Post";
import UserTag from "../../domain/UserTag";
import useUpdatePost from "../../hooks/useUpdatePost";
import HashtagsFormatter from "../../utils/HashtagsFormatter";
import InputWithLabel from "../InputWithLabel";

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

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/*Centers the modal*/}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0">
                    <Dialog.Title as="h1" className="text-2xl leading-6 font-medium text-gray">
                      Edit post
                    </Dialog.Title>
                  </div>
                </div>
                <ChosenPicture src={originalPost.imageUrl} userTags={userTags} onUserTagged={onUserTagged} onTagDelete={onTagDelete} />
                <InputWithLabel value={caption} label="Caption" onTextChange={setCaption} />
                <HashtagInput hashtags={hashtags} setHashtags={setHashtags} />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditPostModal;
