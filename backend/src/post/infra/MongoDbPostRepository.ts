import Post from "../domain/Post";
import PostModel, { PostDto } from "./models/PostModel";
import PostRepository from "../domain/PostRepository";
import MongoDbPostAssembler from "./MongoDbPostAssembler";
import Pagination from "../../utils/pagination/Pagination";
import MongoDbQuery from "../../utils/pagination/MongoDbQuery";
import Paginator from "../../utils/pagination/Paginator";
import PostNotFoundException from "../domain/exceptions/PostNotFoundException";

class MongoDbPostRepository implements PostRepository {
  constructor(private mongoDBPostAssembler: MongoDbPostAssembler, private paginator: Paginator) {}

  public async delete(id: string): Promise<void> {
    await PostModel.deleteOne({ id });
  }

  public async save(post: Post) {
    const postModel = this.mongoDBPostAssembler.assemblePostModel(post);

    await postModel.save();
  }

  public async findByAuthor(author: string, pagination: Pagination): Promise<Post[]> {
    const query: MongoDbQuery = PostModel.find({ author }).sort("-createdAt").lean();

    return this.fetchPosts(pagination, query);
  }

  public async find(pagination: Pagination): Promise<Post[]> {
    const query: MongoDbQuery = PostModel.find().sort("-createdAt").lean();

    return this.fetchPosts(pagination, query);
  }

  public async findById(id: string): Promise<Post> {
    const postDto = (await PostModel.findOne({ id: id }).lean()) as unknown as PostDto;

    if (!postDto) {
      throw new PostNotFoundException();
    }

    return this.mongoDBPostAssembler.assemblePost(postDto);
  }

  public async update(id: string, updatedPost: Post): Promise<Post> {
    const updatedPostDto = (await PostModel.findOneAndUpdate({ id: id }, updatedPost, {
      new: true
    }).lean()) as unknown as PostDto;
    return this.mongoDBPostAssembler.assemblePost(updatedPostDto);
  }

  private async fetchPosts(pagination: Pagination, query: MongoDbQuery): Promise<Post[]> {
    query = this.paginator.addToQuery(pagination, query);

    const postsQuery = (await query.find()) as unknown as PostDto[];

    return postsQuery.map(this.mongoDBPostAssembler.assemblePost);
  }
}

export default MongoDbPostRepository;
