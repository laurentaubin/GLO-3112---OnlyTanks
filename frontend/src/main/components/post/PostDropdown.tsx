import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DropDownMenuItem } from "./DropDownMenuItem";

interface Props {
  isMyPost: boolean;
  onSeePostClick: () => void;
  onEditPostClick: () => void;
  onDeletePostClick: () => void;
  isSpecificPostPage: boolean;
}

const PostDropdown = ({ isMyPost, onSeePostClick, onEditPostClick, onDeletePostClick, isSpecificPostPage }: Props) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <BsThreeDotsVertical size={20} color="black" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-40 z-10 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {!isSpecificPostPage ? (
                <DropDownMenuItem onClick={onSeePostClick} label="See post" backgroundColor="blue" />
              ) : (
                <>
                  {isMyPost && (
                    <>
                      <DropDownMenuItem onClick={onEditPostClick} label="Edit" backgroundColor="blue" />
                      <div className="h-[1px] w-[90%] bg-slate-100 mx-auto" />
                      <DropDownMenuItem onClick={onDeletePostClick} label="Delete" backgroundColor="red" />
                    </>
                  )}
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default PostDropdown;
