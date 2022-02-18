import Post from "../../main/domain/Post";
import ImagePost from "./ImagePost";

interface Props {
  posts: Post[];
}

const UserPosts = ({ posts }: Props) => {
  return (
    <>
      {posts.length === 0 && (
        <div>
          <h1 className="text-xl subpixel-antialiased text-center	text-align: center"> You have no posts yet </h1>
        </div>
      )}
      <div className="grid gap-4 grid-cols-3 mt-10">
        {posts.map((post) => (
          <ImagePost key={post.id} id={post.id} imageUrl={post.imageUrl} />
        ))}
      </div>
    </>
  );
};

export default UserPosts;
