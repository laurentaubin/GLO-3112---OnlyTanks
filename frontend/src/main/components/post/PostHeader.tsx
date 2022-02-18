import formatTimestamp from "../../utils/formatTimestamp";
import { BiArrowToRight } from "react-icons/bi";
import * as React from "react";
import Timestamp from "../../domain/Timestamp";
import { useRouter } from "next/router";

interface Props {
  username: string;
  profileImageUrl: string;
  timestamp: Timestamp;
  onGoToPostClick: () => void;
}

const PostHeader = ({ username, profileImageUrl, timestamp, onGoToPostClick }: Props) => {
  const router = useRouter();

  return (
    <header className="flex px-3 py-2 border-b border-zinc-100">
      <img className="rounded-full w-12 h-12" src={profileImageUrl} />
      <div className="w-full ml-3 flex items-center justify-between">
        <span className="font-bold">{username}</span>
        <div className="flex">
          <div className="text-gray-500 text-sm whitespace-nowrap my-auto">{formatTimestamp(timestamp)}</div>
          {!router.pathname.includes("/posts") && (
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdown"
              className="text-gray-500 px-2 ml-2 hover:text-blue-primary hover:bg-blue-200 rounded-full w-9 h-9 "
              onClick={onGoToPostClick}
            >
              <BiArrowToRight size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default PostHeader;