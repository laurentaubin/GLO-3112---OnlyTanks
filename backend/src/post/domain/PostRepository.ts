import Pagination from "src/utils/pagination/Pagination";
import Post from "./Post";

interface PostRepository {
  save(post: Post): void;
  findByAuthor(author: string, pagination: Pagination): Promise<Post[]>;
}

export default PostRepository;
