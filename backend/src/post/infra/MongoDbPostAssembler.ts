import Post from "../domain/Post";
import PostModel from "./models/PostModel";

export default class MongoPostAssembler {
  public assemblePostModel(post: Post) {
    return new PostModel({
      imageUrl: post.imageUrl,
      author: post.author,
      caption: post.caption,
      hashtags: post.hashtags,
      id: post.id
    });
  }
}
