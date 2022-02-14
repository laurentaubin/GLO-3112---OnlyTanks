import PostResponse from "../api/PostResponse";
import Post from "../domain/Post";

export default class PostAssembler {
  public assemblePostResponse(post: Post): PostResponse {
    return {
      id: post.id,
      imageUrl: post.imageUrl,
      caption: post.caption,
      hashtags: post.hashtags,
      author: post.author,
      createdAt: post.createdAt!
    };
  }
}
