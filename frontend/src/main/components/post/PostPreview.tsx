import * as React from "react";
import Post from "../../domain/Post";
import { useState } from "react";
import { useRouter } from "next/router";
import PostCaption from "./PostCaption";
import PostHeader from "./PostHeader";
import { useAuth } from "../../hooks/useAuth";
import EditPostModal from "./EditPostModal";

interface Props {
  post: Post;
}

const PostPreview = ({ post: postProp }: Props) => {
  const [post, setPost] = useState<Post>(postProp);
  const [editPostModalOpen, setEditPostModalOpen] = useState(false);
  const router = useRouter();
  const { me } = useAuth();
  const [showEntireCaption, setShowEntireCaption] = useState(post.caption.length < 100);

  const onShowEntireCaptionClick = () => {
    setShowEntireCaption(!showEntireCaption);
  };

  const onGoToPostClick = () => {
    router.push({ pathname: "posts/[id]", query: { id: post.id } });
  };

  const onEditPostClick = () => {
    setEditPostModalOpen(true);
  };

  const onDeletePostClick = () => {
    console.log("delete");
  };

  const onPostUpdated = (updatedPost: Post) => {
    setPost(updatedPost);
  };

  return (
    <>
      <EditPostModal
        postId={post.id}
        oldCaption={post.caption}
        oldHashtags={post.hashtags}
        open={editPostModalOpen}
        setOpen={setEditPostModalOpen}
        onUpdated={onPostUpdated}
      />
      <div className="mt-5 border border-gray-200 rounded">
        <PostHeader
          isMyPost={me?.username === post.author.username}
          username={post.author.username}
          profileImageUrl={post.author.imageUrl}
          timestamp={post.timestamp}
          onGoToPostClick={onGoToPostClick}
          onEditPostClick={onEditPostClick}
          onDeletePostClick={onDeletePostClick}
        />
        <div className="flex justify-center">
          <img src={post.imageUrl} />
        </div>
        <section className="my-3 px-3 flex flex-row justify-between">
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
