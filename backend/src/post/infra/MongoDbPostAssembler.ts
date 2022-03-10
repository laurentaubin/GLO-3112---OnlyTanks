import Post from "../domain/Post";
import PostModel, { PostDto } from "./models/PostModel";

class MongoDbPostAssembler {
  public assemblePostModel(post: Post) {
    return new PostModel({
      imageUrl: post.imageUrl,
      author: post.author,
      caption: post.caption,
      userTags: post.userTags,
      hashtags: post.hashtags,
      id: post.id,
      likes: post.likes ?? []
    });
  }

  public assemblePost(postDto: PostDto): Post {
    const userTags = postDto.userTags ? postDto.userTags.map((tag) => ({ ...tag })) : [];

    return {
      imageUrl: postDto.imageUrl,
      createdAt: postDto.createdAt,
      author: postDto.author,
      caption: postDto.caption,
      userTags: userTags,
      hashtags: postDto.hashtags,
      id: postDto.id,
      likes: postDto.likes
    };
  }
}

export default MongoDbPostAssembler;
