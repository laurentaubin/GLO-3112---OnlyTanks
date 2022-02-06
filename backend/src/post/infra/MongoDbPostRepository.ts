import Post from "../domain/Post";
import PostRepository from "../domain/PostRepository";
import MongoPostAssembler from "./MongoDbPostAssembler";

export default class MongoPostRepository implements PostRepository {
  constructor(private mongoPostAssembler: MongoPostAssembler) {}

  public save(post: Post) {
    const postModel = this.mongoPostAssembler.assemblePostModel(post);

    postModel.save();
  }
}
