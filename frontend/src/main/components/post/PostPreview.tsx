import * as React from "react";
import { useState } from "react";
import Post from "../../domain/post/Post";
import { useRouter } from "next/router";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
import { PostImage } from "./PostImage";
import { useAuth } from "../../hooks/useAuth";
import EditPostModal from "./EditPostModal";
import usePostReaction from "../../hooks/usePostReaction";
import PostLikesModal from "./likes-modal/PostLikesModal";
import PostReaction from "./PostReaction";

interface Props {
  post: Post;
  onDeletePostClick: () => void;
}

const PostPreview = ({ post: postProp, onDeletePostClick }: Props) => {
  const [post, setPost] = useState<Post>(postProp);
  const [editPostModalOpen, setEditPostModalOpen] = useState(false);
  const [postLikesModalOpen, setPostLikesModalOpen] = useState(false);
  const router = useRouter();
  const { me } = useAuth();
  const [showEntireCaption, setShowEntireCaption] = useState(post.caption.length < 100);
  const { likePost, unlikePost } = usePostReaction();
  const [isLiked, setIsLiked] = useState(postProp.isLiked);
  const [numberOfLikes, setNumberOfLikes] = useState(postProp.numberOfLikes);

  const onShowEntireCaptionClick = () => {
    setShowEntireCaption(!showEntireCaption);
  };

  const onGoToPostClick = () => {
    router.push({ pathname: "posts/[id]", query: { id: post.id } });
  };

  const onEditPostClick = () => {
    setEditPostModalOpen(true);
  };

  const onPostUpdated = (updatedPost: Post) => {
    setPost(updatedPost);
  };

  const onPostReaction = async () => {
    isLiked ? await unlikePost(post.id) : await likePost(post.id);
    setIsLiked(!isLiked);
    !isLiked ? setNumberOfLikes(numberOfLikes + 1) : setNumberOfLikes(numberOfLikes - 1);
  };

  const onSeePostLikesClick = () => {
    setPostLikesModalOpen(true);
  };

  return (
    <>
      <EditPostModal originalPost={post} open={editPostModalOpen} setOpen={setEditPostModalOpen} onUpdated={onPostUpdated} />
      {postLikesModalOpen && <PostLikesModal postId={post.id} open={postLikesModalOpen} setOpen={setPostLikesModalOpen} />}
      <div className="mt-5 border border-gray-200 rounded">
        <PostHeader
          isMyPost={me?.username === post.author.username}
          username={post.author.username}
          profileImageUrl={post.author.imageUrl}
          timestamp={post.timestamp}
          onGoToPostClick={onGoToPostClick}
          onEditPostClick={onEditPostClick}
          onDeletePostClick={onDeletePostClick}
          isSpecificPostPage={router.pathname.includes("/posts")}
        />
        <div className="flex justify-center">
          <PostImage src={post.imageUrl} userTags={post.userTags} />
        </div>
        <section className="my-3 px-3">
          <PostReaction
            numberOfLikes={numberOfLikes}
            isLiked={isLiked}
            onPostReaction={onPostReaction}
            onLikesClick={onSeePostLikesClick}
          />
          <div>
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
          </div>
        </section>
      </div>
    </>
  );
};

export default PostPreview;
