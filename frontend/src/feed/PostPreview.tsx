import * as React from "react";
import Post from "../main/domain/Post";
import { convertTimestampToDate } from "../main/utils/convertTimestampToDate";
import dayjs from "dayjs";
import formatTimestamp from "../main/utils/formatTimestamp";
import { useState } from "react";

interface Props {
  post: Post;
}

const PostPreview = ({ post }: Props) => {
  const [showEntireCaption, setShowEntireCaption] = useState(post.caption.length < 100);

  const onShowEntireCaptionClick = () => {
    setShowEntireCaption(!showEntireCaption);
  };

  return (
    <div className="mt-5 border border-gray-200 rounded">
      <header className="flex px-3 py-2 border-b border-zinc-100">
        <img className="rounded-full w-12 h-12" src={post.author.imageUrl} />
        <div className="w-full ml-3 flex items-center justify-between">
          <span className="font-bold">{post.author.username}</span>
          <div className="text-gray-500 text-sm whitespace-nowrap">{formatTimestamp(post.timestamp)}</div>
        </div>
      </header>
      <div className="flex justify-center">
        <img src={post.imageUrl} />
      </div>
      <section className="my-3 px-3">
        {post.caption && (
          <div className="w-full flex">
            <div className="font-bold mr-1">{post.author.username}</div>
            <div className={showEntireCaption ? "" : "max-h-12 truncate overflow-hidden"}>{post.caption}</div>
            <button className="whitespace-nowrap text-gray-400" onClick={onShowEntireCaptionClick} hidden={showEntireCaption}>
              plus
            </button>
          </div>
        )}
        <div>
          {post.hashtags.map((hashtag) => (
            <span key={hashtag} className="text-blue-primary">
              {hashtag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PostPreview;
