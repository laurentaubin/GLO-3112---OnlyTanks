import React from "react";
import PostPreview from "../main/components/post/PostPreview";
import useDeletePost from "../post/api/useDeletePost";
import useFeed from "./api/useFeed";

export const MainFeed = () => {
  const { posts } = useFeed();
  const { deletePost } = useDeletePost();

  const onDeletePostClick = async (id: string) => {
    await deletePost(id);
  };

  return (
    <>
      {posts.map((post) => (
        <PostPreview onDeletePostClick={() => onDeletePostClick(post.id)} key={post.id} post={post} />
      ))}
    </>
  );
};
