import Post from "./Post";
import Pagination from "../../utils/pagination/Pagination";

interface PostRepository {
  save(post: Post): void;

  find(pagination: Pagination): Promise<Post[]>;

  findByAuthor(author: string, pagination: Pagination): Promise<Post[]>;
}

export default PostRepository;
