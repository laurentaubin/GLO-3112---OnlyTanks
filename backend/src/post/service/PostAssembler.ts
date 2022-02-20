import PostResponse from "../api/PostResponse";
import Post from "../domain/Post";
import User from "../../user/domain/User";

export default class PostAssembler {
  public assemblePostResponse(post: Post, user: User): PostResponse {
    return {
      id: post.id,
      imageUrl: post.imageUrl,
      caption: post.caption,
      userTags: post.userTags,
      hashtags: post.hashtags,
      author: { username: user.username, imageUrl: user.imageUrl },
      createdAt: post.createdAt!
    };
  }
}
