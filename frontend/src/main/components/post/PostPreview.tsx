import * as React from "react";
import Post from "../../domain/Post";
import { useState } from "react";
import { useRouter } from "next/router";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";

interface Props {
  post: Post;
}

const PostPreview = ({ post }: Props) => {
  const router = useRouter();
  const [showEntireCaption, setShowEntireCaption] = useState(post.caption.length < 100);

  const onShowEntireCaptionClick = () => {
    setShowEntireCaption(!showEntireCaption);
  };

  const onGoToPostClick = () => {
    router.push({ pathname: "posts/[id]", query: { id: post.id } });
  };

  return (
    <div className="mt-5 border border-gray-200 rounded">
      <PostHeader
        username={post.author.username}
        profileImageUrl={post.author.imageUrl}
        timestamp={post.timestamp}
        onGoToPostClick={onGoToPostClick}
      />
      <div className="flex justify-center">
        <img src={post.imageUrl} />
      </div>
      <section className="my-3 px-3">
        {post.caption && (
          <PostCaption
            username={post.author.username}
            caption={post.caption}
            onShowEntireCaptionClick={onShowEntireCaptionClick}
            showEntireCaption={showEntireCaption}
          />
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
