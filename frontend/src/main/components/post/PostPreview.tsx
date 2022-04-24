import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
import { PostImage } from "./PostImage";
import { useAuth } from "../../hooks/useAuth";
import EditPostModal from "./EditPostModal";
import usePostReaction from "../../hooks/usePostReaction";
import useDeletePost from "../../../post/api/useDeletePost";
import PostLikesModal from "./likes-modal/PostLikesModal";
import PostReaction from "./PostReaction";
import useCommentOnPost from "../../hooks/useCommentOnPost";
import Post from "../../domain/post/Post";
import PostCommentList from "./PostCommentList";
import usePostComments from "../../hooks/usePostComments";
import { State } from "../../hooks/useAxios";
import PostCommentPreviewList from "./PostCommentPreviewList";
import { CommentInput } from "./CommentInput";
import analyticsService, { AnalyticEvent } from "../../../services/analytics";

interface Props {
  post: Post;
  onDeletePost?: () => void;
}

const PostPreview = ({ post: postProp, onDeletePost }: Props) => {
  const [post, setPost] = useState<Post>(postProp);
  const [editPostModalOpen, setEditPostModalOpen] = useState(false);
  const [postLikesModalOpen, setPostLikesModalOpen] = useState(false);
  const router = useRouter();
  const { me } = useAuth();
  const [showEntireCaption, setShowEntireCaption] = useState(post.caption.length < 100);
  const { likePost, unlikePost } = usePostReaction();
  const { commentPost, state } = useCommentOnPost();
  const [isLiked, setIsLiked] = useState(postProp.isLiked);
  const [numberOfLikes, setNumberOfLikes] = useState(postProp.numberOfLikes);
  const { deletePost } = useDeletePost();
  const [numberOfComments, setNumberOfComments] = useState(postProp.numberOfComments);
  const { comments, getPostComments } = usePostComments(postProp.id);

  const isSpecificPostPage = router.pathname.includes("/posts");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isSpecificPostPage) {
      getPostComments();
    }
  }, []);

  useEffect(() => {
    if (state === State.SUCCESS) {
      setNumberOfComments(numberOfComments + 1);
      getPostComments();
    }
  }, [state]);

  const onDeletePostClick = async () => {
    analyticsService.logEvent(AnalyticEvent.DELETE_POST);
    await deletePost(post.id);
    onDeletePost && onDeletePost();
  };

  const onShowEntireCaptionClick = () => {
    setShowEntireCaption(!showEntireCaption);
  };

  const onGoToPostClick = () => {
    analyticsService.logEvent(AnalyticEvent.NAVIGATE_TO_POST_PAGE);
    router.push({ pathname: "posts/[id]", query: { id: post.id } });
  };

  const onEditPostClick = () => {
    setEditPostModalOpen(true);
  };

  const onPostUpdated = (updatedPost: Post) => {
    setPost(updatedPost);
  };

  const onPostReaction = async () => {
    if (isLiked) {
      analyticsService.logEvent(AnalyticEvent.UNLIKE_POST);
      await unlikePost(post.id);
    } else {
      analyticsService.logEvent(AnalyticEvent.LIKE_POST);
      await likePost(post.id);
    }
    setIsLiked(!isLiked);
    !isLiked ? setNumberOfLikes(numberOfLikes + 1) : setNumberOfLikes(numberOfLikes - 1);
  };

  const onPostComment = async (comment: string) => {
    analyticsService.logEvent(AnalyticEvent.COMMENT_POST);
    await commentPost(post.id, { comment: comment });
    setPost((post) => ({
      ...post,
      commentsPreview: [
        ...post.commentsPreview,
        { author: me?.username ?? "", comment, id: post.commentsPreview.length.toString(), timestamp: { datetime: new Date() } }
      ]
    }));
  };

  const onSeePostLikesClick = () => {
    analyticsService.logEvent(AnalyticEvent.SEE_POST_LIKES);
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
          isSpecificPostPage={isSpecificPostPage}
        />
        <div className="flex justify-center">
          <PostImage className="min-h-full" src={post.imageUrl} userTags={post.userTags} />
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

          {isSpecificPostPage ? (
            <>
              <hr />
              <PostCommentList comments={comments} />
            </>
          ) : (
            <PostCommentPreviewList comments={post.commentsPreview} numberOfComments={numberOfComments} postId={post.id} />
          )}

          <CommentInput postComment={onPostComment} placeholder="Add a comment..." />
        </section>
      </div>
    </>
  );
};

export default PostPreview;
