import React from "react";
import PostPreview from "../main/components/post/PostPreview";
import useFeed from "./api/useFeed";

export const MainFeed = () => {
  const { posts } = useFeed();

  return (
    <>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </>
  );
};
