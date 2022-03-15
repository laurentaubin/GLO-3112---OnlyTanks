import Post from "./Post";
import Pagination from "../../utils/pagination/Pagination";

interface PostRepository {
  save(post: Post): Promise<void>;

  delete(id: string): Promise<void>;

  find(pagination: Pagination): Promise<Post[]>;

  findById(id: string): Promise<Post>;

  findByAuthor(author: string, pagination: Pagination): Promise<Post[]>;

  update(id: string, updatedPost: Post): Promise<Post>;

  deleteAllByUsername(username: string): Promise<void>;
}

export default PostRepository;
