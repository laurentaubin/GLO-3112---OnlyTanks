import * as React from "react";

interface Props {
  username: string;
  showEntireCaption: boolean;
  caption: string;
  onShowEntireCaptionClick: () => void;
}

const PostCaption = ({ username, caption, showEntireCaption, onShowEntireCaptionClick }: Props) => {
  return (
    <div className="w-full flex">
      <div className="font-bold mr-1">{username}</div>
      <div className={showEntireCaption ? "" : "max-h-12 truncate overflow-hidden"}>{caption}</div>
      <button className="whitespace-nowrap text-gray-400" onClick={onShowEntireCaptionClick} hidden={showEntireCaption}>
        plus
      </button>
    </div>
  );
};

export default PostCaption;
