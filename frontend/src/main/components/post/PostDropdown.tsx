import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Props {
  canGoToPost: boolean;
  onSeePostClick: () => void;
  onEditPostClick: () => void;
  onDeletePostClick: () => void;
}

const PostDropdown = ({ canGoToPost, onSeePostClick, onEditPostClick, onDeletePostClick }: Props) => {
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
          <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {canGoToPost && (
                <Menu.Item onClick={onSeePostClick}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-blue-primary text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      See post
                    </button>
                  )}
                </Menu.Item>
              )}
              <Menu.Item onClick={onEditPostClick}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-blue-primary text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item onClick={onDeletePostClick}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-red-primary text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default PostDropdown;
