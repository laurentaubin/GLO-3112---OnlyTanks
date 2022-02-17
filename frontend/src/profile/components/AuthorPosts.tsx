import Post from "../../main/domain/Post";
import ImagePost from "./ImagePost";

interface Props {
  posts: Post[];
}

const AuthorPosts = ({ posts }: Props) => {
  return (
    <div className="grid gap-4 grid-cols-3 grid-rows-3 mt-10">
      {posts.length === 0 && (
        <div>
          <h1 className="text-xl subpixel-antialiased text-center	text-align: center"> You have no post yet </h1>
        </div>
      )}
      {posts.map((post) => (
        <ImagePost key={post.id} imageUrl={post.imageUrl} />
      ))}
    </div>
  );
};

export default AuthorPosts;
