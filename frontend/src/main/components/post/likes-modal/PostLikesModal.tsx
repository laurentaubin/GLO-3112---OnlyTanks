import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import UserPreview from "../../../domain/user/UserPreview";
import usePostLikes from "../../../hooks/usePostLikes";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import PostLikesModalHeader from "./PostLikesModalHeader";
import PostLikes from "./PostLikes";

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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
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
          <span className="hidden sm:inline-block align-middle h-screen" aria-hidden="true" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 sm:align-middle max-w-lg w-96 min-w-56">
              <PostLikesModalHeader setOpen={setOpen} />
              <PostLikes userPreviews={userPreviews} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PostLikesModal;
