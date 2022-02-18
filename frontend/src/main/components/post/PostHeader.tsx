import formatTimestamp from "../../utils/formatTimestamp";
import { BiArrowToRight } from "react-icons/bi";
import * as React from "react";
import Timestamp from "../../domain/Timestamp";
import { useRouter } from "next/router";
import PostDropdown from "./PostDropdown";
import PostAuthorInformation from "./PostAuthorInformation";

interface Props {
  isMyPost: boolean;
  username: string;
  profileImageUrl: string;
  timestamp: Timestamp;
  onGoToPostClick: () => void;
  onEditPostClick: () => void;
  onDeletePostClick: () => void;
}

const PostHeader = ({ isMyPost, username, profileImageUrl, timestamp, onGoToPostClick, onEditPostClick, onDeletePostClick }: Props) => {
  const router = useRouter();
  const isSpecificPostPage = router.pathname.includes("/posts");

  return (
    <header className="flex px-3 py-2 border-b border-zinc-100">
      <div className="w-full flex items-center justify-between">
        <PostAuthorInformation username={username} profileImageUrl={profileImageUrl} />
        <div className="flex">
          <div className="text-gray-500 text-sm whitespace-nowrap my-auto">{formatTimestamp(timestamp)}</div>
          <>
            {isMyPost && (
              <PostDropdown
                canGoToPost={!isSpecificPostPage}
                onSeePostClick={onGoToPostClick}
                onEditPostClick={onEditPostClick}
                onDeletePostClick={onDeletePostClick}
              />
            )}
            {!isMyPost && !isSpecificPostPage && (
              <button
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                className="text-gray-500 px-2 ml-2 hover:text-blue-primary hover:bg-blue-200 rounded-full w-9 h-9 "
                onClick={onGoToPostClick}
              >
                <BiArrowToRight size={20} />
              </button>
            )}
          </>
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
