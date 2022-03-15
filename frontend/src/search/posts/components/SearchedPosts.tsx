import PostPreview from "../../../main/components/post/PostPreview";
import Post from "../../../main/domain/post/Post";

interface Props {
  posts: Post[];
}

const SearchedPosts = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </>
  );
};

export default SearchedPosts;
