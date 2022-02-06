import Post from "./Post";

interface PostRepository {
  save(post: Post): void;
}

export default PostRepository;
