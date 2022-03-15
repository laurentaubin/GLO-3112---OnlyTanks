import formatTimestamp from "../../utils/formatTimestamp";
import * as React from "react";
import Timestamp from "../../domain/Timestamp";
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
  isSpecificPostPage: boolean;
}

const PostHeader = ({
  isMyPost,
  username,
  profileImageUrl,
  timestamp,
  onGoToPostClick,
  onEditPostClick,
  onDeletePostClick,
  isSpecificPostPage
}: Props) => {
  return (
    <header className="flex px-3 py-2 border-b border-zinc-100">
      <div className="w-full flex items-center justify-between">
        <PostAuthorInformation username={username} profileImageUrl={profileImageUrl} />
        <div className="flex">
          <div className="text-gray-500 text-sm whitespace-nowrap my-auto">{formatTimestamp(timestamp)}</div>
          {isSpecificPostPage && !isMyPost ? null : (
            <PostDropdown
              isMyPost={isMyPost}
              onSeePostClick={onGoToPostClick}
              onEditPostClick={onEditPostClick}
              onDeletePostClick={onDeletePostClick}
              isSpecificPostPage={isSpecificPostPage}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
